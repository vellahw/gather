const controlStyleAndAppendWarning = function(element, appendId, appendText) {
  const idContainer = document.querySelector('.userIdContainer');

  if(appendId != 'appendId') {
    element.style.marginBottom = '10px';
  } else {
    idContainer.style.marginBottom = '10px';
  }

  appendWarning(appendId, appendText);

  element.focus();
}


/**
 * admin 장한원
 * 유효성 검사 함수
*/
const joinFormCheck = function(where) {
  const userId = document.getElementById('userId');
  const userIdContainer = document.querySelector('.userIdContainer');
  const userPw = document.getElementById('userPw');
  const pwConfirm = document.getElementById('pwConfirm');
  const cellNum = document.getElementById('userCell');

  if(where == 'step2') {

    if(!userId.value) {
      userIdContainer.style.marginBottom = '10px';
      appendWarning('appendId', '아이디(이메일)을 입력해주세요.');
      userId.focus();

      return false;

    } else if(!userPw.value){
      userPw.style.marginBottom = '10px';
      appendWarning('appendPw', '비밀번호를 입력해주세요.');
      userPw.focus();

      return false;
    
    } else if(!pwConfirm.value) {
      controlStyleAndAppendWarning(pwConfirm, 'appendPwConfirm', '비밀번호가 일치하지 않습니다.');
      return false;

    } else if(!cellNum.value) {
      controlStyleAndAppendWarning(cellNum, 'appendCell', '핸드폰번호를 입력해주세요.');
      return false;

    } else {
      return true;
    }

  }
}

/**
 * admin: 장한원
 * 각 input에 change 이벤트를 걸어줌
 */
const inputChangeHandler = function() {
  const userId = document.getElementById('userId');
  const userIdContainer = document.querySelector('.userIdContainer');
  const userPw = document.getElementById('userPw');
  const pwConfirm = document.getElementById('pwConfirm');
  const userCell = document.getElementById('userCell');

  userId.addEventListener('change', ()=>{
    if(!checkId(userId.value)){ 
      userId.focus();
      userIdContainer.style.marginBottom = '10px';
      appendWarning('appendId', '올바른 이메일 형식을 입력해주세요.');

    } else {
      hideWarning('.userId');
    }
  });

  pwConfirm.addEventListener('change', ()=>{
    if(userPw.value != pwConfirm.value) {
      pwConfirm.focus();
      pwConfirm.style.marginBottom = '10px';
      appendWarning('appendPwConfirm', '비밀번호가 일치하지 않습니다.');

    } else {
      hideWarning('.pwConfirm');
    }
  });

  userCell.addEventListener('change', ()=>{
    if(userCell.value) {
      hideWarning('.userCell');
    }
  });

  const hideWarning = function(className) {
    const appendNode = document.querySelector(className);
    appendNode.style.display = 'none';
  }
}

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

/* 
 * admin: 장한원
 * [이전] 버튼 클릭시 동작
*/
const prevSection = function(where) {
  const loginForm = document.getElementById('loginForm');
  const signupContainer = document.getElementById('signupContainer');
  const signupStep2 = document.getElementById('signupStep2');
  const signupStep3 = document.getElementById('signupStep3');
  const signupStep4 = document.getElementById('signupStep4');

  if(where == 'step2') {
    signupContainer.classList.remove('_act');
    loginForm.classList.add('_act');

  } else if(where == 'step3') {
    signupStep2.classList.remove('_act');
    signupContainer.classList.add('_act');

  } else if(where == 'step4') {
    signupStep3.classList.remove('_act');
    signupStep2.classList.add('_act');

  } else if(where == 'step5') {
    signupStep4.classList.remove('_act');
    signupStep3.classList.add('_act');
  }
}

/* 
 * admin: 장한원
 * [다음(확인)] 버튼 클릭시 동작
*/
const nextSection = function(where) {
  const signupContainer = document.getElementById('signupContainer');
  const signupStep2 = document.getElementById('signupStep2');
  const signupStep3 = document.getElementById('signupStep3');
  const signupStep4 = document.getElementById('signupStep4');

  if (where == 'step2') {
    if (joinFormCheck('step2')) {
      showStep(signupStep2);
      const appendList = document.querySelectorAll('.append');
      appendList.forEach(element => {
        element.style.display = 'none';
      })
    }
  } else if (where == 'step3') {
      showStep(signupStep3);
  } else if (where == 'step4') {
      showStep(signupStep4);
  }
}

const showStep = function(stepElement) {
  signupContainer.classList.remove('_act');
  stepElement.classList.add('_act');
}