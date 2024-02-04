/**
 * 240204 장한원
 * 로그인 유효성 검사 함수
 */
function loginCheck(where) {
  if(where == 'step2') {
    const userId = document.getElementById("userId");
    const userPw = document.getElementById("userPw");
    const pwConfirm = document.getElementById("pwConfirm");
    const cellNum = document.getElementById("userCell");
  }
}

// 로그인/회원가입 폼 전환을 담당
function toggleForm(formId) {
  const loginForm = document.getElementById("loginForm");
  const findIdForm = document.getElementById("findIdForm");
  const findPwForm = document.getElementById("findPwForm");
  const signupContainer = document.getElementById("signupContainer");

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

// 이전버튼
function prevSection(where) {
  const loginForm = document.getElementById("loginForm");
  const signupContainer = document.getElementById("signupContainer");
  const signupStep2 = document.getElementById("signupStep2");
  const signupStep3 = document.getElementById("signupStep3");
  const signupStep4 = document.getElementById("signupStep4");

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

// 다음버튼
function nextSection(where) {
  const signupContainer = document.getElementById("signupContainer");
  const signupStep2 = document.getElementById("signupStep2");
  const signupStep3 = document.getElementById("signupStep3");
  const signupStep4 = document.getElementById("signupStep4");

  if(where == 'step2') {
    signupContainer.classList.remove('_act');
    signupStep2.classList.add('_act');

  } else if(where == 'step3') {
    signupStep2.classList.remove('_act');
    signupStep3.classList.add('_act');
    
  } else if(where == 'step4') {
    signupStep3.classList.remove('_act');
    signupStep4.classList.add('_act');
  }
}