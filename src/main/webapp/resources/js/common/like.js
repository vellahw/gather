document.addEventListener("DOMContentLoaded", function() {
  // 페이지가 로드되면 실행할 코드
  likeYsnoUpdate();

});

let changedValuesArray = []; //ajax로 넘겨줄 배열

window.onbeforeunload = function () {
	return  likeUpdate(changedValuesArray);

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

      $.ajax({
        
        url : "/likeUpdate.com",
        type : "POST",
        data : JSON.stringify(dataArray),
        dataType : 'json',
        contentType: "application/json",
        success : function(result){
        },
        error: function (xhr) {
          console.log(xhr.responseText);
        }
        
      }); 
  }
}
;
/*
admin: hanwon
Purpose: LIKE_YSNO 값에 따른 하트 아이콘 변경
*/
function likeYsnoUpdate() {
	const heartCheckbox = document.querySelectorAll('input[type="checkbox"]'); // 체크박스
	const heartCheckboxCount = heartCheckbox.length;
	const heartYN = document.querySelectorAll('#heartYN'); // LIKE_YN을 가지고 있는 요소

  for (let i = 0; i < heartCheckboxCount; i++) {

    const checkboxId = heartCheckbox[i].id;
    const likeYsNoValue = heartYN[i].value; // LIKE_YN value 

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
  const likeCount = document.querySelectorAll(`span[data-count-id="${checkboxId}"`); // LIKE_COUNT
  let currentLikeYsno = "";
  
  if(isChecked) {

    for (let i = 0; i < targetCount; i++) {
  
      targetCheckBox[i].classList.add('checked');
      let getLikeCount = Number(likeCount[i].innerText); // 기존의 LIKE_COUNT 값을 가져옴
      getLikeCount += 1;
  
      likeCount[i].innerHTML = getLikeCount;  
  
    }

    currentLikeYsno ="1";

  } else {

    for (let i = 0; i < targetCount; i++) {
  
      targetCheckBox[i].classList.remove('checked');
      let getLikeCount = Number(likeCount[i].innerText);  // 기존의 LIKE_COUNT 값을 가져옴
      getLikeCount -= 1;
        
      likeCount[i].innerHTML = getLikeCount;
  
    }

    currentLikeYsno ="0";

  }

  comUpdateArray(changedValuesArray, { LIKE_IDXX :checkboxId,  CLIKE_YSNO : currentLikeYsno , PLIKE_YSNO : preLikeValue }, 'LIKE_IDXX');
  removeItemsWithSameValue(changedValuesArray, 'CLIKE_YSNO', 'PLIKE_YSNO');
  
}


/*
admin: Hwai
Purpose: 현재 좋아요 유무와 orginal 좋아요 유무의 값이 같지 않은 항목만 남기기
*/
function removeItemsWithSameValue(arr, key1, key2) {
  // CLIKE_YSNO와 PLIKE_YSNO의 값이 같지 않은 항목만 남기기
  const filteredArray = arr.filter(item => item[key1] !== item[key2]);

  // 기존 배열을 변경
  arr.length = 0;
  arr.push(...filteredArray);
}
