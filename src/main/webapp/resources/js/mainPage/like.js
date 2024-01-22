let changedValuesArray = [];

/**
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
admin:Hanwon
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
admin:Hanwon
name:updateResult
Purpose: 체크박스 스타일 업데이트
parameter: (checkboxId: 타켓 checkbox 아이디, isChecked: 체크박스의 체크 상태)
*/
function updateResult(checkboxId, isChecked) {
  const targetCheckBox = document.querySelectorAll(`label[for="${checkboxId}"]`); // 체크박스 하트 아이콘
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

 
  //changedValues.push({ LIKE_IDXX :checkboxId,  LIKE_YSNO : currentLikeYsno});
  comUpdateArray(changedValuesArray,{ LIKE_IDXX :checkboxId,  LIKE_YSNO : currentLikeYsno },'LIKE_IDXX')
  console.log(changedValuesArray);
  
  let newArr = [];

  for (let i = 0; i < changedValuesArray.length; i++) {

    const ogLikeList =  document.querySelectorAll(`[data-like-id="${changedValuesArray[i].LIKE_IDXX}"`);

    for (let j = 0; j < ogLikeList.length; j++) {

      const ogLikeValue = ogLikeList[j].value;

      if(ogLikeValue != changedValuesArray[i].LIKE_IDXX) {

        let likeId = ogLikeList[j].getAttribute('data-like-id');

        // 중복 확인
        if (newArr.indexOf(likeId) === -1) {
          newArr.push(likeId);
        }
      }

    }
    
  }

  console.log(newArr)


}

/* 
240111 Hwai
name: 좋아요 구동
Purpose: 게시물 좋아요 구동
parameter: LIKE_IDXX
*/		     
function likeInsert() {

  const list = document.querySelectorAll('.checked');

  $.ajax({
    url : "/likeInert.com",
    type : "POST",
    data : { likeIdArray : likeIdArray },
    dataType : 'json',
    success : function(result){
    }
  }); 
}

function likeDelete(LIKE_IDXX) {
    //var LIKE_IDXX = $(button).data('moim-id')
    debugger;

    var likeIdArray = new Array();
    likeIdArray = {LIKE_IDXX};
        
    $.ajax({
            url : "/likeDelete.com",
            type : "POST",
            data : { likeIdArray : likeIdArray },
            dataType : 'json',
            success : function(result){
                location.reload(); 
            }
        }); 
}