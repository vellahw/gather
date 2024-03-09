/**
 * 회원가입 '기능'을 담당
 */
document.addEventListener('DOMContentLoaded', function () {

  let pickedRegiCode = []; // 서버 통신을 위한 REGI_CODE 데이터
  let pickedRegiListForStep4 = []; // step4 폼을 위한 리스트

  let userGender; // 유저 성별 정보

  const step1Btn = document.getElementById('next');
  const step2Btn = document.getElementById('next2');
  const step3Btn = document.getElementById('next3');
  const submitBtn = document.getElementById('submit');
  const authmailBtn = document.querySelector('.authmail'); // '이메일 인증' 버튼

  let firstUserData;
  let secondUserData;
  let joinUserData;

  /**
   * 240212 KSH 장한원
   * step1
   * 이메일 인증
  */
  authmailBtn.addEventListener('click' , ()=>{
    const userId = document.getElementById('userId');

    if(!checkId(userId.value)){ 
      controlStyleAndAppendWarning(userId, 'appendId', '올바른 이메일 형식을 입력해주세요.');
      
      return false;

    } else {
      hideWarning('.userId');
    }

    // 아이디(이메일) 중복 검사
    fetch("/gather/checkidDo.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        USER_IDXX: userId.value,
      }),
    })
    .then(response => response.json())
    .then((data) => {

      const result = JSON.stringify(data.RESULT);

      if(result == 1) {

        controlStyleAndAppendWarning(userId, 'appendId', '이미 사용중인 아이디(이메일)입니다.');

      } else if(result == 0) {

        hideWarning('.userId');

        let email = $("#userId").val(); // 입력한 이메일
        
        comAjax(
            "GET"
          , "/gather/mailCheck?email=" + email
          , null
          , null
          , function(data){
          
            console.log('인증번호: '+ data);

            if(data != 'fail') {
              comAlert3("이메일이 발송되었습니다.", null, "success", function(){ document.getElementById('authnum').focus(); });

              // 인증번호 입력하는 input
              const authmailContainer = document.querySelector('.authmailContainer');
              authmailContainer.style.display = 'block';

              authmailBtn.textContent = '재전송'

              startTimer(); // 타이머 시작

              const authnumSubmitBtn = document.querySelector('button.authmailSubmit'); // 인증 확인 버튼

              // '확인' 버튼 클릭 이벤트
              authnumSubmitBtn.addEventListener('click', ()=>{

                const authNum = document.getElementById('authnum');
  
                // 인증번호 불일치
                if(authNum.value != data) {
                  // 경고문 띄움
                  controlStyleAndAppendWarning(authNum, 'appendAuthnum', '인증번호가 틀립니다. 다시 확인해주세요.');
                
                // 인증번호 일치
                } else {
                  comAlert3(
                    '인증 완료되었습니다'
                  , null
                  , 'success'
                  , function(){
                      document.getElementById('userPw').focus();
                      document.querySelector('.authmailContainer').style.display = 'none'; // 인증번호 컨테이너 숨김
                      hideWarning('.appendAuthnum'); // 경고문 숨김
                      clearInterval(countdownInterval);
                    }
                  );

                  isAuth = 'Y'; // 인증 유무 저장
                }

              });
            
            } else if(data == 'fail'){

              controlStyleAndAppendWarning(userId, 'appendId', '이메일을 다시 확인해주세요.');
            }
          }
        );
      }

    })
    .catch(error => {
      console.error('데이터를 받아오는 중 오류 발생:', error);
    });
  });


  /* 부모 지역 노드 생성 및 자식 지역 노드 생성 함수 */
  const createNode = function(item) {
    // 부모 지역 담을 태그
    const parentRegiNode = document.createElement('li');
    parentRegiNode.className = 'regionList';
    
    // 부모 지역 노드
    const parentRegiWrap = document.createElement('span');
    parentRegiWrap.className = 'parentWrap'
    parentRegiWrap.dataset.code = item.PARENTS_CODE;

    const parentRegiNameNode = document.createElement('span');
    parentRegiNameNode.className = 'parent';
    parentRegiNameNode.innerHTML = item.REGI_NAME;
    parentRegiNameNode.dataset.rcode = item.PARENTS_CODE;

    parentRegiWrap.appendChild(parentRegiNameNode)
    parentRegiNode.appendChild(parentRegiWrap);

    //자식 노드 생성 (checkbox들을 담을 div)
    const childRegiNode = document.createElement('ul');
    childRegiNode.className = 'level2';
    childRegiNode.dataset.pcode = item.PARENTS_CODE;
    
    document.querySelector('.level1').appendChild(parentRegiNode); 
    parentRegiNode.appendChild(childRegiNode);
  }

  /* 자식 지역 버튼 생성 함수 */
  const createChildRegi = function(item, pcode) {
    if(item.PARENTS_CODE == pcode) {
      const container = document.createElement('li');

      const childRegi = document.createElement('button');
      childRegi.type = 'button';
      childRegi.className = 'child';
      childRegi.textContent = item.REGI_NAME;
      childRegi.dataset.regiCode = item.REGI_CODE;

      childRegi.addEventListener('click', handleChange);
      container.appendChild(childRegi)
      
      const targetElement = document.querySelector(`ul[data-pcode="${pcode}"]`);
      targetElement.appendChild(container);
    }
  }

  /* 자식 지역 버튼 클릭 이벤트 콜백 함수 */
  const handleChange = function(event) {
    event.stopPropagation();

    const target = event.target;
    target.classList.toggle('clicked');

    const regiCode = target.getAttribute('data-regi-code');
    const classList = target.classList;
    
    if(classList.contains('clicked')) {
      
      pickedRegiCode.push({ 'REGI_CODE': regiCode });

      pickedRegiListForStep4.push({ 
          'regiName': target.innerText
        , 'parentCode': regiCode.substring(0,1)
        , 'regiCode' : regiCode 
      });

    } else { // 클릭 해제한 데이터 배열에서 삭제

      // pickedRegiCode[]
      for (let i = 0; i < pickedRegiCode.length; i++) {
        if (pickedRegiCode[i]['REGI_CODE'] === regiCode) {
          pickedRegiCode.splice(i, 1);
          
          break;
        }
      }

      // pickedRegiListForStep4[]
      for (let i = 0; i < pickedRegiListForStep4.length; i++) {

        if (pickedRegiListForStep4[i]['regiName'] === target.innerText) {
          pickedRegiListForStep4.splice(i, 1);
          
          break;

        } else if (pickedRegiListForStep4[i]['parentCode'] === regiCode.substring(0,1)) {
          pickedRegiListForStep4.splice(i, 1);
          
          break;
        }
      }
    }
  };


  /**
   * 240207 장한원
   * 선호 지역 데이터 처리
  */
  const regiData = document.getElementById('regi').value;
  const regiList = comObjectInArray(regiData).result
  let parentCodeList = [];

  regiList.forEach(item => {
    parentCodeList.push(item.PARENTS_CODE);
    const regiCode = item.REGI_CODE;

    // 부모 지역에 대한 로직
    if(regiCode.length == 1) {
      createNode(item);

    // 자식 지역에 대한 로직
    } else if(regiCode.length > 1) {
      createChildRegi(item, item.PARENTS_CODE);
    }
  });

  let newParentCodeList = [...new Set(parentCodeList)];

  
  /*
  * 자식 지역 클릭 시 class toggle
  */

    newParentCodeList.forEach((pcode, i) => {

      const targetElement = document.querySelector(`span[data-code="${pcode}"]`);
    
      targetElement.addEventListener('click', (event)=>{

        event.stopPropagation();

        const parentNameElement = document.querySelector(`span[data-rcode="${pcode}"]`);
        const childElement = document.querySelector(`ul[data-pcode="${pcode}"]`);

        targetElement.classList.toggle('parentWrap_active');
        parentNameElement.classList.toggle('parent_active');
        childElement.classList.toggle('level2_active');

      });
    });


  let formData = new FormData(); // 서버로 전송할 폼 객체 생성
  let profile; // 업로드한 프로필 사진 값
  let bgImg; // 업로드한 배경 사진 값
  let imgValue; // FILE_SVNM 담을 값

  /**
   * 240216 장한원
   * 프로필 사진 수정 버튼(기본 프사 팝업 열림)
   */
  const profileUpdateBtn = document.getElementById('p-updateBtn');
  profileUpdateBtn.addEventListener('click', ()=>{
    document.querySelector('.profileImgContainer').classList.toggle('p_visible');
    document.querySelector('.user').classList.toggle('_pointer-none');

    // '프로필 사진 삭제' 클릭
    const resetBtn = document.getElementById('reset');
    resetBtn.addEventListener('click', ()=>{

      // 프로필 사진 관련 데이터 비움
      profile = '';
      imgValue = '';

      const profileImgPreview = document.querySelector('.preview');

      if(userGender == 'W') {
        profileImgPreview.src = '/resources/img/basic/profile/basic-w.png'
      } else if(userGender == 'M') {
        profileImgPreview.src = '/resources/img/basic/profile/basic-m.png'
      }

    });
  });


  /**
   * 240214 장한원
   * 기본 프로필 사진 선택 시 동작
   */
  const profileImgList = document.querySelector('.profileImgList');
  profileImgList.addEventListener('click', (event)=>{
    if(event.target.matches('[data-value]')){
      const target = event.target;
      const tagetData = target.getAttribute('data-value');

      document.querySelector('.preview').src = `/resources/img/basic/profile/${tagetData}.png`;

      imgValue = { FILE_SVNM : `${tagetData}.png` };

      // 프로필 사진 관련 데이터 비움
      profile = '';
    }
  });

  /**
   * 240214 장한원
   * 프로필 파일 직접 업로드 시 동작
   */
  
  const chooseImgInput = document.getElementById('chooseImg');
  const choosebg =  document.getElementById('choosebg');
  const bgPreview = document.querySelector('.bg-preview');

  /* 프로필 사진 업로드 */
  chooseImgInput.addEventListener('change', (e)=>{

    if (e.target.files.length === 0) {
      return;
    } else {
      const reader = new FileReader();
      reader.onload = ({ target }) => {
        document.querySelector('.preview').src = target.result;
      };

      // 업로드 했으면 팝업 닫음
      document.querySelector('.profileImgContainer').classList.toggle('p_visible');
      
      reader.readAsDataURL(chooseImgInput.files[0]);
      
      profile = chooseImgInput.files[0];

    }

  });

  /**
   * 240226 강승현
   * 프로필 파일 위치 조정
   */
  //   document.querySelector('#profileImg').addEventListener('mouseover', function() {
      
  //     document.addEventListener('keydown', function(event) {
  //       console.log(event)
        
  //       var image = document.querySelector('#profileImg');
  //       var currentPositionX = parseFloat(image.style.objectPositionX) || 0;
  //       var currentPositionY = parseFloat(image.style.objectPositionY) || 0;
  //       console.log("가로: "+ currentPositionX + "세로 :" + currentPositionY)
  //       var step = 1;
    
  //       switch(event.key) {
  //           case 'ArrowUp':
  //               image.style.objectPositionY = `calc(${currentPositionY + step})px`;
  //               break;
  //           case 'ArrowDown':
  //               image.style.objectPositionY = `calc(${currentPositionY - step})px`;
  //               break;
  //           case 'ArrowLeft':
  //               image.style.objectPositionX = `calc(${currentPositionX - step})px`;
  //               break;
  //           case 'ArrowRight':
  //               image.style.objectPositionX = `calc(${currentPositionX + step})px`;;
  //               break;
  //       }
  //   });
  // });

  // 배경 사진 삭제(되돌리기) 버튼
  const removeBgImgBtn =  document.getElementById('bg-remove');

  /* 배경 사진 업로드 */
  choosebg.addEventListener('change', (e)=>{ 

    if (e.target.files.length === 0) {
      return;
    } else {
      bgPreview.classList.remove('none-bg');
      bgPreview.classList.add('show-bg');

      const reader = new FileReader();
      reader.onload = ({ target }) => {
        bgPreview.src = target.result;
      };

      reader.readAsDataURL(choosebg.files[0]);
    
      bgImg = choosebg.files[0];

      if(bgPreview.classList.contains('show-bg')) {
        removeBgImgBtn.classList.add('show_flex_element');
      }
    }
  });
  
  /* 배경 사진 삭제(되돌리기) */
  removeBgImgBtn.addEventListener('click', ()=>{
    bgPreview.removeAttribute('src');
    bgPreview.removeAttribute('alt');
    bgPreview.classList.remove('show-bg');
    bgPreview.classList.add('none-bg');
  });


  /**
   * admin: 장한원
   * step1 -> step2로 가는 '다음' 버튼
  */
  step1Btn.addEventListener('click', ()=>{
    const userId = document.getElementById('userId').value;
    const userPw = document.getElementById('userPw').value;
    const userCellNum = document.getElementById('userCell').value;
    
    firstUserData ={
        USER_IDXX : userId
      , PASS_WORD : userPw
      , CELL_NUMB : userCellNum
    };
  });
  

  /**
   * admin: 장한원
   * step2 -> step3로 가는 '다음' 버튼
  */
  step2Btn.addEventListener('click', ()=>{
    const userName = document.getElementById('userName').value;
    const userRegi1 = document.getElementById('userRegiNum').value;
    const userRegi2 = document.getElementById('userRegiNum2').value;
    const userRegiNum = userRegi1 + userRegi2;
    const userNickname = document.getElementById('userNick').value;
    const userIdValue = document.getElementById('userId').value;
    const userSelfIntro = document.getElementById('userSelf').value;
    const nicknameNode = document.querySelector('.nickname');
    const idNode = document.querySelector('.id');
    const selfIntroNode = document.querySelector('.selfIntro');

    secondUserData = {
        USER_NAME : userName
       ,   REGI_NUMB : userRegiNum
       , USER_NICK : userNickname
       , SELF_INTR : userSelfIntro
    };

    nicknameNode.innerHTML = userNickname;
    selfIntroNode.innerHTML = userSelfIntro;
    idNode.innerHTML = `${userIdValue}`;

    /* 유저의 성별에 따른 기본 프로필 사진 설정 */
    if(userRegi2%2 == 0) {
      userGender = 'W';
    } else if(userRegi2%2 == 1) {
      userGender = 'M';
    }

    const profileImgPreview = document.querySelector('.preview');

    if(userGender == 'W') {
      profileImgPreview.src = '/resources/img/basic/profile/basic-w.png'
      profileImgPreview.dataset.gender = 'W'
    } else if(userGender == 'M') {
      profileImgPreview.src = '/resources/img/basic/profile/basic-m.png'
      profileImgPreview.dataset.gender = 'M'
    }

  });


  /**
   * admin: 장한원
   * step3 -> step4로 가는 '다음' 버튼
  */
  step3Btn.addEventListener('click', ()=>{
    if(pickedRegiListForStep4){
      showUserPickedRegi(pickedRegiListForStep4, regiList);
    }
  });

  /**
   * 240211
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

  
  /*
   * admin: 장한원
   * step4
   * 마지막 확인 버튼
  */
  submitBtn.addEventListener('click' , ()=>{

    // 아무런 프사도 선택하지 않았을 때
    console.log("프로필:"+ profile);

    if(!profile && !imgValue){
      if(userGender == 'W') {
        imgValue = { 'FILE_SVNM' : 'basic-w.png' };
      } else if(userGender == 'M') {
        imgValue = { 'FILE_SVNM' : 'basic-m.png' };
      }

      joinUserData = Object.assign({}, firstUserData, secondUserData, imgValue); // 유저가 입력한 폼 데이터 가공

    }
    
    // 기본 제공하는 프사 선택
    if(imgValue) {
      joinUserData = Object.assign({}, firstUserData, secondUserData, imgValue); // 유저가 입력한 폼 데이터 가공
    }
    
    // 프사 직접 업로드
    if(profile) {
      joinUserData = Object.assign({}, firstUserData, secondUserData); // 유저가 입력한 폼 데이터 가공
      formData.append('file', profile); // 프로필 사진
      
    }

    if(bgImg) {
      formData.append('wallPaper', bgImg); // 배경사진
    }

    formData.append('data', JSON.stringify(joinUserData)); // 유저가 입력한 폼 값
    formData.append('regi', JSON.stringify(pickedRegiCode)); // 유저가 선택한 선호 지역값

    fetch("/gather/joinDo.com", {
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
        comAlert2(5
          ,"회원가입 완료!"
          , joinUserData.USER_NICK + "님 가입을 환영합니다!"
          , "로그인 하러 가기"
          , function(){
            location.href = "/gather/login.com"
          });
      } else {
        console.log("오류 발생 data: ", data)
      }
    })
    .catch(error => {
      console.error('네트워크 에러 발생:', error);
    });
  });

}); // END DOMContentLoaded




/**
 * admin 장한원
 * 유효성 검사 함수
*/
let isNickUsed; // 닉네임 중복 여부 저장
let isAuth = 'N';

const joinFormCheck = function(step) {

  // 첫번째 스탭
  if(step == 'step1') {
    const userId = document.getElementById('userId');
    const userIdContainer = document.querySelector('.userIdContainer');
    const authnum = document.getElementById('authnum');
    const userPw = document.getElementById('userPw');
    const pwConfirm = document.getElementById('pwConfirm');
    const cellNum = document.getElementById('userCell');

    if(!userId.value) {
      controlStyleAndAppendWarning(userId, 'appendId', '아이디(이메일)을 입력해주세요.');

      return false;
 
    } else if(!checkId(userId.value)){ 
      controlStyleAndAppendWarning(userId, 'appendId', '올바른 이메일 형식을 입력해주세요.');
        
      return false;

    } else if(isAuth == 'N') {
      comAlert3(
        '이메일을 인증해주세요'
      , null
      , 'warning'
      , function(){
          document.getElementById('userId').focus();
        }
      );

      return false;

    } else if(!authnum.value){
      controlStyleAndAppendWarning(authnum, 'appendAuthnum', '인증번호를 입력해주세요.');
      document.getElementById('authnum').focus();

      return false;

    } else if(!userPw.value){
      controlStyleAndAppendWarning(userPw, 'appendPw', '비밀번호를 입력해주세요.');

      return false;
    
    } else if(userPw.value) {

      const isValidInput = (value) => {
        const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
        return regex.test(value);
      };

      if(userPw.value.length < 8) {
        controlStyleAndAppendWarning(userPw, 'appendPw', '최소 8자 이상 입력해주세요.');
        return false;
      }
      
      if (!isValidInput(userPw.value)) {
        controlStyleAndAppendWarning(userPw, 'appendPw', '영문+숫자+특수문자 조합으로 입력해주세요.');
        return false;
      }

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
  const authnum = document.getElementById('authnum');
  const userPw = document.getElementById('userPw');
  const pwConfirm = document.getElementById('pwConfirm');
  const userCell = document.getElementById('userCell');
  const userName = document.getElementById('userName');
  const userRegiNum = document.getElementById('userRegiNum');
  const userRegiNum2 = document.getElementById('userRegiNum2');
  const userNickname = document.getElementById('userNick');

  // 엔터 누르면 버튼 클릭
  userId.addEventListener('keyup', enterKeyupEvent);
  authnum.addEventListener('keyup', enterKeyupEvent);

  // 캡스락 툴팁 띄움
  userPw.addEventListener('keyup', showCapslockTooltip);
  pwConfirm.addEventListener('keyup', showCapslockTooltip);

  userId.addEventListener('change', ()=>{
    if(!checkId(userId.value)){ 
      controlStyleAndAppendWarning(userId, 'appendId', '올바른 이메일 형식을 입력해주세요.');
      
      return false;

    } else {
      hideWarning('.userId');
    }
  })

  userPw.addEventListener('input', (event)=>{
    if(event.target.value.length == 14) {
      controlStyleAndAppendWarning(userPw, 'appendPw', '최대 14자까지 설정 가능합니다.');
      event.target.value = event.target.value.substring(0, 14);
    } else {
      hideWarning('.userPw');
    }
  });

  userPw.addEventListener('change', (event)=>{
    const inputValue = event.target.value;
    const isValidInput = (value) => {
      const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
      return regex.test(value);
    };

    if(inputValue) {
      if(inputValue.length < 8) {
        controlStyleAndAppendWarning(userPw, 'appendPw', '최소 8자 이상 입력해주세요.');
      } else {
        hideWarning('.userPw');
      }
      
      if (!isValidInput(inputValue)) {
        controlStyleAndAppendWarning(userPw, 'appendPw', '영문+숫자+특수문자 조합으로 입력해주세요.');
      } else {
        hideWarning('.userPw');
      }
    }
  });

  pwConfirm.addEventListener('change', (event)=>{
    if(userPw.value != event.target.value) {
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

    if(e.target.value.length == 6) {
      userRegiNum2.focus();
    }
  });

  userRegiNum2.addEventListener('change', ()=>{
    if(userRegiNum.value) {
      hideWarning('.userRegiNum');
    }
  });

  userRegiNum2.addEventListener('input', (e)=>{
    e.target.value = e.target.value
      .replace(/[^0-9]+$/g, '');

    if(e.target.value.length == 1) {
      userNickname.focus();
    }
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

          if(userNickname.value.length == 10) {
            document.getElementById('userSelf').focus();
          }
        }
      })
      .catch(error => {
        console.error('데이터를 받아오는 중 오류 발생:', error);
      });
    }
  });
}


/**
 * admin: 장한원
 * 엔터키 감지 이벤트
 */
const enterKeyupEvent = function(event) {
  const clickTargetSelector = event.target.dataset.clickTarget;

  if(event.code === 'NumpadEnter' || event.code === 'Enter') {
    event.preventDefault();
    document.querySelector(clickTargetSelector).click();
  }
}


/**
 * 240217: 장한원
 * 캡스락 감지 이벤트
 */
const showCapslockTooltip = function(event) {
  const tooltip = document.querySelector('.capslock');
  
  if (event.getModifierState("CapsLock")) {
    tooltip.classList.add('show_hidden_element');
  } else {
    tooltip.classList.remove('show_hidden_element');
  }
}