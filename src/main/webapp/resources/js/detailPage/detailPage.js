document.addEventListener("DOMContentLoaded", function(){

  const detailValue = document.getElementById('detail').value;
  const detail = parseString(detailValue).result; // 모임정보

  const joinMoimBtn = document.getElementById('joinMoimBtn'); // 참여버튼

  const slideContainer = document.querySelector('.slideContainer'); // 리스트를 감싸는 부모
  const slideList = slideContainer.querySelector('.imgWrap'); // 이미지 감싸는 리스트
  const liWidth = slideList.clientWidth; // 슬라이드 너비
  const img = slideList.querySelectorAll('img'); // 슬라이드 이미지
  const slideContentCount = img.length; // 이미지 갯수
  
  const btn = slideContainer.querySelectorAll('.arrowBtn'); // 화살표 버튼
  
  const backgroundImg = document.querySelector('.backgroundImg'); 
  backgroundImg.src = img[0].src; // 백그라운드 이미지 초기화

  /**
   * 240118 장한원
   * 이미지 슬라이더
     컨텐츠가 1개 초과일 때 작동
  */
  if(slideContentCount > 1) {

    let currentIdx = 0; // 현재 슬라이드 index
    let translate = 0; // 슬라이드 이동값

    // dot 생성
    const dotsContainer = document.querySelector('.dotsContainer');
        
    for (let i = 0; i < slideContentCount; i++) {

      const dot = document.createElement('span');
      dot.className = 'dot';
      dot.dataset.index = i;
      // dot 클릭 함수
      dot.onclick = function() {
        if(i > currentIdx) {

          currentIdx = i;
              
          translate = liWidth * currentIdx;
          slideList.style.transform = `translateX(-${translate}px)`;
          slideList.style.transition = `all 400ms ease`;

          updateDot(currentIdx);

        }

        if(i < currentIdx) {

          currentIdx = i;

          translate = liWidth * -currentIdx;
          slideList.style.transform = `translateX(${translate}px)`;
          slideList.style.transition = `all 400ms ease`;

          updateDot(currentIdx);

        }
            
        // 백그라운드 이미지 변경
        changeBackground(i)

      }
          
      dotsContainer.appendChild(dot);
          
    }
        
    updateDot(currentIdx);
        
    // 버튼 제어
    btn.forEach((btn) => {
      const rigthBtn = slideContainer.querySelector('#rigthBtn');
      const leftBtn = slideContainer.querySelector('#leftBtn');
                    
      slideContainer.addEventListener('mouseenter', () => {

        if(currentIdx >= 0 && currentIdx !== slideContentCount-1) {
          addBtnHover(rigthBtn);
        }
            
        if(currentIdx !== 0) {
          addBtnHover(leftBtn);
        } 
      })
          
      slideContainer.addEventListener('mouseleave', () => {

        if(currentIdx === slideContentCount-1) {
          removeBtnHover(rigthBtn);
        }
            
        if(currentIdx === 0) {
          removeBtnHover(leftBtn);
        }

        removeBtnHover(leftBtn);
        removeBtnHover(rigthBtn);

      })

      function addBtnHover(targetBtn) {
        targetBtn.classList.add('_hover');
      }
          
      function removeBtnHover(targetBtn) {
        targetBtn.classList.remove('_hover');
      }
          
      /* 이벤트 등록 */
      btn.addEventListener('click', moveSlide);
        
      /* 버튼 클릭 이벤트 콜백 함수 */
      function moveSlide(event) {
        event.preventDefault();
            
        // 오른쪽 버튼 클릭시
        if(event.target.classList.contains("dr")) {
          if (currentIdx !== slideContentCount-1) {
            currentIdx++;
            transform(currentIdx, leftBtn);

            changeBackground(currentIdx);
          }

          //마지막 슬라이드라면 오른쪽 버튼 안 보이게함
          if(currentIdx === slideContentCount-1) {
            event.target.classList.remove('_hover');
          }

        // 왼쪽 버튼 클릭시
        } else if(event.target.classList.contains("dl")) {
          if (currentIdx !== 0) {
            currentIdx--;
            translate = liWidth * -currentIdx;
            slideList.style.transform = `translateX(${translate}px)`;
            rigthBtn.classList.add('_hover');

            changeBackground(currentIdx);
          }

          //첫번째 슬라이드라면 왼쪽 버튼 안 보이게함
          if(currentIdx === 0) {
            event.target.classList.remove('_hover');
          }
        }

        updateDot(currentIdx);

      }
    }) // END btn.forEach
  } // END  if(slideContentCount > 1)

  else {
    btn.forEach((btn) => {
      btn.style.display = 'none';
    })
  }
      
      
  /**
   * 240119 장한원
   * 이미지 슬라이드 transform 변경 함수
  */ 
  function transform(currentIdx, btnDirection) {
    translate = liWidth * currentIdx;
    slideList.style.transform = `translateX(-${translate}px)`;
    slideList.style.transition = `all 400ms ease`;
    btnDirection.classList.add('_hover');
  }
  

  /**
   * 240119 장한원
   * 백그라운드 이미지 변경 함수
  */ 
  function changeBackground(curIdx) {
    backgroundImg.style.opacity = '0.7';
    setTimeout(() => {
      backgroundImg.src = img[curIdx].src;
      backgroundImg.style.opacity = '1';
    }, 200);
  }        

  
  /**
   * 240119 장한원
   * dot 스타일 적용
  */
  function updateDot(currentIdx) {
    const dots = document.querySelectorAll('.dot');

    dots.forEach((target, index) => {
      if(index == currentIdx) {
        target.classList.add('_active');
      } else {
        target.classList.remove('_active');
      }
    })
  }
  

  /**
   * 240118 장한원
   * 멤버 프로필 오른쪽으로 이동
   */
  const countNode = document.getElementById('count');
  const count = countNode.getAttribute('data-count');

  if(count != 0) {
    
    const memeberItem = countNode.querySelectorAll('.profileImgWrap')

    memeberItem.forEach((item, i) => {
      item.style.left = 44 * i + 'px';
    })

  }
 
  /**
   * 240119 장한원
   * 버튼 제어
   */
  if(sessionStorage.getItem("USER_NUMB") == null) { // 로그인X

    document.querySelector('.loginPlz').style.display = 'block';

  } else { //로그인 했다면
 
    // 참여 버튼 block
    joinMoimBtn.style.display = 'block';
    const yourStateValue = document.getElementById('yourState').value;
    
    // 모임 참여자일 때
    if(yourStateValue != 'null') {

      const yourState = parseString(yourStateValue).result; // yourState data
      const { MAST_YSNO, WAIT_YSNO, BANN_YSNO } = yourState;
      
       // 방장이 아님
      if(MAST_YSNO == 'N') {
        if(BANN_YSNO == 'Y' && WAIT_YSNO == 'Y'){
          
          updateButtonUI(detail.APPR_YSNO, MAST_YSNO, 'rejoin');

        } else {
          // 디폴트 참여취소
          updateButtonUI(null, MAST_YSNO, 'cancel');
        }

      // 방장
      } else if(MAST_YSNO == 'Y') { 

        const updateBtn = document.getElementById('updateBtn');
        updateBtn.style.display = 'block';
        updateButtonUI(null, MAST_YSNO, 'master');
      }

    // 모임 미참여
    } else if(yourStateValue == 'null'){

      updateButtonUI(detail.APPR_YSNO, 'fresh');

    }

  }
  
  // 참여 유효성 검사
  function onClickHandler() {
    const { MINN_AGEE, MAXX_AGEE, GNDR_CODE, MOIM_IDXX, APPR_YSNO } = detail;
    const { USER_AGEE, USER_JUMIN2, USER_NUMB } = sessionStorage;
    const yourStateValue = document.getElementById('yourState').value;
    
    // 나이 체크
    if (isAgeOutOfRange(MINN_AGEE, MAXX_AGEE, USER_AGEE)) {
      comAlert2(4, null, '회원님의 나이가 모임의 연령대에 맞지 않아요.');

    // 성별 체크
    } else if (isGenderMismatch(GNDR_CODE, USER_JUMIN2)) {
      comAlert2(4, null, getGenderMismatchMessage(GNDR_CODE));

    } else {
      if(yourStateValue != 'null') {
        const yourState = parseString(yourStateValue).result;
        const { MAST_YSNO, BANN_YSNO, WAIT_YSNO } = yourState;

        // 일반 참여자
        if(MAST_YSNO == 'N') {
          let states;
          const getBtnState = joinMoimBtn.getAttribute('data-state');
          
          /*==== '참여하기' ====*/
          if(getBtnState == 'join') {

            let waitYsNo; // Ajax로 보낼 WAIT_YSNO 값
    
            /*==== '참여하기' ====*/
            APPR_YSNO == 'N' ? waitYsNo = 'N' : waitYsNo = 'Y'; // APPR_YSNO 값에 따른 WAIT_YSNO 값 설정
    
            const data = {
                MOIM_IDXX : MOIM_IDXX
              , WAIT_YSNO : waitYsNo
            }

            runMoimJoin(data, APPR_YSNO);
            comNotify('001', detail.USER_NUMB);

          /*==== 재참여 ====*/
          } else if(getBtnState == 'rejoin' && BANN_YSNO == 'Y' && WAIT_YSNO == 'Y') {

            states = APPR_YSNO == 'N' ? 'normal' : 'wait'; // APPR_YSNO 값에 따른 states 값 설정

            let data = {
              MOIM_IDXX : MOIM_IDXX
              , USER_NUMB : USER_NUMB
              , states : states
            }
            
            runStateUpdate(data, 're');
            comNotify('011', detail.USER_NUMB);
            
          /*==== '참여취소' ====*/
          } else if(getBtnState == 'cancel') {

            states = 'exit';
            let data = {
              MOIM_IDXX : MOIM_IDXX
            , USER_NUMB : USER_NUMB
            , states : states
            }

            runStateUpdate(data);
            comNotify('003', detail.USER_NUMB);

          }
        }
    
      /*==== 단 한 번도 참여하지 않은 사람 ====*/
      } else if(yourStateValue == 'null'){

        let waitYsNo; // Ajax로 보낼 WAIT_YSNO 값
  
        /*==== '참여하기' ====*/
        APPR_YSNO == 'N' ? waitYsNo = 'N' : waitYsNo = 'Y'; // APPR_YSNO 값에 따른 WAIT_YSNO 값 설정
        
        const data = {
            MOIM_IDXX : MOIM_IDXX
          , WAIT_YSNO : waitYsNo
        }

        runMoimJoin(data, APPR_YSNO);
        comNotify('001', detail.USER_NUMB);

      }
    }
  }

  // 클릭 이벤트 함수
  function addClickListener(element, callback) {
    element.addEventListener('click', callback);
  }

  
  // 참여하기 동작 함수
  function runMoimJoin(data, apprYsNo) {

    comAjax(
      'POST'
      , '/moimJoin.com'
      , JSON.stringify(data)
      , "application/json"
      , function(){ // ajax 성공 후 실행

          comConfirm2(
            getTitleText(apprYsNo)
          , null
          , 'warning'
          , getConfirmText(apprYsNo)
          , 'success'
          , function(){ location. reload(); })

        }
    );

    function getTitleText(apprYsNo) {
      let title; 
      title = apprYsNo == 'N' ? '모임에 참여하시겠어요?' : '모임에 참여 요청을 보낼까요?';
      return title;
    }
  }

  // 취소하기 동작 함수
  function runStateUpdate(data, state) {
    comConfirm2(
        getTitleText(state)
      , null
      , 'warning'
      , getContentText(state)
      , 'success'
      , function(){
        comAjax(
        "POST"
        , "/moimStateUpdate.com"
        , JSON.stringify(data)
        , "application/json"
        , function(){
            location.reload();
          }
      )}
    );

    function getTitleText(state) {
      if(state == 're') {
        return '모임에 재참여하시겠어요?';
      } else {
        return '모임 참여를 취소하시겠어요?';
      }
    }

    function getContentText(state) {
      if(state == 're') {
        return '모임에 참여되었어요!';
      } else {
        return '참여가 취소되었어요.';
      }
    }
  }

  function isAgeOutOfRange(minAge, maxAge, userAge) {

    if(minAge == 0 && maxAge == 100) {

      return false;

    } else {

      return userAge < minAge || userAge > maxAge;

    }
  }

  function isGenderMismatch(moimGender, userJumin2) {
    if(moimGender == null) {

      return false;

    } else {
      
      return (moimGender === 'M' && userJumin2 === '2' || userJumin2 === '4') ||
            (moimGender === 'W' && userJumin2 === '1' || userJumin2 === '3');

    }
  }

  function getGenderMismatchMessage(moimGender) {
    return moimGender === 'M' ? '남성 회원만 참여 가능한 모임이에요.' : '여성 회원만 참여 가능한 모임이에요.';
  }

  function getConfirmText(moimApprYsNo) {
    return moimApprYsNo === 'N' ? '모임에 참여되었어요!' : '모임에 참여 요청을 보냈어요!';
  }

  /* 상황에 따른 버튼 텍스트 제어 */
  function updateButtonUI(moimApprYsNo, masterYsNo, state) {

    let buttonText;
  
    if (moimApprYsNo != null) {
      buttonText = moimApprYsNo === 'N' ? '참여하기' : '참여요청';
    } else if (masterYsNo != null) {
      buttonText = masterYsNo === 'N' ? '참여취소' : '마감하기';
    }
  
    updateButton(joinMoimBtn, buttonText, state);

  }
  
  function updateButton(element, text, state) {
    element.innerHTML = text;
    element.dataset.state = state;
    addClickListener(element, onClickHandler);
  }
  
  


});


