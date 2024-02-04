/**
 * 240204 장한원
 * 회원가입 기능
 */
function btnOnclick() {
  const step1Btn = document.getElementById('next');
  const step2Btn = document.getElementById('next2');
  const submitBtn = document.getElementById('submit');
  let firstArr = [];
  let data;

  step1Btn.addEventListener('click', ()=>{
    const userId = document.getElementById('user-idxx').value;
    const userPw = document.getElementById('user-pass').value;
    const userName = document.getElementById('user-name').value;
    const userCellNum = document.getElementById('user-cell').value;

    firstArr.push({
      USER_IDXX : userId
      , PASS_WORD : userPw
      , USER_NAME : userName
      , CELL_NUMB : userCellNum
    });
  });

  step2Btn.addEventListener('click', ()=>{
    const userRegi1 = document.getElementById('user-regi').value;
    const userRegi2 = document.getElementById('user-regi2').value;
    const userRegiNum = userRegi1 + userRegi2;
    const userNickname = document.getElementById('user-nick').value;
    const userSelfIntro = document.getElementById('user-self').value;

    const secondArr = [{
    		REGI_NUMB : userRegiNum
    	, USER_NICK : userNickname
    	, SELF_INTR : userSelfIntro
    }];

    data = Object.assign({}, firstArr[0], secondArr[0]);

  });


  submitBtn.addEventListener('click' , ()=>{

    fetch("/gather/joinDo.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    .then((response) => console.log(response));
    
  });

}