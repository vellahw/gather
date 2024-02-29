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
          
          if(formCheck('step3')) {
            showStep(step3, step4);
          }
				
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
    height: 367,                 // 에디터 높이
    minHeight: 367,             // 최소 높이
    maxHeight: null,             // 최대 높이
    focus: true,                 // 에디터 로딩후 포커스를 맞출지 여부
    lang: 'ko-KR',               // 한글 설정
    placeholder: '모임 소개글을 작성해주세요.',

    toolbar: [
      ['style', ['style']], // 글자 스타일 설정 옵션
      ['fontsize', ['fontsize']], // 글꼴 크기 설정 옵션
      ['font', ['bold', 'underline', 'clear']], // 글자 굵게, 밑줄, 포맷 제거 옵션
      ['color', ['color']], // 글자 색상 설정 옵션
      ['insert', ['picture', 'link', 'video']], // 이미지 삽입, 링크 삽입, 동영상 삽입 옵션
    ],

    fontSizes: [
      '8', '9', '10', '11', '12', '14', '16', '18',
      '20', '22', '24', '28', '30', '36', '50', '72',
    ], // 글꼴 크기 옵션

    styleTags: [
      'p',  // 일반 문단 스타일 옵션
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',  // 제목 스타일 옵션
    ],

    callbacks: {
      onImageUpload: function (files) {
        const uploadList = document.getElementById('uploadList');
        
        // 이미지 다중 업로드
        if (files.length > 1) {
          for (let i = files.length - 1; i >= 0; i--) {
            const reader = new FileReader(); // 파일을 읽음
            reader.onload = (function (file, num) {
              return function (event) {

                createImgNode(event.target.result, file.name, `file${num}`);

                comRemoveActiveClass('.picked_thumnail', 'picked_thumnail'); // 메인이미지 표시 삭제

                uploadList.childNodes[0].classList.add('picked_thumnail'); // 메인이미지 표시
                uploadList.childNodes[0].querySelector('.mainTag').classList.add('mainTag_act'); // 메인이미지 태그 표시
                  
              };
            })(files[i], fileNameNum); // 함수를 정의 후 바로 실행, 매개변수 file = (바깥 괄호)files[i], num = (바깥 괄호)fileNameNum

            reader.readAsDataURL(files[i]); // 파일을 base64로 읽어옴
        
            // 파일 데이터 배열에 파일과 파일 이름 추가
            fileDataArray.push({
              key: 'file' + fileNameNum,
              file: files[i],
              fileName: files[i].name
            });

            fileNameNum++;
          }
        } else {
          const reader = new FileReader();
          reader.onload = ({ target }) => {

            createImgNode(target.result, files[0].name, `file${fileNameNum}`);

            comRemoveActiveClass('.picked_thumnail', 'picked_thumnail'); // 메인이미지 표시 삭제

            uploadList.childNodes[0].classList.add('picked_thumnail'); // 메인이미지 표시
            uploadList.childNodes[0].querySelector('.mainTag').classList.add('mainTag_act'); // 메인이미지 태그 표시
            
            fileNameNum++;
          };

          reader.readAsDataURL(files[0]);
        
          // 파일 데이터 배열에 파일과 파일 이름 추가
          fileDataArray.push({
            key: `file${fileNameNum}`,
            file: files[0],
            fileName: files[0].name
          });

        }
      },

      // 업로드된 이미지 휴지통 아이콘 눌러 삭제
      onMediaDelete: function ($target) {

        let targetFileKey = $target[0].dataset.filekey
        console.log($target[0].dataset.filekey);

        const index = fileDataArray.findIndex((element) => element.key === targetFileKey); // 요소의 인덱스 찾기

        if (index !== -1) { // 요소가 존재하는 경우
            fileDataArray.splice(index, 1); // 배열에서 해당 요소 제거
        }

        for (let value of fileDataArray.values()) {
          console.log('value '  + value); 
        }

      },

      onKeydown: function(e) {
        if (e.keyCode === 8) { // Backspace key code
          // 현재 포커스된 영역이 이미지인지 확인
          let $focusedElement = $(this).summernote('focus');

          console.log($focusedElement);
          console.log($focusedElement.currentSrc);
          console.log($focusedElement.dataset.filename);

          if ($focusedElement.contains('[data-filename]')) {
              // 이미지를 삭제하는 로직을 추가
              $focusedElement.remove(); // 예시로 이미지 요소를 삭제하는 코드
          }
        }
      },
    }
  }); // END summernote

  /* 메인 이미지 선택(클릭) 이벤트 */
  document.getElementById('uploadList').addEventListener('click', (event)=>{
    // const thumnailNode = document.getElementById('uploadImgThumnail');
    // if(thumnailNode.name) {
    //   thumnailNode.name = ''; // 클릭 했었던 이미지의 name 값 초기화
    // }

    const targetElement = event.target;

    // 클릭한 이미지에 '대표' 태그 표시
    const mainTag = document.querySelector('.mainTag_act');
    if(mainTag) {
      mainTag.classList.remove('mainTag_act');
    }
    
    // 가져온 요소가 img 태그일 때만 작동
    if(targetElement.tagName === 'IMG') {
      targetElement.nextSibling.classList.add('mainTag_act');
    }

    comRemoveActiveClass('.picked_thumnail', 'picked_thumnail'); // 클릭 했었던 이미지 추가했던 class 삭제
    
    // border 추가
    if(targetElement.matches('#uploadImgThumnail')){
      targetElement.parentNode.classList.toggle('picked_thumnail');
    }
  });

  // 이미지 업로드 후 노드 생성/삽입
  const createImgNode = function(file, fileName, filekey){
    // 본문에 이미지 삽입
    $('#summernote').summernote('insertImage', file, function ($image) {
      $image.attr('data-fileName', fileName);
      $image.attr('data-filekey', filekey); // forDataArray의 key
    });

    // 업로드된 이미지 라이브러리 생성
    const item = document.createElement('li');
    item.className = 'uploadItem';
    
    const img = document.createElement('img');
    img.id = 'uploadImgThumnail';
    img.src = file;
    img.dataset.name = fileName;
    img.dataset.filekey = filekey;

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

  });

  /**
   * 240220: 장한원
   * step2 -> step3로 가는 '다음' 버튼
   */
  step2Btn.addEventListener('click', ()=>{
    const gatherCost = document.getElementById('moimCost').value.replace(/[,]/g, '');
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

      // 온라인 모임 = null
      gatherAddressData = {
          MOIM_LATI : ''
        , MOIM_LONG : ''
        , MOIM_ADR1 : ''
        , MOIM_ADR2 : ''
      };

    } else {
      gatherAddressData = {
          MOIM_LATI : gatherLati
        , MOIM_LONG : gatherLong
        , MOIM_ADR1 : gatherAddress
        , MOIM_ADR2 : gatherDetailAddress
      };
    }

  });

  /**
   * 240220: 장한원
   * step3 -> step4로 가는 '다음' 버튼
   */
  step3Btn.addEventListener('click', ()=>{
    const gathApprBtn = document.querySelector('.appr_act') // 승인 버튼 두 개 중 누른것(== 'appr_act' 클래스를 가지고 있는 버튼)
    const minAgeInput = document.getElementById('minAge');
    const maxAgeInput = document.getElementById('maxAge');
    const minPeopleInput = document.getElementById('minPeople').value;
    const maxPeopleInput = document.getElementById('maxPeople').value;
    const gathGenderBtn = document.querySelector('.gender_act'); // 성별 버튼 중 누른것(== 'gender_act' 클래스를 가지고 있는 버튼)
    const peopleNoLimitBtn = document.getElementById('peopleNoLimit'); // 인원수 제한없음 버튼

    let gathAppr;
    let minAge = minAgeInput.value;
    let maxAge = maxAgeInput.value;
    let minPeople;
    let maxPeople;
    let gathGender; 

    
    // 승인여부
    if(gathApprBtn) {
      gathAppr = gathApprBtn.getAttribute('data-appr');
    }
    
    // 연령대
    if(minAge == '15' && maxAge == '50') {
      minAge = 0;
      maxAge = 100;
    }
    
    // 참가인원
    if(peopleNoLimitBtn.classList.contains('picked_noLimit')) { // 제한없음 버튼 눌렀을 때
      minPeople = '0';
      maxPeople = '30';

    } else { // 인원수 직접 작성

      if(minPeopleInput) {
        minPeople = minPeopleInput;
      }

      if(maxPeopleInput) {
        maxPeople = maxPeopleInput;
      }

    }

    // 성별
    if(gathGenderBtn) {
      gathGender = gathGenderBtn.getAttribute('data-gender');
    }

    // 데이터 가공
    step3Data ={
        APPR_YSNO : gathAppr
      , MINN_AGEE : minAge
      , MAXX_AGEE : maxAge
      , MINN_PEOP : minPeople
      , MAXX_PEOP : maxPeople
      , APPR_GNDR : gathGender
    };

  });


  /**
 * 240220: 장한원
 * 마지막 '확인' 버튼
 */
  submitBtn.addEventListener('click', () => {

    if(formCheck('step4')) { // 유효성 검사

      let formData = new FormData(); // 서버로 전송할 폼 객체 생성
      const summernote = document.getElementById('summernote').value;
  
      step4Data = {
          MOIM_CNTT: summernote,
          COMP_YSNO: 'Y'
      }
  
      reqData = Object.assign({}, step1Data, step2Data, step3Data, step4Data);
  
      formData.append('data', JSON.stringify(reqData)); // 유저가 입력한 폼 값
      formData.append('map', JSON.stringify(gatherAddressData));
  
      // 메인 대표 이미지
      const picked_thumnail = document.querySelector('.uploadItem.picked_thumnail img');
      let pickedFileName;

      if(picked_thumnail) {
        pickedFileName = picked_thumnail.getAttribute('data-name');
      }
  
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
        body: formData,
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then((data) => {

        if(data != 'fail') {
          comAlert3(
              '모임이 개설되었어요!'
            , null
            , 'success'
            , function() { location.href = `/gatherDetail.com?idx=${data}`; }
          );
        } else if(message == 'fail') {
          comAlert2(
              '데이터를 처리하는 중 오류 발생'
            , '관리자에게 문의해주세요.'
            , 'warning'
            , null
          );
        }
      })
      .catch(error => {
          console.error('네트워크 에러 발생:', error);
      });

    }
  });


});