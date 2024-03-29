document.addEventListener("DOMContentLoaded", function(){

  const detailValue = document.getElementById('detail').value;
  const detail = parseString(detailValue).result; // 모임정보

  const joinMoimBtn = document.getElementById('joinMoimBtn'); // 참여버튼

  const slideContainer = document.querySelector('.slideContainer'); // 리스트를 감싸는 부모
  const slideList = slideContainer.querySelector('.imgWrap'); // 이미지 감싸는 리스트
  const liWidth = slideList.clientWidth; // 슬라이드 너비작동
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

  if(detail.MAXX_PEOP == detail.MEMB_COUNT) {
    const newspan = document.createElement('span');
    newspan.innerHTML = '참여 인원이 다 찼어요!';
    newspan.classList.add('maxpeop');
    document.querySelector('.peop').appendChild(newspan);
  }
  

  /**
   * 240129 장한원
   * 참여, 대기 명단
   */
  const memeberList = document.querySelectorAll('.memeberProfiles');
  memeberList.forEach(list =>{
    const profileWrapper = list.querySelectorAll('.profileWrapper');
    const profileImgWrap = list.querySelectorAll('.profileImgWrap');
    const profileInfo = list.querySelectorAll('.profileInfo');

    // 참여자 명단
    if(profileWrapper.length > 0) { // 방장을 제외한 참여회원

      profileWrapper.forEach((item, i) => {

        item.style.left = 44 * i + 'px';
        
        item.addEventListener('mouseover', ()=>{
          joinMemberListControl('over', i);
        });
        
        item.addEventListener('mouseleave', ()=>{
          joinMemberListControl('leave', i);
        });

        // 자기소개 12자로 자름
        let profileInfo = item.querySelector('.profileInfo');
        let selfIntrNode = profileInfo.querySelector('.self');
        let selfIntrHidden = profileInfo.querySelector('#selfIntr');
        let selfIntrValue = selfIntrHidden.value;
        if(selfIntrValue.length > 12) {
          let cutValue = selfIntrValue.substring(0, 12);
          if(cutValue.substring(11, 12) == ' ') {
            cutValue.substring(0, 11);

            selfIntrNode.innerHTML = `${cutValue}...`;
          }

          selfIntrNode.innerHTML = `${cutValue}...`;
        }

      });

    // 참여 멤버 없을 때
    } else if(profileImgWrap.length == 0){

      // 안내문구
      const noMemberText = document.createElement('p');
      noMemberText.style = 'font-weight: 500; line-height: 29px; color: var(--color-gray500)';
      noMemberText.textContent  = '참여한 멤버가 없습니다.   첫 번째 멤버가 되어보세요!';
      list.appendChild(noMemberText);

      // 참여승인대기 회원 없을 경우 아예 안 띄움
      if(list.getAttribute('data-appr') == 'Y') {
        document.querySelector('.apprlist').style.display = 'none';
      }
    }

    function joinMemberListControl(state, i) {
      profileInfo[i].style.display = state == 'over' ? 'flex' : 'none';
      
      if(i != profileWrapper.length - 1) {
          profileWrapper[i+1].style.left = state == 'over' ? `${profileWrapper[i].clientWidth}px` : `${44 * (i+1)}px`;
          
          for (let j=i+1; j < profileWrapper.length; j++) {
            profileWrapper[j].style.left = state == 'over' ? `${(profileWrapper[i].clientWidth - 25) + 44 * j}px` : `${44 * j}px`;
             profileWrapper[j].style.transition = 'left 0.3s ease-in-out';
          }
      }
    }
  });

  /**
   * 240119 장한원
   * 버튼 제어
   */
  if(sessionStorage.getItem("USER_NUMB") == null) { // 로그인X

    if(detail.ENDD_YSNO == 'N') {
      document.querySelector('.loginPlz').style.display = 'block';
    }

  } else { //로그인 했다면

    // 팔로우 버튼
    const followBtn = document.querySelectorAll('.f');

    followBtn.forEach(btn => {

      let followCode = btn.getAttribute('data-code');
      let userNumb = btn.getAttribute('data-numb');

      if(userNumb == sessionStorage.getItem("USER_NUMB")) {

        btn.style.display = 'none'


      } else {

      btn.style.display = 'block'

        if(followCode == 'FI'){

          btn.style.backgroundColor = 'var(--color-white)';
          btn.style.color = 'var(--primary)';
          
          btn.addEventListener('mouseenter', ()=>{
            btn.classList.add('actb');
          });

          btn.addEventListener('mouseleave', ()=>{
            btn.classList.remove('actb');
          });

        }
      }
    });

    const yourStateValue = document.getElementById('yourState').value;
    
    // 모임 참여자일 때
    if(yourStateValue != 'null') {

      const yourState = parseString(yourStateValue).result; // yourState data
      const { MAST_YSNO, WAIT_YSNO, BANN_YSNO, REVW_YSNO } = yourState;
         
       // 방장이 아님
      if(MAST_YSNO == 'N') {

        // 모임 마감 안 됨
        if(detail.ENDD_YSNO == 'N') {
          // 참여 버튼 block
          joinMoimBtn.style.display = 'block';

          // 재참여
          if(BANN_YSNO == 'Y' && WAIT_YSNO == 'Y') {
            
            updateButtonUI(detail.APPR_YSNO, MAST_YSNO, 'rejoin');
  
          // 강퇴자
          } else if(BANN_YSNO == 'Y' && WAIT_YSNO == 'N') {
            joinMoimBtn.innerHTML = '이 모임에 참여할 수 없어요.';
            joinMoimBtn.addEventListener('click', onClickHandler);
          
          } else {
            // 디폴트 참여취소
            updateButtonUI(null, MAST_YSNO, 'cancel');
  
            if(BANN_YSNO == 'N' && WAIT_YSNO == 'Y') {
              document.querySelector('.bubble').style.display = 'flex';
            }
          }
        
        // 모임 마감
        } else if(detail.ENDD_YSNO == 'Y') {
          
          joinMoimBtn.style.display = 'none';
          
          if(REVW_YSNO == 'Y') {

            // 리뷰 버튼 띄움
            const reviewBtn = document.getElementById('reviewBtn');
            reviewBtn.style.display = 'block';

          }
        }

      // 방장
      } else if(MAST_YSNO == 'Y') {

        // 모임 마감 안 됨
        if(detail.ENDD_YSNO == 'N') {

          joinMoimBtn.style.display = 'block';

          // 수정 버튼 띄움
          const updateBtn = document.getElementById('updateBtn');
          updateBtn.style.display = 'block';

          updateButtonUI(null, MAST_YSNO, 'master');
        
          /* 강퇴 버튼 */
          const bannBtn = document.querySelectorAll('.bann');
          bannBtn.forEach(btn => {
            btn.style.display = 'block';

            const data = {
              MOIM_IDXX : detail.MOIM_IDXX
              , USER_NUMB : btn.getAttribute('data-numb')
              , states : 'bann'
            }

            btn.addEventListener('click', function(){ runBann(data, '강퇴') });
          });

          /* 승인 버튼 */
          const apprBtn = document.querySelectorAll('.appr');
          apprBtn.forEach(btn => {
            btn.style.display = 'block';
            btn.addEventListener('click', ()=>{
    
              const data = {
                  MOIM_IDXX : detail.MOIM_IDXX
                , USER_NUMB : btn.getAttribute('data-numb')
                , states : 'normal'
              }
    
              btn.addEventListener('click', function(){ runBann(data, '승인') });
    
            });
          })

          /* 승인 거절 버튼 */
          const noApprBtn = document.querySelectorAll('.noAppr');
          noApprBtn.forEach(btn => {
            btn.style.display = 'block';
            btn.addEventListener('click', ()=>{
    
              const data = {
                  MOIM_IDXX : detail.MOIM_IDXX
                , USER_NUMB : btn.getAttribute('data-numb')
                , states : 'bann'
              }
    
              btn.addEventListener('click', function(){ runBann(data, '거절') });
    
            });
          });

        // 모임 마감
        } else if(detail.ENDD_YSNO == 'Y') {
          
          joinMoimBtn.style.display = 'block';
          joinMoimBtn.innerHTML = '이대로 모임 다시 만들기';
        }
      }

    // 모임 미참여
    } else if(yourStateValue == 'null'){
      if(detail.ENDD_YSNO == 'N') {
        joinMoimBtn.style.display = 'block';
      }

      updateButtonUI(detail.APPR_YSNO, 'fresh');

    }
  }


  /* 상황에 따른 버튼 텍스트 제어 */
  function updateButtonUI(moimApprYsNo, masterYsNo, state) {

    let buttonText;
    
    if (moimApprYsNo != null) {
        buttonText = moimApprYsNo === 'N' ? '참여하기' : '참여요청';
    } else if (masterYsNo != null) {
        buttonText = masterYsNo === 'N' ? '참여취소' : '마감하기';
    }
    
    joinMoimBtn.innerHTML = buttonText;
    joinMoimBtn.dataset.state = state;
    joinMoimBtn.addEventListener('click', onClickHandler);

  }
    
  /* 참여 유효성 검사 */
  function onClickHandler() {
    const { MINN_AGEE, MAXX_AGEE, GNDR_CODE, MOIM_IDXX, APPR_YSNO, MAXX_PEOP, MEMB_COUNT } = detail;
    const { USER_AGEE, USER_JUMIN2, USER_NUMB} = sessionStorage;
    const yourStateValue = document.getElementById('yourState').value;

    // 인원
    if(MAXX_PEOP == MEMB_COUNT){
      comAlert2(4, '참여인원이 가득 찼어요');

    // 연령
    } else if(isAgeOutOfRange(MINN_AGEE, MAXX_AGEE, USER_AGEE)) {
      comAlert2(4, null, '회원님의 나이가 모임의 연령대에 맞지 않아요');
  
    // 성별
    } else if(isGenderMismatch(GNDR_CODE, USER_JUMIN2)) {
      comAlert2(4, null, getGenderMismatchMessage(GNDR_CODE));

    } else if(yourStateValue != 'null') {
      const yourState = parseString(yourStateValue).result;
      const { MAST_YSNO, BANN_YSNO, WAIT_YSNO } = yourState;

      // 일반 참여자
      if(MAST_YSNO == 'N') {
        
        // 강퇴여부
        if(BANN_YSNO == 'Y' && WAIT_YSNO == 'N') {
          comAlert2(3, '모임에 참여할 수 없어요.', '강퇴 당하거나 승인 거절 당한 모임입니다.')
        
        // 검사 통과
        } else {

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

          /*==== 재참여 ====*/
          } else if(getBtnState == 'rejoin' && BANN_YSNO == 'Y' && WAIT_YSNO == 'Y') {

            let btnState;

            if(APPR_YSNO == 'N') {
              states = 'normal';
              btnState= 're'; // 재참여
            } else {
              states = 'wait';
              btnState= 'needAppr'; //승인 필요한 모임의 재참여
            }

            const data = {
                MOIM_IDXX : MOIM_IDXX
              , USER_NUMB : USER_NUMB
              , states : states
            }

            runStateUpdate(data, btnState);
            
          /*==== '참여취소' ====*/
          } else if(getBtnState == 'cancel') {

            const data = {
              MOIM_IDXX : MOIM_IDXX
            , USER_NUMB : USER_NUMB
            , states : 'exit'
            }

            runStateUpdate(data, 'cancel');

          }
        }

      } else if(MAST_YSNO == 'Y') { // 방장일 때

        if(MEMB_COUNT < MAXX_PEOP) {

          /* 참여한 멤버 번호 리스트 */
          let memberListValue = [];
          const memberNumList = document.querySelectorAll('#data-mem');
          memberNumList.forEach(item => {
            let memberNum = item.value;
            memberListValue.push(memberNum);
          });

          comConfirm2(
            matchingText().confirmTitle
          , matchingText().confirmContent
          , 'warning'
          , '마감되었습니다.'
          , 'success'
          , function(){
              comAjax(
                "POST"
              , "/setGatherEnd.com"
              , JSON.stringify({ MOIM_IDXX : MOIM_IDXX})
              , "application/json"
              , function(){
                  for (let i = 0; i < memberListValue.length; i++) {
                    comNotify('B04', memberListValue[i]);
                  }
                  location.reload();
              }
            )}
          );

          function matchingText() {
            let confirmTitle;
            let confirmContent;

            if(MEMB_COUNT < MAXX_PEOP) {
              confirmTitle = getConfirmText('earlyEnd').confirmTitle
              confirmContent = getConfirmText('earlyEnd').confirmContent
            } else {
              confirmTitle = getConfirmText('end').confirmTitle
              confirmContent = getConfirmText('end').confirmContent
            }

            return { confirmTitle: confirmTitle, confirmContent: confirmContent }
          }
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

    }
  }

  /* 참여하기 동작 함수 */
  function runMoimJoin(data, apprYsNo) {
    comAjax(
      'POST'
      , '/moimJoin.com'
      , JSON.stringify(data)
      , "application/json"
      , function(){ // ajax 성공 후 실행
          comConfirm2(
            getText(apprYsNo).title
          , null
          , 'warning'
          , getText(apprYsNo).text
          , 'success'
          , function(){
              location. reload(); 
              getBtnStateAndRunNotify(apprYsNo);
            })
        }
    );

    function getText(apprYsNo) {
      let title; 
      let text;

      title = apprYsNo == 'N' ? '모임에 참여하시겠어요?' : '모임에 참여 요청을 보낼까요?';
      text = apprYsNo == 'N' ? '모임에 참여되었어요!' : '모임에 참여 요청을 보냈어요!';

      return { title : title, text: text };
    }

    function getBtnStateAndRunNotify(apprYsNo) {

      let btnState;
      btnState = apprYsNo == 'N' ? 'join' : 'needAppr';

      runNotify(btnState);
    }
  }

  /* 취소하기 동작 함수 */
  function runStateUpdate(data, btnState) {
    comConfirm2(
        getConfirmText(btnState).confirmTitle
      , getBigContentText(btnState)
      , 'warning'
      , getConfirmText(btnState).confirmOkContent
      , 'success'
      , function(){
        comAjax(
        "POST"
        , "/moimStateUpdate.com"
        , JSON.stringify(data)
        , "application/json"
        , function(){
            location.reload();
            runNotify(btnState);
          }
      )}
    );

    function getBigContentText(btnState) {
      const yourStateValue = document.getElementById('yourState').value;
      const yourState = parseString(yourStateValue).result;
      const { BANN_YSNO, WAIT_YSNO } = yourState;
      
      if(btnState == 'cancel' && BANN_YSNO == 'N' && WAIT_YSNO == 'Y'){
        return '승인 대기중인 모임이에요.';
      } else {
        return null;
      }
    }
  }

  /* 강퇴/승인/거절 동작 함수 */
  function runBann(data, btnState) {
    comConfirm2(
        getConfirmText(btnState).confirmTitle
      , getConfirmText(btnState).confirmContent
      , 'warning'
      , getConfirmText(btnState).confirmOkContent
      , 'success'
      , function(){
        comAjax(
        "POST"
        , "/moimStateUpdate.com"
        , JSON.stringify(data)
        , "application/json"
        , function(){
            runNotify(btnState, data.USER_NUMB);
            location.reload();
          }
      )}
    );
  }

  /* 컨펌창 문구 리턴 함수 */
  function getConfirmText(btnState) {
    let confirmTitle;
    let confirmContent;
    let confirmOkContent;

    if(btnState == 're') {
      confirmTitle = '모임에 재참여하시겠어요?';
      confirmOkContent = '모임에 참여되었어요!';

    } else if(btnState == 'needAppr') {
      confirmTitle = '모임에 다시 참여 요청을 보낼까요?'
      confirmOkContent = '모임에 참여 요청을 보냈어요!';

    } else if(btnState == 'cancel') {
      confirmTitle = '모임 참여를 취소하시겠어요?';
      confirmOkContent = '참여 취소되었습니다.';

    } else if(btnState == '강퇴') {
      confirmTitle = '해당 회원을 강제퇴장하시겠어요?';
      confirmOkContent = '강제퇴장 처리되었습니다.';
      confirmContent = '해당 작업은 취소할 수 없어요.';

    } else if(btnState == '승인') {
      confirmTitle = '해당 회원의 참여를 승인하시겠어요?';
      confirmOkContent = '승인되었습니다.';

    } else if(btnState == '거절') {
      confirmTitle = '해당 회원의 참여를 거절하시겠어요?';
      confirmContent = '해당 작업은 취소할 수 없어요.';
      confirmOkContent = '승인 거절되었습니다.';

    } else if(btnState == 'earlyEnd') {
      confirmTitle = '모임 인원이 가득 차지 않았어요.';
      confirmContent = '이대로 마감할까요?';

    } else if(btnState == 'end') {
      confirmTitle = '이대로 마감할까요?';
      confirmContent = null;
    }

    return { confirmTitle: confirmTitle, confirmContent: confirmContent, confirmOkContent: confirmOkContent }
  }

  /* comNotify 호출 함수 */  
  function runNotify(btnState, postUser) {
    if(btnState == 'join') {
      return comNotify('A01', detail.USER_NUMB);
  
    } else if(btnState == 'needAppr') {
      return comNotify('A02', detail.USER_NUMB);
  
    } else if(btnState == 'cancel') {
      return comNotify('A03', detail.USER_NUMB);
        
    } else if(btnState == 're') {
      return comNotify('A07', detail.USER_NUMB);
        
    } else if(btnState == '승인') {
      return comNotify('B01', postUser);
        
    } else if(btnState == '거절') {
      return comNotify('B02', postUser);

    } else if(btnState == '강퇴') {
      return comNotify('B03', postUser);
        
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

}); // END DOMContentLoaded