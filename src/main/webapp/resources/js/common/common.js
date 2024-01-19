/* 
240111 Hwai
name: 좋아요 구동
Purpose: 게시물 좋아요 구동
parameter: LIKE_IDXX
*/		     
function likeInsert(button) {

    var LIKE_IDXX = $(button).data('moim-id')
    var USER_NUMB = sessionStorage.getItem('USER_NUMB');

    if(USER_NUMB != null) {
      
       $.ajax({
              url : "/likeInert.com",
              type : "post",
              data : {LIKE_IDXX : LIKE_IDXX},
              success : function(result){

                location.reload(true); 

              }
          }); 
       }  else {
        
        comConfirm("로그인이 필요한 서비스입니다.", "로그인 페이지로 이동하시겠습니까?", "warning" , "/gather/login.com")
       
        }
    }
  
function likeDelete(button) {
    var LIKE_IDXX = $(button).data('moim-id')
        
    $.ajax({
            url : "/likeDelete.com",
            type : "post",
            data : {LIKE_IDXX : LIKE_IDXX},
            success : function(result){
                location.reload(true); 
            }
        }); 
}

/* 
240111 Hwai
name:whereIam
Purpose: 현재 사용자가 위치한 모임타입
parameter: null
*/		     
function comWhereIam() {
    var queryParams = new URLSearchParams(window.location.search);
    var moimType = queryParams.get("type");
    var moimTypeKr = "";

    if (!moimType || moimType === "gt") {
        moimType = 'gt';
        moimTypeKr = '게더';
    } else if (moimType === "cb") {
        moimTypeKr = '클럽';
    } else if (moimType === "ch") {
        moimTypeKr = '챌린지';
    }

    return { moimType: moimType, moimTypeKr: moimTypeKr };
}

/* 
240111 Hwai
name:ComIsEmpty
Purpose: null, "" 값 체크
parameter:obj
*/ 
function ComIsEmpty(obj){
	if(obj == null || obj == ""){
		return true;
	}
	return false;
}

/* 
240111 Hwai
name:comApplyNumFmt
Purpose:입력폼 초기화
parameter:null
*/ 
function comResetInput($inputForm, hiddenChkFlag = true, disabledChkFlag = true){
	
	if(hiddenChkFlag){
		$(`input[type=hidden]`,$inputForm).val(null);
	}
	
	$(`input[type=password]`,$inputForm).val(null);
	$(`input[type=text]`,$inputForm).val(null);
	$(`input[type=number]`,$inputForm).val(null);
	$(`input[type=email]`,$inputForm).val(null);
	$(`input[type=checkbox]`,$inputForm).prop("checked", false);
	$(`input[type=radio]`,$inputForm).prop("checked", false);
	$(`textarea`,$inputForm).val(null);
	
	$.each($(`.dropdown-menu`,$inputForm),function(index, item){
		$(`a:eq(0)`,$(item)).trigger("click");
	});

	$.each($('select',$inputForm),function(index, item){
		item = $(item);
		$('option:eq(0)',item).prop('selected',true);
	});
	
	// disabled false
	if(disabledChkFlag){		
		$(`input, button, textarea`,$inputForm).prop('disabled',false);
	}
}
/* 
240111 Hwai
name:comApplyNumFmt
Purpose: 통화포멧
parameter:num
*/ 
function comApplyNumFmt(num) {

	if(!$.isNumeric(num)) {
		if(num == null || num == undefined || num == '') {
			return 0;
		}
		return num;
	}
	
	var isMinus = false;
	if(num == 0 || num == '0') {
		return 0;
	}
	if(num < 0) {
		num *= -1;
		isMinus = true;
	}
	num = ''+num;
	var rult = '';
	while(num.length>3) {
		var temp = num.substring(num.length-3);
		num = num.substring(0, num.length-3);
		rult = temp + rult;
		rult = ',' + rult;
	}
	rult = num + rult;
	if(isMinus) rult = '-'+rult;
	return rult;

}

/* 
240111 Hwai
name:comAlert
Purpose: 통화포멧제거
parameter:num
*/ 
function ComRemoveNumFmt(num) {

	return parseInt(num.replace(/,/g, ''));

}
/* 
240111 Hwai
name:comAlert
Purpose:알럿창
parameter:(content: 내용)
*/ 
function comAlert(title){

	 swal({ 
            title: title,
            button:"확인"                                   
        });
}

/* 
240111 Hwai
name:comAlert2
Purpose:알럿창
parameter:(type : 알럿타입 , title : 제목, content: 내용 , url : 확인 후 전송url
*/ 
function comAlert2(type, title, content, button ,url){

    //타입별 처리 실시 (1=일반/2=성공/3=경고/4=실패/5=확인 후 redirectUrl)

    if(type == 1){                            
        swal({ 
            title: title,
            text: content,
            button: "확인",
            closeOnClickOutside: false                                 
        });
    }
    else if(type == 2){
        swal({ 
            title: title,
            text: content,                    
            icon: "success", 
            button: "확인",
            closeOnClickOutside: false
        });
    }
    else if(type == 3){
        swal({ 
            title: title,
            text: content,                    
            icon: "warning", 
            button: "확인",
            closeOnClickOutside: false
        });

    }
    else if(type == 4){
        swal({ 
            title: title,
            text: content,                    
            icon: "error", 
            button: "확인",
            closeOnClickOutside: false
        });
    }
    else if(type == 5){ 
        swal({ 
            title: title,
            text: content,                    
            icon: "success",
            button: button,
            closeOnClickOutside: false
        }).then(function(){
            location.href = url;});

    }
};

/* 
240111 Hwai
name:comAlert3
Purpose:알럿창
parameter:(title : 제목, icon:아이콘 , content: 내용 , button: 버튼 , okFn : 확인 후 함수)
*/ 
function comAlert3(title, content, icon,  okFn){
    
    swal({
        title: title,
        text: content,
        icon: icon,
        buttons: [
            '아니오',
            '네'
        ],
        }).then(function(isConfirm) {
        if (isConfirm) {
            okFn
        } else {

        }
        })
}

/* 
admin:Hwai
name:comConfirm
Purpose:컨펌창
parameter:(title : 제목, content: 내용 , icon : 아이콘 , okPath:확인 후 경로 )
*/ 
function comConfirm(title, content, icon, okPath){ 

    swal({
        title: title,
        text: content,
        icon: icon,
        buttons: [
            '아니오',
            '네'
        ],
        }).then(function(isConfirm) {
        if (isConfirm) {
            location.href = okPath
        } else {

        }
        })

  }

/* 
admin:Hanwon
name:goDetail
Purpose:디테일 페이지로 이동
parameter:(params : MOIM_IDXX 파라미터)
*/ 
function goDetail(params) {
  location.href = `/gatherDetail.com?idx=${params}`;
}


/* 
admin:Hanwon
name:parseString
Purpose: input value의 값을 JSON으로 파싱
parameter: (targetValue: 파싱할 타겟의 value)
*/	
function parseString(targetValue) {

  // 1. 중괄호와 공백 제거
  const cleanedString = targetValue.replace(/[{} ]/g, '');
          
  // 등호를 콜론으로 대체, 키와 값을 큰따옴표로 감쌈
  const jsonString = cleanedString.replace(/([^,=]+)=([^,=]+)/g, '"$1":"$2"');
          
  // JSON 타입으로 파싱
  const result = JSON.parse(`{${jsonString}}`);
      
  return { result: result };

}

/**
 * admin: hanwon
 * Purpose: LIKE_YSNO 값에 따른 하트 아이콘 변경 
*/
document.addEventListener('DOMContentLoaded', ()=>{
  const heartCheckbox = document.querySelectorAll('input[type="checkbox"]'); // 체크박스
  const heartCheckboxCount = heartCheckbox.length;
  const heartYN = document.querySelectorAll('#heartYN'); // LIKE_YN을 가지고 있는 요소
  
  for (let i = 0; i < heartCheckboxCount; i++) {
  
      const likeYsNoValue = heartYN[i].value; //LIKE_YN value 
  
      if(likeYsNoValue == '1') { 
        heartCheckbox[i].checked = true; // 체크박스의 상태를 true로 설정
        handleCheckboxChange(heartCheckbox[i]);
      }  
  
  }
  
})

/* 
admin:Hanwon
name:handleCheckboxChange
Purpose: 체크박스 상태를 관리
parameter: (checkbox: 타켓 checkbox)
*/	
function handleCheckboxChange(checkbox) {
  // 선택된 체크박스의 ID를 가져옴
  const checkboxId = checkbox.id;
  
  // 선택된 체크박스의 상태를 가져옴
  const isChecked = checkbox.checked;
  
  // 체크박스 스타일 업데이트
  updateResult(checkboxId, isChecked);
  
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
  
  if(isChecked) {

    for (let i = 0; i < targetCount; i++) {
  
      targetCheckBox[i].classList.add('checked');
      let getLikeCount = Number(likeCount[i].innerText); // 기존의 LIKE_COUNT 값을 가져옴
      getLikeCount += 1;
  
      likeCount[i].innerHTML = getLikeCount;
  
    }
  } else {
  
    for (let i = 0; i < targetCount; i++) {
  
      targetCheckBox[i].classList.remove('checked');
      let getLikeCount = Number(likeCount[i].innerText);  // 기존의 LIKE_COUNT 값을 가져옴
      getLikeCount -= 1;
        
      likeCount[i].innerHTML = getLikeCount;
  
    }
  }
}