/**
 * 회원가입 폼(UI)을 생성하거나 생성된 폼을 컨트롤함
 */

document.addEventListener('DOMContentLoaded', ()=>{
  let pickedRegiListForStep4 = []; // step4 폼을 위한 리스트

  const showPwBtn = document.querySelectorAll('.showPw'); // 비밀번호 표시 버튼
  let showIconSrc;  // 비밀번호 표시 아이콘 src

  const userPw = document.getElementById('userPw'); // joinform 비밀번호 입력 input
  const pwConfirm = document.getElementById('pwConfirm'); // joinform 비밀번호 확인 입력 input

  const userPwForm = document.getElementById('PASS_WORD'); // loginform 비빌번호 입력 input

  showPwBtn.forEach(btn => { // forEach 이유: join, login 각 한 개씩 존재함

    let pwBtnImg = btn.querySelector('.pwBtnImg'); // 각 버튼 안에 담긴 img 선택

    showIconSrc = btn.getAttribute('data-src'); // 아이콘 src 가져옴
    pwBtnImg.src = showIconSrc; // 아이콘 초기화

   /**
    * 240229 장한원 수정
    * 비밀번호 표시, 숨김 버튼 클릭 이벤트
    */
    btn.addEventListener('click', ()=>{
      btn.classList.toggle('active');

      if(btn.classList.contains('active')) {

        pwBtnImg.src = '/resources/img/login/eyeHideIcon.png';

        if(btn.classList.contains('f-join')) { // joinform

          userPw.type = 'text';
          pwConfirm.type = 'text';
        
        } else { // loginform
          userPwForm.type = 'text';
        }
        
      } else {

        pwBtnImg.src = showIconSrc;

        if(btn.classList.contains('f-join')) { // joinform

          userPw.type = 'password';
          pwConfirm.type = 'password';

        } else { // loginform
          userPwForm.type = 'password';
        }
        
      }
    });
  });

  const btnContainer = document.querySelectorAll('.btnContainer');
  const signupContainer = document.getElementById('signupContainer');
  const signupStep2 = document.getElementById('signupStep2');
  const signupStep3 = document.getElementById('signupStep3');
  const signupStep4 = document.getElementById('signupStep4');

  /* 
  * 240215: 장한원
  * 이전/다음 버튼 클릭 이벤트(수정)
  */
  btnContainer.forEach(btn=>{
    btn.addEventListener('click', (event)=>{
      const target = event.target;
      const btnId = target.id; // 클릭한 버튼 아이디

      /* 다음 버튼 */
      if(target.matches('.next')) {

        if(btnId == 'next') {

          if (joinFormCheck('step1')) {

            showStep(signupStep2);
      
            const appendNode = signupContainer.querySelectorAll('.append_join');
            appendNode.forEach(element => {
              element.innerHTML = '';
            });
            
          }

        } else if(btnId == 'next2'){

          if (joinFormCheck('step2')) {
            showStep(signupStep3);

            const appendNode = signupStep2.querySelectorAll('.append_join');
            appendNode.forEach(element => {
              element.innerHTML = '';
            });
          }

        } else if(btnId == 'next3') {

          showStep(signupStep4);
          const appendNode = signupStep3.querySelectorAll('.append_join');
          appendNode.forEach(element => {
            element.innerHTML = '';
          });
        }

      /* 이전버튼 */
      } else if(target.matches('.prev')){

        if(btnId == 'prev') {

          signupContainer.classList.remove('_act');
          loginForm.classList.add('_act');
      
        } else if(btnId == 'prev2') {

          signupStep2.classList.remove('_act');
          signupContainer.classList.add('_act');
      
        } else if(btnId == 'prev3') {

          signupStep3.classList.remove('_act');
          signupStep2.classList.add('_act');
      
        } else if(btnId == 'prev4') {

          signupStep4.classList.remove('_act');
          signupStep3.classList.add('_act');
      
          removeCreatedElements();
        }
      }
    });
  });

  // 이미 생성된 요소 삭제하는 함수
  function removeCreatedElements() {
    const parentRegiItems = document.querySelectorAll('.parentRegiItem');
    parentRegiItems.forEach(item => {
        item.parentNode.removeChild(item);
    });
  }

  /**
   * 240214 장한원
   * step4
   * 기본 프로필 이미지 요소 생성
   */
  const profileImgList = document.querySelector('.profileImgList');

  for (let i = 1; i < 8; i++) {
    profileImgList.dataset.value = `basicProfile${i}`;

    const item = document.createElement('div');
    const imgWrap = document.createElement('div');
    const imgTag = document.createElement('img');

    item.classList.add('basicProfileItem');
    
    imgWrap.classList.add('profileImgWrap');
    imgWrap.classList.add('basic-p');
    
    imgTag.src = `/resources/img/basic/profile/basicProfile${i}.png`;
    imgTag.dataset.value = `basicProfile${i}`;
    imgTag.classList.add('profileImg');

    item.appendChild(imgWrap);
    imgWrap.appendChild(imgTag);
    profileImgList.appendChild(item);
  }
  


}); // END DOMContentLoaded


/* 
 * admin: 장한원
 * 로그인/회원가입 폼 전환을 담당
*/
const toggleForm = function(formId) {
  const loginForm = document.getElementById('loginForm');
  const findIdForm = document.getElementById('findIdForm');
  const findPwForm = document.getElementById('findPwForm');
  const signupContainer = document.getElementById('signupContainer');

  loginForm.classList.remove('_act');

  if (formId === 'findIdForm') {
    findIdForm.classList.add('_act');
  } else if (formId === 'findPwForm') {
    findPwForm.classList.add('_act');
  } else if(formId === 'signupForm') {
    signupContainer.classList.add('_act');
    loginForm.classList.remove('_act');
  }
}


/**
 * 버튼 클릭시 다음(이전) 폼 보여주는 함수
 */
const showStep = function(stepElement) {
  signupContainer.classList.remove('_act');
  stepElement.classList.add('_act');
}


/**
 * admin: 장한원
 * 유효성검사 경고 문구 띄우는 함수
*/
const controlStyleAndAppendWarning = function(element, appendId, appendText) {

  document.getElementById(appendId).innerHTML = appendText;

  element.focus();
}


/**
 * admin: 장한원
 * 유효성검사 경고 문구 숨기는 함수
*/
const hideWarning = function(className) {
  const appendNode = document.querySelector(className);

  appendNode.innerHTML = '';
}


/**
  * 240213 장한원
  * 메일 인증 번호 유효시간 타이머
*/
let countdownInterval;
function startTimer() {
  const timeInMinutes = 3;
  const timeInSeconds = timeInMinutes * 60;

  const timerDisplay = document.getElementById('timer');
  let currentTime = timeInSeconds;

  clearInterval(countdownInterval); // 타이머 멈춤
  timerDisplay.textContent = ''; // 타이머 표시 요소를 초기화

  // 초단위로 감소하는 타이머
  countdownInterval = setInterval(() => {
      currentTime--;
      updateTimerDisplay(currentTime);

      if (currentTime <= 0) {
          clearInterval(countdownInterval);

          timerDisplay.textContent = '0:00';

          comAlert3(
              '인증 시간이 만료되었습니다.'
            , null, 'warning'
            , function(){
                document.querySelector('.authmailContainer').style.display = 'none';
                document.querySelector('#authnum').value = '';
              }
          );
      }
  }, 1000);
}

/* 
 * 240213 장한원
 * 타이머 표시 업데이트 함수
*/
function updateTimerDisplay(timeInSeconds) {
  const timerDisplay = document.getElementById('timer');
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;

  timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
} 

// 유저가 선택한 부모 지역 만드는 함수
const createParent = function(current) {
  const regiList = document.querySelector('.regiList');

  const parentList = document.createElement('ul');
  parentList.dataset.step4Pcode = current.parentCode;
  parentList.className = 'parentRegiItem';

  const childRegiListTag = document.createElement('ul'); // 자식 li 담는 ul
  childRegiListTag.className = 'pickedChildRegiList';
  childRegiListTag.dataset.step4Child = current.parentCode;
  
  const parentName = document.createElement('span');
  parentName.innerHTML = current.parentName;

  parentList.appendChild(parentName);
  parentList.appendChild(childRegiListTag);
  regiList.append(parentList);
}