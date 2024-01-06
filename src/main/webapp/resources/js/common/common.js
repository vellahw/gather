/* 
admin:Hwai
name:comAlert
parameter:(content: 내용)
*/ 
function comAlert(title){

	 swal({ 
            title: title,
            button:"확인"                                   
        });
}

/* 
admin:Hwai
name:comAlert2
parameter:(type : 알럿타입 , title : 제목, content: 내용 , url : 확인 후 전송url
*/ 
function comAlert2(type, title, content, button ,url){

    //타입별 처리 실시 (1=일반/2=성공/3=경고/4=실패/5=확인 후 redirect)
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
admin:Hwai
name:cusAlert
parameter:(type : 알럿타입 , title : 제목, content: 내용 , okFn : 확인 후 함수
*/ 
function cusAlert(title, icon, button, okFn){
    
    swal({
        title : title,
        icon : icon,
        button: button,
        closeOnClickOutside: false,
      })
      .then(function(){
        okFn();
        });
}