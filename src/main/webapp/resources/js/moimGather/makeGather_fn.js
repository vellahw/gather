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

  
  /**
   * 240220 장한원
   * 유효성 검사
   */
  const formCheck = function() {
    if(!pickedCateData) {
      
    }
  }

  let fileNameNum = 0;
  /**
	 * summernote 에디터 띄움
	 */	
	$('#summernote').summernote({
		codeviewFilter: false, // 코드 보기 필터 비활성화
    codeviewIframeFilter: false, // 코드 보기 iframe 필터 비활성화
    disableDragAndDrop: false,
    shortcuts: false,
		height: 300,                 // 에디터 높이
		minHeight: null,             // 최소 높이
		maxHeight: null,             // 최대 높이
		focus: false,                  // 에디터 로딩후 포커스를 맞출지 여부
		lang: "ko-KR",					// 한글 설정

		toolbar: [
			['style', ['style']], // 글자 스타일 설정 옵션
			['fontsize', ['fontsize']], // 글꼴 크기 설정 옵션
			['font', ['bold', 'underline', 'clear']], // 글자 굵게, 밑줄, 포맷 제거 옵션
			['color', ['color']], // 글자 색상 설정 옵션
			['para', ['ul', 'ol', 'paragraph']], // 문단 스타일, 순서 없는 목록, 순서 있는 목록 옵션
			['insert', ['picture', 'link', 'video']], // 이미지 삽입, 링크 삽입, 동영상 삽입 옵션
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
        const uploadList = document.getElementById('uploadList');
        console.log(files)

        if(files.length > 1) {
          // 이미지 다중 업로드를 위한 반복문
          for (let i = files.length - 1; i >= 0; i--) { 
  
            const reader = new FileReader(); // 파일을 읽음
            reader.onload = (function (file) {
                return function (event) {
                  // 본문에 이미지 삽입
                  $('#summernote').summernote('insertImage', event.target.result, file.name);

                  // 업로드된 이미지 라이브러리 생성
                  const item = document.createElement('li');
                  item.className = 'uploadItem';
                  
                  const img = document.createElement('img');
                  img.id = 'uploadImgThumnail';
                  img.src = event.target.result;
    
                  item.appendChild(img);
                  uploadList.appendChild(item); // 삽입
    
                };
            })(files[i]); // 함수를 정의 후 바로 실행, 매개변수 file = (바깥 괄호)files[i]
              
            reader.readAsDataURL(files[i]); // 파일을 base64로 읽어옴
    
            // 이미지 업로드
            appendFile('file' + [i], files[i]);
          }

        } else {
          const reader = new FileReader();
          reader.onload = ({ target }) => {
            // 본문에 이미지 삽입
            $('#summernote').summernote('insertImage', target.result, files[0].name);
           

            // 업로드된 이미지 라이브러리 생성
            const item = document.createElement('li');
            item.className = 'uploadItem';
            
            const img = document.createElement('img');
            img.id = 'uploadImgThumnail';
            img.src = target.result;

            item.appendChild(img);
            uploadList.appendChild(item); // 삽입
          
          };

          reader.readAsDataURL(files[0]);
          appendFile(`file${fileNameNum}`, files[0]);

          fileNameNum++;
  
        }

                  
      }
		},
	});


  document.getElementById('uploadList').addEventListener('click', (event)=>{

    const thumnailNode = document.getElementById('uploadImgThumnail');
    if(thumnailNode.name) {
      thumnailNode.name = ''; // 클릭 했었던 이미지의 name 값 초기화
    }

    comRemoveActiveClass('.picked_thumnail', 'picked_thumnail'); // 클릭 했었던 이미지 추가했던 class 삭제

    if(event.target.matches('#uploadImgThumnail')){
      event.target.parentNode.classList.toggle('picked_thumnail');
      
      for (let key of formData.keys()) {
        if(formData.get(key) == event.target.src) {
          console.log('있당')
          formData.delete(key)
        }
      }

      appendFile('mainImage', event.target.src); // 메인이미지 업로드
    }
  })

  // 이미지 formData에 삽입
  function appendFile(name, file) {
    formData.append(name, file);
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

    reqData = Object.assign({}, step1Data, step2Data, step3Data, step4Data);

    formData.append('data', JSON.stringify(reqData)); // 유저가 입력한 폼 값
    formData.append('map', JSON.stringify(gatherAddressData)); 

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
