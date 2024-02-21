/** ===== 게더 개설 폼 기능을 담당하는 파일 ===== **/

document.addEventListener('DOMContentLoaded', ()=>{

  let formData = new FormData(); // 서버로 전송할 폼 객체 생성

  if(sessionStorage.getItem('USER_NUMB') == null) {
    comAlert3(
        '세션이 만료되었습니다.'
      , '로그인 후 이용해주세요.'
      , 'warning'
      , function() { location.href = '/gather/login.com' }
    )

    return false;
  }

  const categoryList = document.querySelector('.categoryList');
  const step1Btn = document.getElementById('next');
  const step2Btn = document.getElementById('next2');
  const step3Btn = document.getElementById('next3');
  const submitBtn = document.getElementById('submit');

  let pickedCateData; // 유저가 선택한 카테고리 값을 담음
  let gatherAddressData; // 주소+상세주소 데이터 담음
  let step1Data; // step1 데이터 담음
  let step2Data; // step2 데이터 담음
  let step3Data; // step3 데이터 담음
  let step4Data; // step4 데이터 담음
  let reqData; // step1~step4 하나로 합친 데이터 담음
 

  // 자식 카테고리 클릭 이벤트
  categoryList.addEventListener('click', (event)=>{
  	const target = event.target;
  
    if(target.matches('.child')) {
    
    	if(document.querySelector('.picked_child')){
      	document.querySelector('.picked_child').classList.remove('picked_child');
    	}

  	  target.classList.toggle('picked_child');
      pickedCateData = target.getAttribute('data-code2');
    }
  });

   // 이미지 업로드 함수 ajax 활용
   function uploadSummernoteImageFile(file, el, caption) {
    data = new FormData()
    data.append('file', file)
    $.ajax({
        data: data,
        type: 'POST',
        url: 'uploadSummernoteImageFile',
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (data) {
            $(el).summernote(
                'editor.insertImage',
                data.url,
                function ($image) {
                    $image.attr('alt', caption) // 캡션 정보를 이미지의 alt 속성에 설정
                }
            )
        },
    });
  }

  /**
   * 240220 장한원
   * 유효성 검사
   */
  const formCheck = function() {
    if(!pickedCateData) {
      
    }
  }

  /**
   * 240220: 장한원
   * step1 -> step2로 가는 '다음' 버튼
   */
  step1Btn.addEventListener('click', ()=>{
    const moimTitle = document.getElementById('moimTitle').value;
    
    step1Data ={
        MOIM_TITL : moimTitle
      , CATE_IDXX : pickedCateData
    };

    console.log('step1Data  ' + JSON.stringify(step1Data));
  });

  /**
   * 240220: 장한원
   * step2 -> step3로 가는 '다음' 버튼
   */
  step2Btn.addEventListener('click', ()=>{
    const gatherCost = document.getElementById('gatherCost').value;
    const gatherDate = document.getElementById('gatherDate').value;
    const gatherTime = document.getElementById('gatherTime').value;
    const gatherAddress = document.getElementById('gatherAddress').value;
    const gatherDetailAddress = document.getElementById('gatherDetailAddress').value;
    const gatherLati = document.getElementById('gatherLati').value;
    const gatherLong = document.getElementById('gatherLong').value;

    step2Data ={
        MOIM_COST : gatherCost
      , MOIM_DATE : gatherDate
      , MOIM_TIME : gatherTime
    };

    gatherAddressData = {
        MOIM_LATI : gatherLati
      , MOIM_LONG : gatherLong
      , MOIM_ADR1 : gatherAddress
      , MOIM_ADR2 : gatherDetailAddress
    };

    console.log('step2Data  ' + JSON.stringify(step2Data));
    console.log('gatherAddressData  ' + JSON.stringify(gatherAddressData));
    
  });

  /**
   * 240220: 장한원
   * step3 -> step4로 가는 '다음' 버튼
   */
  step3Btn.addEventListener('click', ()=>{
    const gathAppr = document.querySelector('.appr_act').getAttribute('data-appr'); // 승인유무
    const minAge = document.getElementById('minAge').value;
    const maxAge = document.getElementById('maxAge').value;
    const minPeople = document.getElementById('minPeople').value;
    const maxPeople = document.getElementById('maxPeople').value;
    const gathGender = document.querySelector('.gender_act').getAttribute('data-gender'); // 성별

    if(gathGender == 'null') {
      gathGender = '';
    }

    step3Data ={
        APPR_YSNO : gathAppr
      , MINN_AGEE : minAge
      , MAXX_AGEE : maxAge
      , MINN_PEOP : minPeople
      , MAXX_PEOP : maxPeople
      , APPR_GNDR : gathGender
    };

    console.log('step3Data  ' + JSON.stringify(step3Data));

  });


  /**
   * 240220: 장한원
   * 마지막 '확인' 버튼
   */
  submitBtn.addEventListener('click', ()=>{
    const summernote = document.getElementById('summernote').value;

    step4Data = {
        MOIM_CNTT : summernote
      , COMP_YSNO : 'Y'
    }

    debugger;
    reqData = Object.assign({}, step1Data, step2Data, step3Data, step4Data);

    console.log(formData);

    console.log('reqData  ' + JSON.stringify(reqData));

    
    formData.append('data', JSON.stringify(reqData)); // 유저가 입력한 폼 값
    formData.append('map', JSON.stringify(gatherAddressData)); 

    console.log('formData  ' + formData);

    fetch("/gather/makeGatherDo.com", {
      method: "POST",
      body: formData
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then((data) => {
      if(data == 'success') {
        alert('성공입니당')
        location.reload();

        // comAlert2(5
        //   ,"게더가 만들어졌어요!"
        //   , null
        //   , "방금 만든 게더 보러 가기"
        //   , function(){
        //     location.href = "/gather/login.com"
        //   });
      } else {
        console.log("오류 발생 data: ", data)
      }
    })
    .catch(error => {
      console.error('네트워크 에러 발생:', error);
    });
  });

});
