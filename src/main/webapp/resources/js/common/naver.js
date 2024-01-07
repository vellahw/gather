/**
 * 
 */

const naverLogin = new naver.LoginWithNaverId({
	clientId: "imq4BJkILgfjUij4Rw1W",
	callbackUrl: "http://localhost:8080/gather/naverLoginDo.com",
	isPopup: false, /* 팝업을 통한 연동처리 여부 */
    callbackHandle: true
});

naverLogin.init();/* 설정정보를 초기화하고 연동을 준비 */

	window.addEventListener('load', function () {	
		naverLogin.getLoginStatus(function(status) {
			if (status) {
				const email = naverLogin.user.getEmail();
				const nickName = naverLogin.user.getNickName();
				const id = naverLogin.user.getId();
				
				alert(naverLogin);
				alert(email);
				alert(nickName);
      }
    })
  })