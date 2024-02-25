/** ===== 게더 개설 폼 기능을 담당하는 파일 ===== **/

document.addEventListener('DOMContentLoaded', ()=>{

  let fileDataArray = []; // 파일 데이터를 담을 배열

  if(sessionStorage.getItem('USER_NUMB') == null) {
    comAlert3(
        '세션이 만료되었습니다.'
      , '로그인 후 이용해주세요.'
      , 'warning'
      , function() { location.href = '/gather/login.com' }
    )

    return false;
  }

  const step1Btn = document.getElementById('next');
  const step2Btn = document.getElementById('next2');
  const step3Btn = document.getElementById('next3');
  const submitBtn = document.getElementById('submit');

  let gatherAddressData; // 주소+상세주소 데이터 담음
  let step1Data; // step1 데이터 담음
  let step2Data; // step2 데이터 담음
  let step3Data; // step3 데이터 담음
  let step4Data; // step4 데이터 담음
  let reqData; // step1~step4 하나로 합친 데이터 담음

  /* 
  * 240219 장한원
  * 이전/다음 버튼 클릭 이벤트
  */
  const btnContainer = document.querySelectorAll('.btnContainer');
	btnContainer.forEach(btn=>{
    btn.addEventListener('click', (event)=>{
      const target = event.target;
      const btnId = target.id; // 클릭한 버튼 아이디

      const step1 = document.getElementById('step1');
      const step2 = document.getElementById('step2');
      const step3 = document.getElementById('step3');
      const step4 = document.getElementById('step4');

      /* 다음 버튼 */
      if(target.matches('.next')) {

        if(btnId == 'next') {
					
					if(formCheck('step1')) {
						showStep(step1, step2);
					}

				} else if(btnId == 'next2') {

          if(formCheck('step2')) {
					  showStep(step2, step3);
          }

				} else if(btnId == 'next3') {

					showStep(step3, step4);
				
				}
				
				/* 이전버튼 */
      } else if(target.matches('.prev')){

				if(btnId == 'prev2') {

					showStep(step2, step1);

        } else if(btnId == 'prev3') {

					showStep(step3, step2);

				} else if(btnId == 'prev4') {

					showStep(step4, step3);

				} 
			}

		});
	});


  let fileNameNum = 0; // formData 업로드 이미지 key값 채번
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
      lang: "ko-KR",               // 한글 설정

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
        
          // 이미지 다중 업로드
          if (files.length > 1) {
            for (let i = files.length - 1; i >= 0; i--) {
                const reader = new FileReader(); // 파일을 읽음
                reader.onload = (function (file) {
                  return function (event) {
                    createImgNode(event.target.result, file.name);
                    document.getElementById('uploadList').childNodes[0].classList.add('picked_thumnail'); // 메인이미지 표시
                    document.getElementById('uploadList').childNodes[0].querySelector('.mainTag').classList.add('mainTag_act'); // 메인이미지 태그 표시
                  };
                })(files[i]); // 함수를 정의 후 바로 실행, 매개변수 file = (바깥 괄호)files[i]
                reader.readAsDataURL(files[i]); // 파일을 base64로 읽어옴
        
                // 파일 데이터 배열에 파일과 파일 이름 추가
                fileDataArray.push({
                  key: 'file' + i,
                  file: files[i],
                  fileName: files[i].name
                });
            }
          } else {
            const reader = new FileReader();
            reader.onload = ({ target }) => {
              createImgNode(target.result, files[0].name);
              document.getElementById('uploadList').childNodes[0].classList.add('picked_thumnail'); // 메인이미지 표시
              document.getElementById('uploadList').childNodes[0].querySelector('.mainTag').classList.add('mainTag_act'); // 메인이미지 태그 표시
            };
            reader.readAsDataURL(files[0]);
        
            // 파일 데이터 배열에 파일과 파일 이름 추가
            fileDataArray.push({
              key: `file${fileNameNum}`,
              file: files[0],
              fileName: files[0].name
            });

            console.log(fileDataArray)

            fileNameNum++;
          }

          /* 메인 이미지 선택(클릭) 이벤트 */
          document.getElementById('uploadList').addEventListener('click', (event)=>{
            // const thumnailNode = document.getElementById('uploadImgThumnail');
            // if(thumnailNode.name) {
            //   thumnailNode.name = ''; // 클릭 했었던 이미지의 name 값 초기화
            // }

            // 클릭한 이미지에 '대표' 태그 표시
            const mainTag = document.querySelector('.mainTag_act');
            if(mainTag) {
              mainTag.classList.remove('mainTag_act');
            }
            
            event.target.nextSibling.classList.add('mainTag_act');

            comRemoveActiveClass('.picked_thumnail', 'picked_thumnail'); // 클릭 했었던 이미지 추가했던 class 삭제
            
            // border 추가
            if(event.target.matches('#uploadImgThumnail')){
              event.target.parentNode.classList.toggle('picked_thumnail');
            }
          });
        }
      }
    });

  // 이미지 업로드 후 노드 생성/삽입
  const createImgNode = function(file, fileName){
    // 본문에 이미지 삽입
    $('#summernote').summernote('insertImage', file, fileName);

    // 업로드된 이미지 라이브러리 생성
    const item = document.createElement('li');
    item.className = 'uploadItem';
    
    const img = document.createElement('img');
    img.id = 'uploadImgThumnail';
    img.src = file;
    img.dataset.name = fileName;

    const mainTag = document.createElement('span');
    mainTag.innerHTML = '대표';
    mainTag.className = 'mainTag';
    
    item.appendChild(img); 
    item.appendChild(mainTag);
    uploadList.appendChild(item); // 업로드 썸네일 리스트에 삽입
  }
  
  /**
   * 240220: 장한원
   * step1 -> step2로 가는 '다음' 버튼
   */
  step1Btn.addEventListener('click', ()=>{
    const moimTitle = document.getElementById('moimTitle').value;
    const pickedCate = document.querySelector('.picked_child');
    let pickedCateData;

    if(pickedCate) {
      pickedCateData = pickedCate.getAttribute('data-code2');
    }
    
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
    const gatherCost = document.getElementById('moimCost').value;
    const gatherDate = document.getElementById('moimDate').value;
    const gatherTime = document.getElementById('moimTime').value;
    const gatherAddress = document.getElementById('moimAddress').value;
    const gatherDetailAddress = document.getElementById('moimDetailAddress').value;
    const gatherLati = document.getElementById('moimLati').value;
    const gatherLong = document.getElementById('moimLong').value;

    const onlineBtn = document.querySelector('button[data-loca="on"]');

    step2Data ={
        MOIM_COST : gatherCost
      , MOIM_DATE : gatherDate
      , MOIM_TIME : gatherTime
    };
  
    // 모임 장소 데이터 가공
    if(onlineBtn.classList.contains('loca_act')) {

      gatherAddressData = ''; // 온라인 모임 = null

    } else {
      gatherAddressData = {
          MOIM_LATI : gatherLati
        , MOIM_LONG : gatherLong
        , MOIM_ADR1 : gatherAddress
        , MOIM_ADR2 : gatherDetailAddress
      };
    }

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
  submitBtn.addEventListener('click', () => {

    let formData = new FormData(); // 서버로 전송할 폼 객체 생성
    const summernote = document.getElementById('summernote').value;

    step4Data = {
        MOIM_CNTT: summernote,
        COMP_YSNO: 'Y'
    }

    reqData = Object.assign({}, step1Data, step2Data, step3Data, step4Data);

    formData.append('data', JSON.stringify(reqData)); // 유저가 입력한 폼 값
    formData.append('map', JSON.stringify(gatherAddressData));

    const pickedFileName = document.querySelector('.uploadItem.picked_thumnail img').getAttribute('data-name');

    // 클릭한 메인 사진의 data-name 속성을 가져와
    // fileDataArray 속 fileName과 같은 데이터의 key를 가져옴 
    const key = fileDataArray.find((element)=>{
      if(element.fileName == pickedFileName) {
        return { key : element.key };
      }
    });

    // fileDataArray 속 key와 클릭한 메인 사진의 key 가 같다면
    // key를 mainImage로 수정
    fileDataArray.forEach(item => {
      if (item.key === key.key) {
        item.key = 'mainImage';
      }
    });

    // 파일 데이터 배열을 formData에 추가
    fileDataArray.forEach(({ key, file }) => {
        formData.append(key, file);
    });

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
        if(data === 'success') {
            alert('성공입니당')
            location.reload();
        } else {
            console.log("오류 발생 data: ", data)
        }
    })
    .catch(error => {
        console.error('네트워크 에러 발생:', error);
    });

  });

});