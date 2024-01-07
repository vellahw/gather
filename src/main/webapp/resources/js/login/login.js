document.addEventListener('DOMContentLoaded', function () {
    const userIdForm = document.getElementById('USER_IDXX'); // id 입력 input
    const userPwForm = document.getElementById('PASS_WORD'); // pw 입력 input
    const appendArea = document.getElementById('append'); // 안내문구 띄울 공간
    
    var naverLogin = new naver.LoginWithNaverId( {
        clientId: "imq4BJkILgfjUij4Rw1W", // 내꺼
        callbackUrl: "http://localhost:8080/gather/naverLoginDo.com",
        isPopup: false, /* 팝업을 통한 연동처리 여부 */
        loginButton: {color: "green", type: 1, height: 20} /* 로그인 버튼의 타입을 지정 */
    } ); 
    
    /* 설정정보를 초기화하고 연동을 준비 */
    naverLogin.init();

    // 네이버 로그인 소스에서 추가되는 부분
    $(document).on("click", "#naverLogin", function(){
        var naverLogin = document.getElementById("naverIdLogin").firstChild;
        naverLogin.click();
    });

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
		
        // 아이디, 비번 입력 input이 비었는지 검사
        if(USER_IDXX == '' || null || undefined) {
            userIdForm.focus();
            appendWarning("아이디를 입력해주세요.");
            return false;
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
                const resultData = result.result;
                const inputId = $('#USER_IDXX').val();

                if(resultData == "success") {
                	const USER_NICK = result.USER_NICK;
                	comAlert2(5,"로그인 완료", USER_NICK + "님 반갑습니다!", "let's gather!","/gather.com")
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