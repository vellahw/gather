document.addEventListener('DOMContentLoaded', function () {
  const showPwBtn = document.querySelector('.showPw');
  const showIconSrc = showPwBtn.getAttribute('data-src');
  const pwBtnImg = showPwBtn.querySelector('.pwBtnImg');
  const userPw = document.getElementById('userPw');
  const pwConfirm = document.getElementById('pwConfirm');

  pwBtnImg.src = showIconSrc; // 비밀번호 표시 버튼 이미지 src
  
  /**
   * 240210 장한원
   * 비밀번호 표시, 숨김 버튼
   */
  showPwBtn.addEventListener('click', ()=>{
    showPwBtn.classList.toggle('active');

    if(showPwBtn.classList.contains('active')) {
      pwBtnImg.src = '/resources/img/login/eyeHideIcon.png';
      userPw.type = 'text';
      pwConfirm.type = 'text';
      
    } else {
      pwBtnImg.src = showIconSrc;
      userPw.type = 'password';
      pwConfirm.type = 'password';
    }
  });


});


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
 * admin: 장한원
 * 경고 문구 append 컨트롤 함수
 */
const controlStyleAndAppendWarning = function(element, appendId, appendText) {
  const idContainer = document.querySelector('.userIdContainer');
  const pwContainer = document.querySelector('.userPwContainer');

  // margin 수정
  if(appendId == 'appendId') {
    idContainer.style.marginBottom = '10px';
  } else if(appendId == 'appendPw') {
    pwContainer.style.marginBottom = '10px';
  } else {
    element.style.marginBottom = '10px';
  }

  appendWarning(appendId, appendText); // login.js에 있는 함수 호출

  element.focus();
}

/**
 * admin 장한원
 * 유효성 검사 함수
*/
let isNickUsed; // 닉네임 중복 여부 저장

const joinFormCheck = function(step) {

  // 첫번째 스탭
  if(step == 'step1') {
    const userId = document.getElementById('userId');
    const userIdContainer = document.querySelector('.userIdContainer');
    const userPw = document.getElementById('userPw');
    const pwConfirm = document.getElementById('pwConfirm');
    const cellNum = document.getElementById('userCell');

    if(!userId.value) {
      controlStyleAndAppendWarning(userIdContainer, 'appendId', '아이디(이메일)을 입력해주세요.');

      return false;

    } else if(!userPw.value){
      controlStyleAndAppendWarning(userPw, 'appendPw', '비밀번호를 입력해주세요.');

      return false;
    
    } else if(!pwConfirm.value) {
      controlStyleAndAppendWarning(pwConfirm, 'appendPwConfirm', '비밀번호가 일치하지 않습니다.');

      return false;
    
    } if(pwConfirm.value != userPw.value) {
      controlStyleAndAppendWarning(pwConfirm, 'appendPwConfirm', '비밀번호가 일치하지 않습니다.');
      
      return false;

    } else if(!cellNum.value || cellNum.value.length <= 11) {
      controlStyleAndAppendWarning(cellNum, 'appendCell', '올바른 핸드폰번호를 입력해주세요.');

      return false;

    } else {
      return true;
    }

  // 두 번째 스탭
  } else if(step == 'step2') {
    const userName = document.getElementById('userName');
  	const userRegiNum = document.getElementById('userRegiNum');
  	const userRegiNum2 = document.getElementById('userRegiNum2');
  	const userNickname = document.getElementById('userNick');

    if(!userName.value) {
      controlStyleAndAppendWarning(userName, 'appendName', '이름을 입력해주세요.');

      return false;

    } else if(!userRegiNum.value || !userRegiNum2.value) {
      controlStyleAndAppendWarning(userRegiNum, 'appendRegiNum', '주민등록번호를 입력해주세요.');

      return false;

    } else if(!userNickname.value) {
      controlStyleAndAppendWarning(userNickname, 'appendNick', '닉네임을 입력해주세요.');

      return false;

    } else if(isNickUsed == 1) {
      
      return false;

    } else {

      return true;
    }

  }
}

/**
 * admin: 장한원
 * 각 input에 change 이벤트 부여
 */
const inputChangeHandler = function() {
  const userId = document.getElementById('userId');
  const userPw = document.getElementById('userPw');
  const pwConfirm = document.getElementById('pwConfirm');
  const userCell = document.getElementById('userCell');
  const userName = document.getElementById('userName');
  const userRegiNum = document.getElementById('userRegiNum');
  const userRegiNum2 = document.getElementById('userRegiNum2');
  const userNickname = document.getElementById('userNick');

  userId.addEventListener('change', ()=>{
    if(!checkId(userId.value)){ 
      controlStyleAndAppendWarning(userId, 'appendId', '올바른 이메일 형식을 입력해주세요.');
    } else {
      hideWarning('.userId');
    }
  });

  userPw.addEventListener('input', (e)=>{
    
    if(e.target.value.length > 14) {
      controlStyleAndAppendWarning(userPw, 'appendPw', '최대 14자까지 설정 가능합니다.');
      e.target.value = e.target.value.substring(0, 14);
    } else {
      hideWarning('.userPw');
    }
  });

  userPw.addEventListener('change', (e)=>{
    const inputValue = e.target.value;
    const isValidInput = (value) => {
      const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
      return regex.test(value);
    };

    if(inputValue.length > 1 && inputValue.length < 8) {
      controlStyleAndAppendWarning(userPw, 'appendPw', '최소 8자 이상 입력해주세요.');
    } else if (!isValidInput(inputValue)) {
      controlStyleAndAppendWarning(userPw, 'appendPw', '영문+숫자+특수문자 조합으로 입력해주세요.');
    }
  });



  pwConfirm.addEventListener('change', ()=>{
    if(userPw.value != pwConfirm.value) {
      controlStyleAndAppendWarning(pwConfirm, 'appendPwConfirm', '비밀번호가 일치하지 않습니다.');
    } else {
      hideWarning('.pwConfirm');
    }
  });

  // 핸드폰번호 - 숫자만 입력되게 + 자동 하이픈
  userCell.addEventListener('input', (e)=>{
    e.target.value = e.target.value
      .replace(/[^0-9]/g, '')
      .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/(\-{1,2})$/g, "");
  });

  userCell.addEventListener('change', ()=>{
    if(userCell.value) {
      if(userCell.value.length <= 11) {
        controlStyleAndAppendWarning(userCell, 'appendCell', '올바른 핸드폰번호를 입력해주세요.');
      } else {
        hideWarning('.userCell');
      }
    }
  });

  userName.addEventListener('change', ()=>{
    if(userName.value) {
      hideWarning('.userName');
    }
  });

  userName.addEventListener('input', (e)=>{
    const inputValue = e.target.value;
    const isValidInput = (value) => {
      const regex = /^[ㄱ-ㅎ가-힣a-zA-Z]+$/;
      return regex.test(value);
    };
  
    if (!isValidInput(inputValue)) {
        controlStyleAndAppendWarning(userName, 'appendName', '한글/영어만 입력할 수 있습니다.');
        e.target.value = e.target.value
          .replace(/[^ㄱ-ㅎ가-힣a-zA-Z]+$/g, '');
    }

  });

  userRegiNum.addEventListener('change', ()=>{
    if(userRegiNum.value) {
      hideWarning('.userRegiNum');
    }
  });

  userRegiNum.addEventListener('input', (e)=>{
    e.target.value = e.target.value
      .replace(/[^0-9]+$/g, '');
  });

  userRegiNum2.addEventListener('change', ()=>{
    if(userRegiNum.value) {
      hideWarning('.userRegiNum');
    }
  });

  userRegiNum2.addEventListener('input', (e)=>{
    e.target.value = e.target.value
      .replace(/[^0-9]+$/g, '');
  })

  userNickname.addEventListener('change', ()=>{
    if(userNickname.value) {

      // 닉네임 중복 검사
      fetch("/gather/checknickDo.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          USER_NICK: userNickname.value,
        }),
      })
      .then(response => response.json())
      .then((data) => {

        const result = JSON.stringify(data.RESULT);

        if(result == 1) {
          isNickUsed = result;
          controlStyleAndAppendWarning(userNickname, 'appendNick', '이미 사용중인 닉네임입니다.');

        } else if(result == 0) {
          isNickUsed = result;
          hideWarning('.userNick');
        }

      })
      .catch(error => {
        console.error('데이터를 받아오는 중 오류 발생:', error);
      });
    
    }
  });

  // 경고문구 숨김처리
  const hideWarning = function(className) {
    const appendNode = document.querySelector(className);
    appendNode.style.display = 'none';
  }
}

/* 
 * admin: 장한원
 * [이전] 버튼 클릭시 동작
*/
const prevSection = function(step) {
  const loginForm = document.getElementById('loginForm');
  const signupContainer = document.getElementById('signupContainer');
  const signupStep2 = document.getElementById('signupStep2');
  const signupStep3 = document.getElementById('signupStep3');
  const signupStep4 = document.getElementById('signupStep4');

  if(step == 'step1') {
    signupContainer.classList.remove('_act');
    loginForm.classList.add('_act');

  } else if(step == 'step2') {
    signupStep2.classList.remove('_act');
    signupContainer.classList.add('_act');

  } else if(step == 'step3') {
    signupStep3.classList.remove('_act');
    signupStep2.classList.add('_act');

  } else if(step == 'step4') {
    signupStep4.classList.remove('_act');
    signupStep3.classList.add('_act');

    removeCreatedElements();
  }
}

/* 
 * admin: 장한원
 * [다음(확인)] 버튼 클릭시 동작
*/
const nextSection = function(step) {
  const signupContainer = document.getElementById('signupContainer');
  const signupStep2 = document.getElementById('signupStep2');
  const signupStep3 = document.getElementById('signupStep3');
  const signupStep4 = document.getElementById('signupStep4');

  if (step == 'step1') {
    if (joinFormCheck('step1')) {

      showStep(signupStep2);

      const appendList = document.querySelectorAll('.append');
      const needMarginList = document.querySelectorAll('.step1');
      
      appendList.forEach(element => {
        element.style.display = 'none';
      });
      
      needMarginList.forEach(item => {
        item.style.marginBottom = '20px';
      });

    }
  } else if (step == 'step2') {
    if (joinFormCheck('step2')) {
      showStep(signupStep3);
    }
  } else if (step == 'step3') {
    showStep(signupStep4);
    if(pickedRegiListForStep4){
      showUserPickedRegi(pickedRegiListForStep4, regiList);
    }
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
 * 유저가 선택한 선호 지역을 보여주는 함수
 */
const showUserPickedRegi = function(pickedList, regiList) {

  let parentNameList = [];

  // 사용자의 선호지역 데이터 가공
  pickedList.forEach(item => {
    regiList.forEach(data => {
      if(data.REGI_CODE == item.parentCode) {
        parentNameList.push({
            'parentName' : data.REGI_NAME
          , 'parentCode' : item.parentCode
          , 'regiName' : item.regiName
        });
      }
    });
  });

  let previousValue;

  // 부모 지역 생성
  parentNameList.forEach((current, index)=> {
    if (index === 0) {
      previousValue = current.parentCode; // 이전값 현재 값으로 초기화

      createParent(current);

      return;
    }

    // 현재 parentCode가 이전 parentCode와 같을 땐 요소 생성X
    if (current.parentCode === previousValue) {
      return;
    }

    createParent(current);

    previousValue = current.parentCode; // 이전값 현재 값으로 초기화

  });

  // 자식 지역 생성
  pickedList.forEach(current => {
    const regiName = current.regiName;
    
    const regiItemTag = document.createElement('li');
    regiItemTag.innerHTML = regiName;
    regiItemTag.className = 'pickedChildRegiitem';
    
    const targetParent = document.querySelector(`ul[data-step4-child="${current.parentCode}"]`);

    targetParent.appendChild(regiItemTag);
  });
}

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

function removeCreatedElements() {
  const parentRegiItems = document.querySelectorAll('.parentRegiItem');
  parentRegiItems.forEach(item => {
      item.parentNode.removeChild(item);
  });
}