<%@page import="java.util.List"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<link rel="stylesheet" href="/resources/css/login/login.css">
<script src="/resources/js/loginPage/login.js"></script>
<script src="/resources/js/loginPage/join.js"></script>
<script src="/resources/js/loginPage/joinform.js"></script>
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
	  		<input type="password" class="basicInput" name="PASS_WORD" id="PASS_WORD" placeholder="비밀번호">
	  		<div id="append" class="append"></div>
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
		  <form id="signupForm" class="signupForm" method="post" autocomplete="off">
		    <h2 class="LoginHead">회원가입</h2>
		    <label class="joinlabel" for="userId">아이디</label>
		    <div class="userIdContainer">
			    <input type="text" id="userId" class="basicInput _join" placeholder="이메일 형식으로 입력해주세요.">
		    	<button type="button" class="authmailBtn">이메일 인증</button>
		    </div>
		    <label class="joinlabel" for="userPw">비밀번호</label>
		    <input type="password" id="userPw" class="basicInput _join">
		    <label class="joinlabel" for="pwConfirm">비밀번호 확인</label>
		    <input type="password" id="pwConfirm" class="basicInput _join">
		    <label class="joinlabel" for="userCell">핸드폰번호</label>
		    <input type="text" id="userCell" class="basicInput _join">
		    <div class="btnContainer">
			    <button type="button" class="waybtn prev" onclick="prevSection('step2')">이전</button>
			    <button type="button" class="waybtn next" id="next" onclick="nextSection('step2')">다음</button>
		    </div>
		  </form>
		</div>
		  
		  
		<div class="loginContainer" id="signupStep2">
		  <form>
		    <h2 class="LoginHead">회원가입</h2>
		    <label class="joinlabel" for="userName">이름</label>
		    <input type="text" id="userName" class="basicInput _join">
			  <label class="joinlabel" for="user-regi">주민등록번호</label>
			  <div class="reginumbWrap">
			    <input type="text" id="user-regi" class="basicInput _join regi">-
			    <input type="text" id="user-regi2" class="basicInput _join regi2">
			    <span>●●●●●●</span>
			  </div>
		    <label class="joinlabel" for="user-nick">닉네임</label>
		    <input type="text" id="user-nick" class="basicInput _join" placeholder="게더에서 사용할 닉네임을 입력해주세요!">
			  <label class="joinlabel" for="user-self">자기소개</label>
		    <input type="text" id="user-self" class="basicInput _join" placeholder="취향, 가치관 등을 나타내보세요!">
		    
		    <div class="btnContainer">
			  	<button type="button" class="waybtn prev" onclick="prevSection('step3')">이전</button>
			  	<button type="button" class="waybtn next" id="next2" onclick="nextSection('step3')">다음</button>
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
			  	<button type="button" class="waybtn prev" onclick="prevSection('step4')">이전</button>
			  	<button type="button" class="waybtn next" id="next3" onclick="nextSection('step4')">다음</button>
		  	</div>
		  </form>
		</div>
		
		<div class="loginContainer" id="signupStep4">
			<div class="bubble">이대로 프로필을 생성할까요?</div>
			<div class="mypage-bg"></div>
			<div class="container" style="transform: translateY(-60px);">
				<div class="profileImgWrap pro">
					<img class="profileImg" src="/resources/img/basic/profile/profile.jpg" alt="프로필사진"/>
				</div>
				<div class="p-updateBtn">
					<img src="/resources/img/icon/pencile.png" class="p-updateIcon" alt="프사수정버튼">
				</div>
				<div class="user">
					<p class="nickname"></p>
					<p class="selfIntro"></p>
				</div>
			</div>
			<div class="btnContainer" style="margin-top: 90px;">
			  <button type="button" class="waybtn prev" onclick="prevSection('step5')">이전</button>
			  <button type="button" class="waybtn next" id="submit">확인</button>
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