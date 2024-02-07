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

  
  regiList.forEach(item => {
    const regiCode = item.REGI_CODE;

    // 부모 지역에 대한 로직
    if(regiCode.length == 1) {
      createNode(item);

    // 자식 지역에 대한 로직
    } else if(regiCode.length > 1) {
      createChildRegi(item, item.PARENTS_CODE);
    }
  });
}


/* 부모 지역 노드 생성 및 자식 지역 노드 생성 함수 */
function createNode(item) {
  // 부모 지역 노드 생성
  const parentRegiNode = document.createElement('div');
  parentRegiNode.className = 'R_1';
  parentRegiNode.innerHTML = item.REGI_NAME;

  document.querySelector('.level1').appendChild(parentRegiNode); // 추가

  // 자식 노드 생성 (checkbox들을 담을 div)
  const childRegiNode = document.createElement('div');
  childRegiNode.className = 'level2';
  childRegiNode.dataset.pcode = item.PARENTS_CODE;

  parentRegiNode.appendChild(childRegiNode); // 추가
}


/* 자식 지역 체크박스 생성 함수 */
function createChildRegi(item, pcode) {
  if(item.PARENTS_CODE == pcode) {
    const childRegilabel = document.createElement('label');
    childRegilabel.className = 'childlabel';
    childRegilabel.innerHTML = item.REGI_NAME;

    const childRegi = document.createElement('input');
    childRegi.type = 'checkbox';
    childRegi.className = 'child';

    const targetElement = document.querySelector(`div[data-pcode=${pcode}]`)
    
    targetElement.appendChild(childRegilabel);
    targetElement.appendChild(childRegi);
  }
}

function showChildRegi() {
  const level1 = document.querySelectorAll('.R_1');
  
  level1.forEach((parent, i) => {

    let pCode = parent.getAttribute('data-code')

    parent.addEventListener('mouseover', ()=> {
        let childRegi = document.querySelectorAll(`div[data-pcode="${pCode}"]`);
        const level2Container = document.querySelector('.level2');

        childRegi.forEach(child => {
          child.style.display = 'flex';
        });
    });
  
    parent.addEventListener('mouseleave', (e)=> {
      let childRegi = document.querySelectorAll(`div[data-pcode="${pCode}"]`);
      childRegi.forEach(child => {
        child.style.display = 'none';
      });
    });

    // let childRegi = document.querySelectorAll(`div[data-pcode="${pCode}"]`);
    
    // for (let i = 0; i < childRegi.length; i++) {
    //   childRegi[i].style.display = 'flex !important';
    // }
  });
}