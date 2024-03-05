<%@page import="java.util.List"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<link rel="stylesheet" href="/resources/css/login/login.css">
<script src="/resources/js/loginPage/login.js"></script>
<script src="/resources/js/loginPage/join.js"></script>
<script type="text/javascript" src="https://static.nid.naver.com/js/naverLogin_implicit-1.0.2.js" charset="utf-8"></script>

<div class="backGroundContainer">
  <ul class="backGroundList">
     <c:forEach var="Bimag" items="${Bimag}">
     <li>
        <div class="backgroundItem">
          <img src="<c:out value="${Bimag.BACK_IMGG}"/>" class="backGroundImg">
        </div>
     </li>
     </c:forEach>
  </ul>

  <div class="formContainer">
    <!-- 로그인 폼 -->
    <div class="loginContainer _act" id="loginForm">
        <form action="/gather/loginDo.com" method="post">
           <h2 class="LoginHead">로그인</h2>
           <input type="text" class="basicInput" name="USER_IDXX" id="USER_IDXX" placeholder="아이디(이메일 형식)">
           
           <div class="userPwContainer">
	           <input type="password" class="basicInput" name="PASS_WORD" id="PASS_WORD" placeholder="비밀번호">
	           <button type="button" class="showPw" data-src="/resources/img/login/eyeIcon.png">
				    	<img class="pwBtnImg" alt="비밀번호 표시 버튼" />
				     </button>
			     </div>
           <div id="append" class="append_login"></div>
           <button type="submit" class="basicInput btn">로그인</button>
           <div class="additionalButtons">
              <button type="button" onclick="toggleForm('findIdForm')" class="findIdButton">아이디 찾기</button>
              <button type="button" onclick="toggleForm('findPwForm')" class="findIdButton">비밀번호 찾기</button>
              <button type="button" onclick="toggleForm('signupForm')" class="signupButton">회원가입</button>
           </div>
         </form>
   
        <div class="socialButtons">
           <div id="naverIdLogin"></div>
          <button id="naverLogin" onclick="location.href='${urlNaver}'"class="loginButton naver">
            <img class="navericon" src="/resources/img/icon/loginApi/naver.png">
              네이버 로그인
          </button>
          <button class="loginButton kakao" onclick="location.href='${urlKakao}'">
              <img class="kakaoicon" src="/resources/img/icon/loginApi/kakao.png" alt="Kakao Icon">
               카카오 로그인
           </button>
           <button class="Login google" onclick="location.href='${urlGoogle}'">
              <img class="googleicon" src="/resources/img/icon/loginApi/google.png" alt="Google Icon">
               구글 로그인
           </button>
        </div>
     </div>


		  <div id="findIdForm" class="findIdForm">
		    <form action="/findId" method="post">
		    <h2 id="LoginHead">아이디 찾기</h2>
		    <input type="email" class="basicInput" name="email" placeholder="Email">
		    <button type="submit" class="basicInput">아이디 찾기</button>
		    </form>
		  </div>
	
		<div class="loginContainer" id="signupContainer">
		  <form id="signupForm" class="signupForm" method="post">
		    <h2 class="LoginHead">회원가입</h2>
		    <label class="joinlabel" for="userId">⁕ 아이디</label>
		    <div class="userIdContainer step1">
			    <input type="text"
			     			 id="userId"
			      		 class="basicInput _join"
			       		 data-click-target=".authmail"
			        	 placeholder="이메일 형식으로 입력해주세요.">
		    	<button type="button" class="authmail authmailBtn_style">이메일 인증</button>
		    </div>
		    <div id="appendId" class="append_join userId"></div>
		    
		   <div class="authmailContainer">
 		     <div class="authmailLabel">
	 		     <label class="joinlabel" for="authnum">⁕ 인증번호 입력</label>
			     <span id="timer"></span>
		     </div>
		     <div class="authmailInput step1">
			     <input type="text"
			     				id="authnum"
			     				class="basicInput _join"
			     				data-click-target=".authmailSubmit"
			     				placeholder="인증번호를 입력해주세요."
			     				maxlength="6">
		    	 <button type="button" class="authmailSubmit authmailBtn_style">확인</button>
		     </div>
		     <div id="appendAuthnum" class="append_join appendAuthnum"></div>
		   </div>
		    
		    <label class="joinlabel" for="userPw">⁕ 비밀번호</label>
		    <div class="userPwContainer">
			    <input type="password" id="userPw" class="basicInput _join step1" placeholder="영문, 숫자, 특수문자를 포함한 8~14자를 입력해주세요." maxlength="14">
			    <button type="button" class="showPw f-join" data-src="/resources/img/login/eyeIcon.png">
			    	<img class="pwBtnImg" alt="비밀번호 표시 버튼" />
			    </button>
			    
			    <div class="capslock">
			    	<span>CapsLock이 켜져 있어요</span>
			    </div>
		    </div>
		    <div id="appendPw" class="append_join userPw"></div>
		    
		    <label class="joinlabel" for="pwConfirm">⁕ 비밀번호 확인</label>
		    <input type="password" id="pwConfirm" class="basicInput _join step1 appendPwConfirm" maxlength="14">
		    <div id="appendPwConfirm" class="append_join pwConfirm"></div>
		    
		    <label class="joinlabel" for="userCell">⁕ 핸드폰번호</label>
		    <input type="text" id="userCell" class="basicInput _join step1 appendCell" placeholder="숫자만 입력해주세요." maxlength="13">
		    <div id="appendCell" class="append_join userCell"></div>
		    
		    <div class="btnContainer">
			    <button type="button" class="waybtn prev" id="prev">이전</button>
			    <button type="button" class="waybtn next" id="next" >다음</button>
		    </div>
		  </form>
		</div>
		  
		  
		<div class="loginContainer" id="signupStep2">
		  <form>
		    <h2 class="LoginHead">회원가입</h2>
		    <label class="joinlabel" for="userName">⁕ 이름</label>
		    <input type="text" id="userName" class="basicInput _join">
		    <div id="appendName" class="append_join userName"></div>
		    
			  <label class="joinlabel" for="userRegiNum">⁕ 주민등록번호</label>
			  <div class="reginumbWrap">
			    <input type="text" id="userRegiNum" class="basicInput _join regi" maxlength="6">-
			    <input type="text" id="userRegiNum2" class="basicInput _join regi2" maxlength="1">
			    <span>●●●●●●</span>
			  </div>
			  <div id="appendRegiNum" class="append_join userRegiNum"></div>
			  
		    <label class="joinlabel" for="userNick">⁕ 닉네임</label>
		    <input type="text" id="userNick" class="basicInput _join appendNick" placeholder="게더에서 사용할 닉네임을 입력해주세요! (최대 10자)" maxlength="10">
			  <div id="appendNick" class="append_join userNick"></div>
			  
			  <label class="joinlabel" for="userSelf">자기소개</label>
		    <textarea id="userSelf" 
		    					class="basicInput _join"
		    					placeholder="취향, 가치관 등을 나타내보세요! (최대 100자)"
		    					maxlength="100"></textarea>
		    
		    <div class="btnContainer">
			  	<button type="button" class="waybtn prev" id="prev2">이전</button>
			  	<button type="button" class="waybtn next" id="next2">다음</button>
		  	</div>
		  </form>
		</div>
		<div class="loginContainer" id="signupStep3">
		  <form>
		    <h2 class="LoginHead">회원가입</h2>
		    <div class="regionArea">
		    	<p>어느 지역에서 모이고 싶으신가요?</p>
		    	<p>선호하는 지역을 선택해주세요.</p>
		    	<div class="regionBox">
		    		<ul class="level1"></ul>
		    	</div>
		    </div>
		    <div class="btnContainer">
			  	<button type="button" class="waybtn prev" id="prev3">이전</button>
			  	<button type="button" class="waybtn next" id="next3">다음</button>
		  	</div>
		  </form>
		</div>
	
		<div class="loginContainer" id="signupStep4">
			<div style="width: 100%; height: 100%;">
				<div class="bubble">이대로 프로필을 생성할까요?</div>
				<div class="mypage-bg">
					<img class="bg-preview" alt="배경 이미지" />
					<label for="choosebg" class="bg-update">
					  <img src="/resources/img/icon/addIcon.png" class="p-updateIcon" alt="배경 이미지 추가하기">
						<input type="file" name="wallPaper" id="choosebg" accept="image/*" />
					</label>
					<div aria-label="배경 이미지 삭제하기" id="bg-remove" class="bg-update bg-remove">
						<img src="/resources/img/icon/deleteIcon.png" class="p-updateIcon" alt="배경 이미지 삭제 아이콘">
					</div>
					
				</div>
				
				<div class="container" style="max-width: 100px; transform: translateY(-60px);">
					<div class="profileImgWrap pro">
						<img class="profileImg preview" alt="프로필사진" id="profileImg" style="object-position: 0px 0px;"/>
					</div>
					<div id="p-updateBtn" class="p-updateBtn">
						<img src="/resources/img/icon/pencil-w.png" class="p-updateIcon" alt="프로필 사진 수정하기">
					</div>
				</div>	
				
				<div class="profileImgContainer popup">
					<div class="profileImgList"></div>
					<label for="chooseImg" class="upload">
						<img src="/resources/img/icon/addIcon.png" alt="프로필 이미지 직접 업로드">
						<input type="file" name="FILE_SVNM" id="chooseImg" accept="image/*" />
					</label>
					<p id="reset">프로필 사진 삭제</p>
				</div>
					
				<div class="user">
					<p class="nickname"></p>
					<p class="id"></p>
					<p class="selfIntro"></p>
					<div class="pickedRegiContianer">
						<h3>
							<img src="/resources/img/icon/detail/location_detail.png" alt="지역 아이콘" />
							선호하는 모임 지역
						</h3>
						<ul class="regiList"></ul>
					</div>
				</div>
				
				<div class="step4 btnContainer">
				  <button type="button" class="waybtn prev" id="prev4">이전</button>
				  <button type="submit" class="waybtn next" id="submit">확인</button>
			  </div>
			</div>
		</div>
	
		  <form id="findPwForm" action="/findPw" method="post">
			  <h2 id="LoginHead">비밀번호 찾기</h2>
			  <!-- 비번 찾기 폼의 필드들을 여기에 추가 -->
			  <input type="email" class="basicInput" name="email" placeholder="Email">
			  <button type="submit">비밀번호 찾기</button>
		  </form>

      </div>
  
</div>
<input type="hidden" id="regi" value="${regi}" />