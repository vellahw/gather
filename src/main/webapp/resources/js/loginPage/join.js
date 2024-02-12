/**
 * 240204 장한원
 * 회원가입 기능
 */
const btnOnclick = function() {
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
    const userRegi1 = document.getElementById('userRegiNum').value;
    const userRegi2 = document.getElementById('userRegiNum2').value;
    const userRegiNum = userRegi1 + userRegi2;
    const userNickname = document.getElementById('userNick').value;
    const userSelfIntro = document.getElementById('userSelf').value;
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
  });

/**
 * 240212 KSH
 * 이메일 인증
 */
$(".authmailBtn").click(function(){

  comAlert2(2,"이메일이 발송되었습니다.", null);
    
  let email = $("#userId").val();        // 입력한 이메일
  
  comAjax(
      "GET"
    , "/gather/mailCheck?email=" + email
    , null
    , null
    , function(data){
            
      console.log("data : " + data);

    }
  );
  
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
        regi: pickedRegiCode
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
 * 선호 지역 데이터 처리
 * login.js에서 호출함
 */
const regiList = []; // 지역 데이터 list

const controlRegiData = function() {

  const regiData = document.getElementById('regi').value;
  const cleanedData = regiData.replace(/[[\]\ ]/g, '');
  const splitData = cleanedData.split("},{");

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

/** 
  * 자식 지역을 선택했을 때의 동작 함수 
  * 배열에 선택한 자식지역을 담음
*/
let pickedRegiCode = []; // 서버 통신을 위한 REGI_CODE 데이터
let pickedRegiListForStep4 = []; // step4 폼을 위한 리스트

/* 클릭 이벤트 콜백 함수 */
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

/*
 * 자식 지역 클릭 시 class toggle
*/
const showChildRegi = function(parentCodeList) {
 
  parentCodeList.forEach((pcode, i) => {

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
  
}