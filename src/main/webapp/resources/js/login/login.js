document.addEventListener('DOMContentLoaded', function () {
    // 로그인시 이메일 유효성 검사
    function checkId(email) {
        var pattern = /^[0-9a-zA-Z가-힣]([-_.]?[0-9a-zA-Z가-힣])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        if(!pattern.test(email)) {
           return false;
        }
        return true;
    }

    const userIdForm = document.getElementById('USER_IDXX');
    const appendArea = document.getElementById('append');

    userIdForm.addEventListener("change", function(num){
        if(checkId(userIdForm.value) == false){ 
            appendArea.style.display = 'block';
            appendArea.innerHTML = "올바른 이메일 형식을 입력해주세요."; 
            appendArea.style.marginBottom = '10px';
        } else {
            appendArea.style.display = 'none';
        }
    });


    // 로그인 폼 처리    
    $("#loginForm").submit(function (event) {
        event.preventDefault();
        const USER_IDXX = $('#USER_IDXX').val();
        const PASS_WORD = $('#PASS_WORD').val();
        const data = {
            "USER_IDXX": USER_IDXX,
            "PASS_WORD": PASS_WORD,
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
                 
                  const appendArea = document.getElementById('append');
                  appendArea.innerHTML = '아이디 또는 비밀번호가 일치하지 않습니다.'
                  document.getElementById('USER_IDXX').focus();
                  appendArea.style.marginBottom = "10px";
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
    const signupForm = document.getElementById("signupForm");
    const findIdForm = document.getElementById("findIdForm");
    const findPwForm = document.getElementById("findPwForm");

    if (formId === 'signupForm') {
   		 signupForm.style.display = "block";
        loginForm.style.display = "none";
        findIdForm.style.display = "none";
        findPwForm.style.display = "none";
    } else if (formId === 'findIdForm') {
        loginForm.style.display = "none";
        signupForm.style.display = "none";
        findIdForm.style.display = "block";
        findPwForm.style.display = "none";
    } else if(formId === 'findPwForm') {
        loginForm.style.display = "none";
        findPwForm.style.display = "block";
        signupForm.style.display = "none";
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