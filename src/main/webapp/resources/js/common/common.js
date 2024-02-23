/**
 * name:comRemoveArray
 * Purpose: 배열 겹치는 값 삭제
 * parameter: (arr : 배열명, key: 비교 키)
 */
function comRemoveArray(arr, key) {
  let uniqueKeys = new Set();
  let uniqueElements = [];

  arr.forEach(item => {
      if (!uniqueKeys.has(item[key])) {
          uniqueKeys.add(item[key]);
          uniqueElements.push(item);
      }
  });

  return uniqueElements;
}

/* 
240124 hanwon
name:comAjax
Purpose: Ajax 로직
parameter: (arr : 배열명, value: 배열값, key: 비교 키)
*/	
function comAjax(targetType, targetUrl, targetData, targetContentType, targetSuccess) {
    
  $.ajax({
    type: targetType,
    url: targetUrl,
    data: targetData,
    contentType: targetContentType,
    success: targetSuccess,
    error: function (xhr) {
        console.log(xhr.responseText);
    }
  });

}


/* 
240122 KSH
name:comUpdateArray
Purpose: 배열 최신 객체 저장
parameter: (arr : 배열명, value: 배열값, key: 비교 키)
*/	
function comUpdateArray(arr, value, key) {

  // 배열에서 key와 value가 일치하는 항목 찾기
  const index = arr.findIndex(item => item[key] === value[key]);

  // key와 value가 일치하는 항목이 있다면 최신 값으로 교체
  if (index !== -1) {
    arr[index] = value;
  } else {
    // key와 value가 일치하는 항목이 없다면 배열에 추가
    arr.push(value);
  }
}

/* 
240122 KSH
name:comRemoveDuplicates
Purpose: 배열 중복값 삭제
parameter: (arr : 배열)
*/	
function comRemoveDuplicates(arr) {
  return arr.filter((value, index, self) => {
      return self.indexOf(value) === index;
  });
}

/* 
240111 KSH
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
240111 KSH
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
240111 KSH
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
240111 KSH
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
240111 KSH
name:ComRemoveNumFmt
Purpose: 통화포멧제거
parameter:num
*/ 
function ComRemoveNumFmt(num) {

	return parseInt(num.replace(/,/g, ''));

}
/* 
240111 KSH
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
240111 KSH
name:comAlert2
Purpose:알럿창
parameter:(type : 알럿타입 , title : 제목, content: 내용 , okFun : 확인 후 function
*/ 
function comAlert2(type, title, content, button , okFun){

    //타입별 처리 실시 (1=일반/2=성공/3=경고/4=실패/5=확인 후 function)

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
        }).then(okFun);

    }
};

/* 
240111 KSH
name:comAlert3
Purpose:알럿창
parameter:(title : 제목, icon:아이콘 , content: 내용 , button: 버튼 , okFn : 확인 후 함수)
*/ 
function comAlert3(title, content, icon,  okFn) {
    
  swal({ 
    title: title,
    text: content,                    
    icon: icon,
    button: "확인",
    closeOnClickOutside: false
    }).then(okFn);
  }

/* 
240114 KSH
name:comConfirm
Purpose:컨펌창
parameter:(title : 제목
         , content: 내용 
         , icon : 아이콘 
         , okPath:확인 후 경로 )
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
240124 Hanwon
name:comConfirm2
Purpose:컨펌 후 확인 시 알럿
parameter:(title: 제목
         , content: 내용
         , icon: 아이콘
         , okTitle: '네' 눌렀을 때 뜨는 제목
         , okIcon: '네' 눌렀을 때 뜰 아이콘
         , okFn: '네' 누른 후의 동작
         )
*/ 
function comConfirm2(title, content, icon, okTitle, okIcon, okFn) { 
  swal({
      title: title,
      text: content,
      icon: icon,
      buttons: [
        '아니오',
        '네'
      ],
      })
      .then(
        function(isConfirm) {
          if (isConfirm) {
            if(okTitle == null || okIcon == null) {
              okFn;
            } else {
              swal({
              title: okTitle,
              icon: okIcon
                })
                .then( okFn ); // '네' 누른 후의 동작
            }
          } else {
            return false; // '아니오' 누른 후의 동작
          }
      })
}

/* 
admin:KSH
name:comGoSomewhere
Purpose:공통 페이지 이동함수
parameter:(pageName: 페이지(detail : 디테일 페이지
                            search : 검색 페이지)
           , params : 해당 파라미터)
*/ 
function comGoSomewhere(pageName, params) {

  switch (pageName){

    case 'detail':

    location.href = `/gatherDetail.com?idx=${params}`;

    break;

    case 'search':

    location.href = `/gather.com?keyword=${params}`
    
    break;

    case 'makeGather':

    location.href = `/gather/makeGather.com`
    
    break;
    
  }

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


/* 
admin:Hanwon
name:comObjectInArray
Purpose: input value의 값을 파싱하여 Map 객체를 배열에 넣음
parameter: (targetValue: 타겟 value)
*/	
function comObjectInArray(targetValue) {
  const result = [];
  const cleanedData = targetValue.replace(/[[\]\ ]/g, ''); // 대괄호 삭제
  const splitData = cleanedData.split("},{"); // 중괄호 단위로 나눔

  splitData.forEach(item => {
      // 중괄호 제거 후, 쉼표로 데이터 분리
      const keyValuePairs = item.replace("{", "").replace("}", "").split(",");
      const map = {};

      keyValuePairs.forEach(pair => {
          // 등호를 기준으로 키와 값을 나누어 맵에 추가
          const [key, value] = pair.split("=");
          map[key] = value;
      });

      result.push(map); // 배열에 맵 추가

  });

  return { result : result };
}


/* 
240125 KSH
name:comNotify
Purpose: 알림 insert
parameter:(situation: (String 타입) 구글시트확인)
           postUser: 알림을 받는 user_numb)
*/	
function comNotify(situation, postUser) {
    const queryParams = new URLSearchParams(window.location.search);
    const boadidx = queryParams.get("idx");

    const data = {
        NOTI_CODE : situation,
        BOAD_IDXX : boadidx,
        POST_USER : postUser
        }

      
    comAjax( "POST"
            , "/insertNotify.com"
            , JSON.stringify(data)
            , "application/json");
            
}

/* 
240202 KSH
name:comNotify
Purpose: 팔로우 언팔로우
parameter:(folwCode: 관계상태)
            userNumb: user_numb)
*/	
function comFollow(folwCode, userNumb) {

    const data = {
        folwCode : folwCode,
        folwUser : userNumb
        }

      
    comAjax( "POST"
            , "/followUpdate.com"
            , JSON.stringify(data)
            , "application/json"
            ,function(){
              location.reload();
            });
            
}


/* 
240221 장한원
name:comRemoveActiveClass
Purpose: 액티브 클래스 추가 전 이미 적용된 액티브 클래스를 지움
parameter: ( selector: 요소 선택자(클래스, 아이디 등) )
*/	
function comRemoveActiveClass(elementSelector, removeClassName) {
  if(document.querySelector(elementSelector)) {
    document.querySelector(elementSelector).classList.remove(removeClassName);
  }
}