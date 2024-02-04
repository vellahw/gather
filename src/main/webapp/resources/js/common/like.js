document.addEventListener("DOMContentLoaded", function() {
  // 페이지가 로드되면 실행할 코드
  likeYsnoUpdate();
  
});

let changedValuesArray = []; //ajax로 넘겨줄 배열

if(sessionStorage.getItem("USER_NUMB") != null){
  // 1초마다 likeUpdate 함수 실행
  setInterval(function() {

    if(changedValuesArray.length > 0) {

      likeUpdate(changedValuesArray);
      changedValuesArray.splice(0, changedValuesArray.length);

    }

  }, 100); //
}

/* 
240123 Hwai
name: likeCountReplace
Purpose: 좋아요 수 1000이상 999+로 치환
parameter: (likeCoumt: Number)
*/	
function likeCountReplace(likeCount) {
  if (typeof likeCount !== 'number' || isNaN(likeCount)) {
      return console.log('Invalid Input from likeCount');
  }

  if (likeCount > 1000) {
      return '999+';
  } else {
      return likeCount.toString();
  }
}


/* 
240122 hanwon
name: likeInsert
Purpose: 게시물 좋아요 처리
parameter: (dataArray: 좋아요 데이터 배열)
*/
function likeUpdate(dataArray) {
  
  const dataArrayLength = dataArray.length;

  if(dataArrayLength != 0) {

    comAjax(
      "POST"
      , "/likeUpdate.com"
      , JSON.stringify(dataArray)
      , "application/json"
    );
  }
}

/*
admin: hanwon
Purpose: LIKE_YSNO 값에 따른 하트 아이콘 변경
*/
function likeYsnoUpdate() {
  const heartCheckbox = document.querySelectorAll('input[type="checkbox"]'); // 체크박스
  const heartCheckboxCount = heartCheckbox.length;
  const heartYN = document.querySelectorAll('#heartYN'); // LIKE_YN을 가지고 있는 요소
  const likeRealCount = document.querySelectorAll('#realCount'); // 실제 LIKE_COUNT 값
  const likeShowCount = document.querySelectorAll('#showCount'); // 화면상 보여지는 LIKE_COUNT 값

  for (let i = 0; i < heartCheckboxCount; i++) {

    const checkboxId = heartCheckbox[i].id;
    const likeYsNoValue = heartYN[i].value; // LIKE_YN value

    let getLikeCount = Number(likeRealCount[i].value); // 기존의 LIKE_COUNT 값을 가져옴

    let getShowCount = likeCountReplace(getLikeCount);
    likeShowCount[i].innerHTML = getShowCount;  

    // 체크박스의 상태를 LIKE_YSNO 값에 따라 설정
    heartCheckbox[i].checked = likeYsNoValue === '1';

    if(likeYsNoValue == '1'){

      const targetCheckBox = document.querySelectorAll(`label[for="${checkboxId}"]`); // 체크박스 하트 아이콘

      for (let j = 0; j < targetCheckBox.length; j++) {

        targetCheckBox[j].classList.add('checked');

      }
    }
  }
}


/* 
admin:Hanwon, Hwai
name:handleCheckboxChange
Purpose: 체크박스 상태를 관리
parameter: (checkbox: 타켓 checkbox)
*/   
function handleCheckboxChange(checkbox) {

  if(sessionStorage.getItem("USER_NUMB") == null) {

    comConfirm("로그인이 필요한 서비스입니다.", "로그인 하고 게더를 즐겨보세요!", "warning", "/gather/login.com");
  
  } else {

    // 선택된 체크박스의 ID를 가져옴
    const checkboxId = checkbox.id;
      
    // 선택된 체크박스의 상태를 가져옴
    const isChecked = checkbox.checked; // true or false 반환

    // 체크박스 스타일 업데이트
    updateResult(checkboxId, isChecked);
  }
}
  
/* 
admin:Hanwon, Hwai
name:updateResult
Purpose: 체크박스 스타일 업데이트
parameter: (checkboxId: 타켓 checkbox 아이디, isChecked: 체크박스의 체크 상태)
*/
function updateResult(checkboxId, isChecked) {

  const targetCheckBox = document.querySelectorAll(`label[for="${checkboxId}"]`); // 체크박스 하트 아이콘
  const preLike = document.querySelectorAll(`input[data-like-id="${checkboxId}"]`); 
  const preLikeValue = preLike[0].value; //LIKE_YSNO의 현재 값
  const targetCount = targetCheckBox.length;
  const likeRealCount = document.querySelectorAll(`input[data-realCount-id="${checkboxId}"`); // 실제 LIKE_COUNT 값
  const likeShowCount = document.querySelectorAll(`span[data-ShowCount-id="${checkboxId}"`);  // 화면상 보여지는 LIKE_COUNT 값
  let currentLikeYsno = "";
  
  if(isChecked) {

    for (let i = 0; i < targetCount; i++) {
  
      targetCheckBox[i].classList.add('checked');
      let getLikeCount = Number(likeRealCount[i].value); // 기존의 LIKE_COUNT 값을 가져옴
      getLikeCount += 1;
      likeRealCount[i].value = getLikeCount;
      
      let getShowCount = likeCountReplace(getLikeCount);
      likeShowCount[i].innerHTML = getShowCount;  
      
    }

    currentLikeYsno ="1";

  } else {

    for (let i = 0; i < targetCount; i++) {
  
      targetCheckBox[i].classList.remove('checked');
      let getLikeCount = Number(likeRealCount[i].value);  // 기존의 LIKE_COUNT 값을 가져옴
      getLikeCount -= 1;
      likeRealCount[i].value = getLikeCount;
        
      let getShowCount = likeCountReplace(getLikeCount);
      likeShowCount[i].innerHTML = getShowCount;  
  
    }

    currentLikeYsno ="0";

  }

  comUpdateArray(changedValuesArray, { LIKE_IDXX :checkboxId,  CLIKE_YSNO : currentLikeYsno , PLIKE_YSNO : preLikeValue }, 'LIKE_IDXX');
}