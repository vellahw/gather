document.addEventListener('DOMContentLoaded', function () {
  
  const userIdForm = document.getElementById('USER_IDXX'); // id 입력 input
  const userPwForm = document.getElementById('PASS_WORD'); // pw 입력 input
  const appendArea = document.getElementById('append'); // 안내문구 띄울 공간
  
  const params = new URL(location.href).searchParams;
  const social = params.get('social');
  const prefill = document.getElementById('socialPrefill');
  if (social && prefill) {
    toggleForm('signupForm');
    document.getElementById('userId').value = prefill.dataset.email || '';
    document.getElementById('userNick').value = prefill.dataset.nick || '';
    document.getElementById('userId').readOnly = true;
    document.querySelector('.authmail').style.display = 'none';
    document.querySelector('.authmailContainer').style.display = 'none';
    isAuth = 'Y';
  }
  if (params.get('error') === 'banned') {
    appendWarning('append', '정지된 계정입니다. 관리자에게 문의해주세요.');
  } else if (params.get('error') === 'oauth') {
    appendWarning('append', '소셜 계정의 이메일을 확인할 수 없습니다. 다른 로그인 방법을 이용해주세요.');
  }

  // 아이디(이메일) 입력 검사
  userIdForm.addEventListener("change", () => {
    if(!checkId(userIdForm.value)){ 
      appendWarning('append', "올바른 이메일 형식을 입력해주세요.");
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
      appendWarning('append', "아이디를 입력해주세요.");
      return false;
		// 아이디(이메일) 형식 검사
    } else if(checkId(userIdForm.value) == false){ 
      appendWarning('append', "올바른 이메일 형식을 입력해주세요.");
      return false;
    // 비밀번호 입력 검사   
    } else if(PASS_WORD == '' || null || undefined){
      appendWarning('append', "비밀번호를 입력해주세요.");
      return false;
    }

    $.ajax({
      type: "POST",
      url: "/gather/loginDo.com",
      headers: comCsrfHeaders(),
      data: JSON.stringify(data),
      contentType: "application/json",
      success: function (result) {

        if(result.result == "success") {  

          //로그인 성공 시 자바스크립트 세션값 저장
          sessionStorage.setItem('USER_NUMB',result.USER_NUMB);     //회원번호
          sessionStorage.setItem('USER_TYPE',result.USER_TYPE);     //회원타입(사용자, 개발자, 운영자)
          sessionStorage.setItem('TYPE_CODE',result.TYPE_CODE);     //회원타입코드(UR: 사용자, DV:개발자, AD:운영자)
          sessionStorage.setItem('USER_NAME',result.USER_NAME);     //회원이름
          sessionStorage.setItem('USER_NICK', result.USER_NICK);    //회원 닉네임
          sessionStorage.setItem('USER_IMAG',result.USER_IMAG);     //회원 프로필사진
          sessionStorage.setItem('USER_AGEE',result.USER_AGEE);     //회원나이
          sessionStorage.setItem('USER_GNDR',result.USER_GNDR);     //회원성별

          if(result.TYPE_CODE == "UR" ){  //일반 사용자
            
        	  comAlert2( 5
                  ,"로그인 완료"
                  , result.USER_NICK + "님 반갑습니다!"
                  , "let's gather!"
                  , function(){
                    const referrerUrl = document.referrer ? new URL(document.referrer) : null;
                    if (referrerUrl && referrerUrl.origin === location.origin
                        && referrerUrl.pathname !== '/gather/login.com') {
                      location.href = referrerUrl.href;
                      return;
                    }
                    location.href = '/gather.com';
                  });

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

        } else if (result.result == "fail"){  //정지된 사용자

          comAlert2(3
                , "정지된 계정입니다." 
                , result.USER_NICK + "님의 계정은 현재 정지상태입니다.\n 정지사유:  " 
                + result.BANN_CNTT 
                + "\n 정지기간:  " + result.BANN_STRT + " ~ " + result.BANN_ENDD
                , "확인", null);

        } else if (result.result === 'locked') {

          appendWarning('append', "로그인 시도가 너무 많습니다. 5분 뒤 다시 시도해주세요.");

        } else {

          appendWarning('append', "아이디 또는 비밀번호가 일치하지 않습니다.");
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
  
  /* join.js의 지역 데이터 처리 & 노드 생성 함수 */
  // controlRegiData();

  /* join.js의 폼의 input에 대한 change 이벤트 함수 */
  inputChangeHandler();
  
}); // END DOMContentLoaded

/*
  유효성 검사 문구 띄우는 함수
  parameter: (id: 추가되는 공간 요소의 id, text: 띄울 문구)
*/ 
function appendWarning(id, text) {
  const appendArea = document.getElementById(id);
  appendArea.style.display = 'block';
  appendArea.textContent = text;
  appendArea.style.marginBottom = '10px';
}
    
// 이메일 입력값 유효성 검사 함수
function checkId(email) {
  const pattern = /^[0-9a-zA-Z가-힣]([-_.]?[0-9a-zA-Z가-힣])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  if(!pattern.test(email)) {
      return false;
  }
  return true;
}
