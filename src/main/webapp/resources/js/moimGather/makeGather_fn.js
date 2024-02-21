/** 게더 개설 폼 기능을 담당하는 파일 **/

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

  $('#summernote').summernote({

    codeviewFilter: false, // 코드 보기 필터 비활성화
    codeviewIframeFilter: false, // 코드 보기 iframe 필터 비활성화

    height: 550, // 에디터 높이
    minHeight: null, // 최소 높이
    maxHeight: null, // 최대 높이
    focus: true, // 에디터 로딩 후 포커스 설정
    lang: 'ko-KR', // 언어 설정 (한국어)

    toolbar: [
        ['style', ['style']], // 글자 스타일 설정 옵션
        ['fontsize', ['fontsize']], // 글꼴 크기 설정 옵션
        ['font', ['bold', 'underline', 'clear']], // 글자 굵게, 밑줄, 포맷 제거 옵션
        ['color', ['color']], // 글자 색상 설정 옵션
        ['table', ['table']], // 테이블 삽입 옵션
        ['para', ['ul', 'ol', 'paragraph']], // 문단 스타일, 순서 없는 목록, 순서 있는 목록 옵션
        ['height', ['height']], // 에디터 높이 조절 옵션
        //['insert', ['picture', 'link', 'video']], // 이미지 삽입, 링크 삽입, 동영상 삽입 옵션
        ['view', ['codeview', 'fullscreen', 'help']], // 코드 보기, 전체 화면, 도움말 옵션
    ],

    fontSizes: [
        '8', '9', '10', '11', '12', '14', '16', '18',
        '20', '22', '24', '28', '30', '36', '50', '72',
    ], // 글꼴 크기 옵션

    styleTags: [
        'p',  // 일반 문단 스타일 옵션
        {
            title: 'Blockquote',
            tag: 'blockquote',
            className: 'blockquote',
            value: 'blockquote',
        },  // 인용구 스타일 옵션
        'pre',  // 코드 단락 스타일 옵션
        {
            title: 'code_light',
            tag: 'pre',
            className: 'code_light',
            value: 'pre',
        },  // 밝은 코드 스타일 옵션
        {
            title: 'code_dark',
            tag: 'pre',
            className: 'code_dark',
            value: 'pre',
        },  // 어두운 코드 스타일 옵션
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',  // 제목 스타일 옵션
    ],

    callbacks: {
        onImageUpload: function (files) {
            // 파일 업로드 (다중 업로드를 위해 반복문 사용)
            for (var i = files.length - 1; i >= 0; i--) {
                formData.append('file', files[i])
                console.log("이미지 젭알!" + files[i]);
            }
            
        },
    },
})


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
    const gatherTitle = document.getElementById('gatherTitle').value;
    
    step1Data ={
        MOIM_TITL : gatherTitle
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
    const gathContent = document.getElementById('summernote').value;

    step4Data = {
        MOIM_CNTT : gathContent
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
