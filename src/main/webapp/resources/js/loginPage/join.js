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

// function showChildRegi() {
//   const level1 = document.querySelectorAll('.R_1');
  
//   level1.forEach((parent, i) => {

//     let pCode = parent.getAttribute('data-code')

//     parent.addEventListener('mouseover', ()=> {
//         let childRegi = document.querySelectorAll(`div[data-pcode="${pCode}"]`);
//         const level2Container = document.querySelector('.level2');

//         childRegi.forEach(child => {
//           child.style.display = 'flex';
//         });
//     });
  
//     parent.addEventListener('mouseleave', (e)=> {
//       let childRegi = document.querySelectorAll(`div[data-pcode="${pCode}"]`);
//       childRegi.forEach(child => {
//         child.style.display = 'none';
//       });
//     });

//   })
  
  


//   // let childRegi = document.querySelectorAll(`div[data-pcode="${parentCode}"]`);
  
//   // for (let i = 0; i < childRegi.length; i++) {
//   //   childRegi[i].style.display = 'flex !important';
//   // }
// }

let regiCheckArr = [];

function checkRegi(regi) {
  const regiCode = regi.dataset.regiCode;
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