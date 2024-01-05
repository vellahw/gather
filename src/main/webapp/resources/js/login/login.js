document.addEventListener('DOMContentLoaded', function () {
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
                console.log(resultData);

                if(resultData == "success") {
                	const USER_NICK = result.USER_NICK;
                    alert( USER_NICK + "님 안녕하세요!");
                    location.href = "/gather.com";
                } else {
                    alert("실패!");
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
    var loginForm = document.getElementById("loginForm");
    var signupForm = document.getElementById("signupForm");
    var findIdForm = document.getElementById("findIdForm");

    if (formId === 'signupForm') {
        signupForm.style.display = "block";
        loginForm.style.display = "none";
        findIdForm.style.display = "none";
    } else if (formId === 'findIdForm') {
        loginForm.style.display = "none";
        signupForm.style.display = "none";
        findIdForm.style.display = "block";
    } else {
        loginForm.style.display = "block";
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