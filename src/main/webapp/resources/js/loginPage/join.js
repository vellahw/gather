/**
 * 240204 장한원
 * 회원가입 기능
 */
function btnOnclick() {
  const step1Btn = document.getElementById('next');
  const step2Btn = document.getElementById('next2');
  const step3Btn = document.getElementById('next3');
  const submitBtn = document.getElementById('submit');
  let firstArr = [];
  let data;

  step1Btn.addEventListener('click', ()=>{
    const userId = document.getElementById('userId').value;
    const userPw = document.getElementById('userPw').value;
    const userCellNum = document.getElementById('userCell').value;
    
    firstArr.push({
      USER_IDXX : userId
      , PASS_WORD : userPw
      , CELL_NUMB : userCellNum
    });
  });
  
  step2Btn.addEventListener('click', ()=>{
    const userName = document.getElementById('userName').value;
    const userRegi1 = document.getElementById('user-regi').value;
    const userRegi2 = document.getElementById('user-regi2').value;
    const userRegiNum = userRegi1 + userRegi2;
    const userNickname = document.getElementById('user-nick').value;
    const userSelfIntro = document.getElementById('user-self').value;
    const nicknameNode = document.querySelector('.nickname');
    const selfIntroNode = document.querySelector('.selfIntro');

    const secondArr = [{
        USER_NAME : userName
    	,	REGI_NUMB : userRegiNum
    	, USER_NICK : userNickname
    	, SELF_INTR : userSelfIntro
    }];

    
    nicknameNode.innerHTML = userNickname;
    selfIntroNode.innerHTML = userSelfIntro;
    data = Object.assign({}, firstArr[0], secondArr[0]);

    console.log(data)
  });
  
  // 마지막 확인 버튼
  submitBtn.addEventListener('click' , ()=>{

    fetch("/gather/joinDo.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: data,
        regi: regiCheckArr
      }),
    })
    .then(() => {
      comAlert2(5
        ,"회원가입 완료!"
        , data.USER_NICK + "님 가입을 환영합니다!"
        , "로그인 하러 가기"
        , function(){
          location.href = "/gather/login.com"
        });
    });
  });

}


/**
 * 240207 장한원
 * 선호 지역 데이터 관리
 */
function controlRegiData() {

  // fetch("/gether/gatRegi.com", {
  //   method: 'POST', // 요청 메서드 설정
  //   headers: {
  //     'Content-Type': 'application/json' // 요청 헤더 설정
  //   },
  //   body: JSON.stringify({}) // 요청 바디에 데이터 포함
  // })
  // .then(response => response.json())
  // .then(data => {
  //   // 서버에서 받아온 JSON 데이터를 사용
  //   console.log(data);
  //   // 받아온 데이터를 활용하여 추가적인 처리 수행
  // })
  // .catch(error => {
  //   console.error('데이터를 받아오는 중 오류 발생:', error);
  // });

  const regiData = document.getElementById('regi').value;
  const cleanedData = regiData.replace(/[[\]\ ]/g, '');
  const splitData = cleanedData.split("},{");
  const regiList = []; // 선호지역 데이터 list

  splitData.forEach(item => {
      // 중괄호 제거 후, 쉼표로 데이터 분리
      const keyValuePairs = item.replace("{", "").replace("}", "").split(",");
      const map = {};

      keyValuePairs.forEach(pair => {
          // 등호를 기준으로 키와 값을 나누어 맵에 추가
          const [key, value] = pair.split("=");
          map[key] = value;
      });

      regiList.push(map);
  });

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

  showChildRegi(newParentCodeList);

}


/* 부모 지역 노드 생성 및 자식 지역 노드 생성 함수 */
function createNode(item) {
  // 부모 지역 노드 생성
  const parentRegiNode = document.createElement('div');
  parentRegiNode.className = 'R_1';
  parentRegiNode.innerHTML = item.REGI_NAME;
  parentRegiNode.dataset.code = item.PARENTS_CODE;

  document.querySelector('.level1').appendChild(parentRegiNode); // 추가

  //자식 노드 생성 (checkbox들을 담을 div)
  const childRegiNode = document.createElement('div');
  childRegiNode.className = 'level2';
  childRegiNode.dataset.pcode = item.PARENTS_CODE;

  document.querySelector('.level1').appendChild(childRegiNode);
}


/* 자식 지역 체크박스 생성 함수 */
function createChildRegi(item, pcode) {
  if(item.PARENTS_CODE == pcode) {
    const childRegi = document.createElement('input');
    childRegi.type = 'checkbox';
    childRegi.className = 'child';
    childRegi.dataset.regiCode = item.REGI_CODE;

    /* 지역 선택시 동작 함수 */
    let regiCheckArr = [];

    // onchange 이벤트를 감지하여 처리하는 함수 정의
    const handleChange = function(event) {
      console.log(event.target)
      const target = event.target;
      const regiCode = target.getAttribute('data-regi-code');

      regiCheckArr.push({ 'REGI_CODE': regiCode });

    };

    childRegi.addEventListener('change', handleChange);

    const childRegilabel = document.createElement('label');
    childRegilabel.className = 'childlabel';
    childRegilabel.innerHTML = item.REGI_NAME;
    
    const targetElement = document.querySelector(`div[data-pcode="${pcode}"]`);
    targetElement.appendChild(childRegi);
    targetElement.appendChild(childRegilabel);
  }
}

/* 자식 지역 이벤트 리스너 */
function showChildRegi(parentCodeList) {
 
  parentCodeList.forEach((pcode, i) => {

    const targetElement = document.querySelector(`div[data-code="${pcode}"]`);
    
    targetElement.addEventListener('mouseover', (e)=>{
      const childElement = e.target.nextElementSibling;
      childElement.style.display = 'flex';
    });

    targetElement.addEventListener('mouseleave', (e)=>{
      const childElement = e.target.nextElementSibling;
      childElement.style.display = 'none';
    });

  });

}

let regiCheckArr = [];
function checkRegi(regi) {

  const regiCode = regi.getAttribute('data-regi-code');
  const isChecked = regi.checked;

  if (isChecked) {

    regiCheckArr.push({ 'REGI_CODE': regiCode });

  } else {

    for (let i = 0; i < regiCheckArr.length; i++) {
      if (regiCheckArr[i]['REGI_CODE'] === regiCode) {
        regiCheckArr.splice(i, 1);
        break;
      }
    }
  }
}

console.log(regiCheckArr)