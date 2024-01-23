document.addEventListener("DOMContentLoaded", function(){
  // 모임 정보
  const detailValue = document.getElementById('detail').value;
  const detail = parseString(detailValue).result;

  /**
   * 240118 장한원
   * 이미지 슬라이더
  */
 const slideContainer = document.querySelector('.slideContainer'); // 리스트를 감싸는 부모
 const slideList = slideContainer.querySelector('.imgWrap'); // 이미지 감싸는 리스트
 const img = slideList.querySelectorAll('img');
 const btn = slideContainer.querySelectorAll('.arrowBtn'); // 화살표 버튼

 const slideContentCount = img.length; // 이미지 갯수
 const liWidth = slideList.clientWidth; // 이미지 너비
 
 /* 백그라운드 이미지 초기화 */
 const backgroundImg = document.querySelector('.backgroundImg'); 
 backgroundImg.src = img[0].src;

      // 컨텐츠가 1개 초과일 때
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
 
    const yourStateValue = document.getElementById('yourState').value;

    // 참여 버튼 block
    const joinMoimBtn = document.getElementById('joinMoimBtn');
    joinMoimBtn.style.display = 'block';
    
    // 모임 참여자일 때
    if(yourStateValue != 'null') {
      
      const yourState = parseString(yourStateValue).result;
      
       // 방장이 아님
      if(yourState.MAST_YSNO == 'N') {

        if(yourState.WAIT_YSNO == 'N') {

          updateInnerHTML(joinMoimBtn, '참여취소');

        }

        if(yourState.BANN_YSNO == 'Y'){

        }

      // 방장
      } else if(yourState.MAST_YSNO == 'Y') { 
        const updateBtn = document.getElementById('updateBtn');
        updateBtn.style.display = 'block';
        updateInnerHTML(joinMoimBtn, '마감하기');

      }

    // 모임 미참여
    } else if(yourStateValue == 'null'){

      // Example usage
      updateButtonUI(detail.APPR_YSNO);

    }
  }


/* element에 innerText을 innerHTML 해주는 함수 */
function updateInnerHTML(element, innerText) {
  element.innerHTML = innerText;
}

// 클릭 이벤트 함수
function addClickListener(element, callback) {
  element.addEventListener('click', callback);
}

// 참여 유효성 검사
function onClickHandler() {
  const { MINN_AGEE, MAXX_AGEE, GNDR_CODE, MOIM_IDXX, APPR_YSNO } = detail;
  const { USER_AGEE, USER_GNDR, USER_JUMIN2 } = sessionStorage;
  let WAIT_YSNO;

  if (isAgeOutOfRange(MINN_AGEE, MAXX_AGEE, USER_AGEE)) {

    comAlert2(4, null, '회원님의 나이가 모임의 연령대에 맞지 않습니다.');

  } else if (isGenderMismatch(GNDR_CODE, USER_JUMIN2)) {

    comAlert2(4, null, getGenderMismatchMessage(GNDR_CODE));

  } else {

    if(APPR_YSNO == 'N') {
      WAIT_YSNO = 'N'
    } else {
      WAIT_YSNO = 'Y'
    }

    const data = {
        MOIM_IDXX : MOIM_IDXX
      , WAIT_YSNO : WAIT_YSNO
    }

    comAjax(
      "POST"
      , "/moimJoin.com"
      , JSON.stringify(data)
      , "application/json"
    );
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
    
    return (moimGender === 'M' && userJumin2 === '1' && userJumin2 === '3') ||
           (moimGender === 'W' && userJumin2 === '2' && userJumin2 === '4');

  }
}

function getGenderMismatchMessage(moimGender) {
  return moimGender === 'M' ? '여성회원만 참여가능한 모임입니다' : '남성회원만 참여가능한 모임입니다';
}

function updateButtonUI(approvalStatus) {
  const buttonText = approvalStatus === 'N' ? '참여하기' : '참여요청';
  updateInnerHTML(joinMoimBtn, buttonText);
  addClickListener(joinMoimBtn, onClickHandler);
}

})


