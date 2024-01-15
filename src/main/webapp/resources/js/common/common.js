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
function comAlert3(title, icon, content, button, okFn){
    
    swal({
        title : title,
        icon : icon,
        text: content,
        button: button,
        closeOnClickOutside: false
      })
      .then(function(){
        okFn;
        });
}

/* 
admin:Hwai
name:comConfirm
Purpose:컨펌창
parameter:(title : 제목, icon : 아이콘, content: 내용 , okContent: 확인 시 나올 문구, okFn : 확인 후 함수, ccContent:취소 후 나올 문구)
*/ 
function comConfirm(title, icon, content, okContent, okFn, ccContent, ccFn){ 

    swal({
        title: title,
        text: content,
        icon: icon,
        buttons: [
          '아니오',
          '네'
        ],
        dangerMode: true,
      }).then(function(isConfirm) {
        if (isConfirm) {
          swal({
            title: okContent,
            icon: 'success'
          }).then(function() {
            okFn
          });
        } else {
            swal({
                title: ccContent
            }).then(function() {
                ccFn
              });
        }
      })

  }
	
