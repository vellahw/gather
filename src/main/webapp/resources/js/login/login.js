document.addEventListener('DOMContentLoaded', function () {
    const userIdForm = document.getElementById('USER_IDXX'); // id 입력 input
    const userPwForm = document.getElementById('PASS_WORD'); // pw 입력 input
    const appendArea = document.getElementById('append'); // 안내문구 띄울 공간
    
//     var naverLogin = new naver.LoginWithNaverId( {
//         clientId: "imq4BJkILgfjUij4Rw1W", // 내꺼
//         callbackUrl: "http://localhost:8080/gather/naverLoginDo.com",
//         isPopup: false, /* 팝업을 통한 연동처리 여부 */
//         loginButton: {color: "green", type: 1, height: 20}, /* 로그인 버튼의 타입을 지정 */
//         callbackHandle: true
//     } ); 
    
//     /* 설정정보를 초기화하고 연동을 준비 */
//     naverLogin.init();

//     window.addEventListener('load', function () {	
// 		naverLogin.getLoginStatus(function(status) {
// 			if (status) {
// 				const email = naverLogin.user.getEmail();
// 				const nickName = naverLogin.user.getNickName();
// 				const id = naverLogin.user.getId();
				
// 				alert(naverLogin);
// 				alert(email);
// 				alert(nickName);
//       }
//     })
//   })

//     // 네이버 로그인 소스에서 추가되는 부분
//     $(document).on("click", "#naverLogin", function(){
//         var naverLogin = document.getElementById("naverIdLogin").firstChild;
//         naverLogin.click();
//     });

    /*
      안내문구 띄우는 함수
      parameter: (text: 띄울 문구)
    */ 
    function appendWarning(text) {
        const appendArea = document.getElementById('append');
        appendArea.style.display = 'block';
        appendArea.innerHTML = text; 
        appendArea.style.marginBottom = '10px';
    }
    
    // 이메일 입력값 유효성 검사 함수
    function checkId(email) {
        var pattern = /^[0-9a-zA-Z가-힣]([-_.]?[0-9a-zA-Z가-힣])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        if(!pattern.test(email)) {
           return false;
        }
        return true;
    }

    // 아이디(이메일) 입력 검사
    userIdForm.addEventListener("change", function(num){
        if(checkId(userIdForm.value) == false){ 
            appendWarning("올바른 이메일 형식을 입력해주세요.");
        } else {
            appendArea.style.display = 'none';
        }
    });


    // 로그인 폼 처리    
    $("#loginForm").submit(function (event) {

        event.preventDefault();
        const USER_IDXX = userIdForm.value;
        const PASS_WORD = userPwForm.value;
        const data = {
            "USER_IDXX": USER_IDXX,
            "PASS_WORD": PASS_WORD,
        }

        // 아이디 입력 input이 비었는지 검사
        if(USER_IDXX == '' || null || undefined) {
        userIdForm.focus();
        appendWarning("아이디를 입력해주세요.");
        return false;
		// 아이디(이메일) 형식 검사
        } else if(checkId(userIdForm.value) == false){ 
            appendWarning("올바른 이메일 형식을 입력해주세요.");
            return false;
        // 비밀번호 입력 검사   
        } else if(PASS_WORD == '' || null || undefined){
            appendWarning("비밀번호를 입력해주세요.");
            return false;
        }

        $.ajax({
            type: "POST",
            url: "/gather/loginDo.com",
            data: JSON.stringify(data),
            contentType: "application/json",
            success: function (result) {

                if(result.result == "success") {    

                    //로그인 성공 시 자바스크립트 세션값 저장
                    sessionStorage.setItem('USER_NUMB',result.USER_NUMB);       //회원번호
                    sessionStorage.setItem('USER_TYPE',result.USER_TYPE);       //회원타입(사용자, 개발자, 운영자)
                    sessionStorage.setItem('TYPE_CODE',result.TYPE_CODE);       //회원타입코드(UR: 사용자, DV:개발자, AD:운영자)
                    sessionStorage.setItem('USER_NAME',result.USER_NAME);       //회원이름
                    sessionStorage.setItem('USER_NICK', result.USER_NICK);      //회원 닉네임
                    sessionStorage.setItem('USER_IMAG',result.USER_IMAG);       //회원 프로필사진
                    sessionStorage.setItem('USER_BIRTH',result.USER_BIRTH);     //회원생일
                    sessionStorage.setItem('USER_JUMIN2',result.USER_JUMIN2);   //회원 주민번호 뒷자리
                    sessionStorage.setItem('USER_AGEE',result.USER_AGEE);       //회원나이
                    sessionStorage.setItem('REGI_NUMB',result.REGI_NUMB);       //회원 주민등록번호
                    sessionStorage.setItem('USER_GNDR',result.USER_GNDR);       //회원성별

                    if(result.TYPE_CODE == "UR" ){  //일반 사용자
                      
                	    comAlert2( 5
                                  ,"로그인 완료"
                                  , result.USER_NICK + "님 반갑습니다!"
                                  , "let's gather!"
                                  , function(){
                                    location.href = document.referrer});

                    } else if (result.TYPE_CODE == "DV" || result.TYPE_CODE == "AD") {  //관리자 또는 개발자.

                            swal({
                            title: "관리자 페이지로 이동하시겠습니까?",
                            text: result.USER_NICK + "님의 계정은 " + result.USER_TYPE+ "계정입니다.",
                            icon: "success",
                            buttons: [
                                '아니오',
                                '네'
                            ],
                            }).then(function(isConfirm) {
                            if (isConfirm) {
                                swal({
                                title: "관리자 페이지로 이동합니다.",
                                icon: "success"
                                }).then(function() {
                                location.href = "/gather.com"
                                });
                            } else {
                                swal({
                                    title: "홈페이지로 이동합니다.",
                                    icon: "success"
                                }).then(function() {
                                    location.href = "/gather.com"
                                    });
                            }
                            })

                    }

                } else if (result.result == "fail"){    //정지된 사용자

                    comAlert3("정지된 계정입니다.", "error" 
                              , result.USER_NICK + "님의 계정은 현재 정지상태입니다.\n 정지사유:  " 
                              + result.BANN_CNTT 
                              + "\n 정지기간:  " + result.BANN_STRT + " ~ " + result.BANN_ENDD, "확인", null);

                } else {

                  appendWarning("아이디 또는 비밀번호가 일치하지 않습니다.");
                  document.getElementById('USER_IDXX').focus();

                }

            },
            error: function (xhr, status, error) {
    		    console.log(xhr.responseText); // 서버에서 받은 응답 내용 확인
    		    alert("서버 오류 발생"); 
            }
        });
    });

    let currentImageIndex = 0;
    const backgroundImageList = document.querySelectorAll('.backGroundContainer .backGroundImg');
    const totalImages = backgroundImageList.length;

    function slideImages() {
        currentImageIndex = (currentImageIndex + 1) % totalImages;
        const translateValue = -currentImageIndex * 100 + '%';
        document.querySelector('.backGroundContainer ul').style.transform = 'translateX(' + translateValue + ')';
    }

    setInterval(slideImages, 5000); // 5초에 한 번씩 슬라이딩
});

// 로그인/회원가입 폼 전환을 담당하는 JavaScript 함수
function toggleForm(formId) {
    const loginForm = document.getElementById("loginForm");
    const findIdForm = document.getElementById("findIdForm");
    const findPwForm = document.getElementById("findPwForm");
    const signupForm = document.getElementById("signupForm");

    if (formId === 'findIdForm') {
        findIdForm.style.display = "block";
        loginForm.style.display = "none";
        signupForm.style.display = "none";
        findPwForm.style.display = "none";
    } else if (formId === 'findPwForm') {
        findPwForm.style.display = "block";
        loginForm.style.display = "none";
        signupForm.style.display = "none";
        findIdForm.style.display = "none";
    } else if(formId === 'signupForm') {
        signupForm.style.display = "block";
        loginForm.style.display = "none";
        findPwForm.style.display = "none";
        findIdForm.style.display = "none";
    }
}

// 단계별로 왼쪽으로 이동하는 JavaScript 함수
function nextSection(nextSectionId) {
    var currentSection = document.querySelector('.signupSection:not([style*="display: none;"])');
    var nextSection = document.getElementById(nextSectionId);

    if (currentSection && nextSection) {
        currentSection.style.left = '-100%';
        nextSection.style.left = '0';
    }
}

function prevSection() {
    var currentSection = document.querySelector('.signupSection:not([style*="display: none;"])');
    var prevSection = currentSection.previousElementSibling;

    if (currentSection && prevSection) {
        currentSection.style.left = '100%';
        prevSection.style.left = '0';
    }
}