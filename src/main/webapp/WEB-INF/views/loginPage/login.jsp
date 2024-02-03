<%@page import="java.util.List"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<link rel="stylesheet" href="/resources/css/login/login.css">
<script src="/resources/js/login/login.js"></script>
<script type="text/javascript" src="https://static.nid.naver.com/js/naverLogin_implicit-1.0.2.js" charset="utf-8"></script>

<div class="backGroundContainer">
  <ul>
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
    <div class="loginContainer" id="loginForm">
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
	  		<button class="Login google">
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
	
		<div class="loginContainer" id="signupForm">
		  <form  class="signupForm" action="/signup" method="post" autocomplete="off">
		    <h2 class="LoginHead">회원가입</h2>
		    <label class="joinlabel" for="user-idxx">아이디</label>
		    <input type="text" id="user-idxx" class="basicInput _join" name="USER_IDXX">
		    <label class="joinlabel" for="user-pass">비밀번호</label>
		    <input type="password" id="user-pass" class="basicInput _join" name="PASS_WORD">
		    <label class="joinlabel" for="user-name">이름</label>
		    <input type="text" id="user-name" class="basicInput _join" name="USER_NAME">
		    <label class="joinlabel" for="user-nick">닉네임</label>
		    <input type="text" id="user-nick" class="basicInput _join" name="USER_NICK" placeholder="게더에서 사용할 닉네임을 입력해주세요!">
		    
		    <div class="btnContainer">
			    <button type="button" class="waybtn prev" onclick="prevSection('step2')">이전</button>
			    <button type="button" class="waybtn next" onclick="nextSection('step2')">다음</button>
		    </div>
		  </form>
		</div>
	
	  <!-- Step 2: 추가 정보 입력 -->
		  <form id="step2" action="/signup" method="post">
			  <h2 class="LoginHead">회원가입 - 추가 정보 입력</h2>
			  <!-- 회원가입 폼의 필드들을 여기에 추가 -->
			  <input type="text" class="basicInput" name="additionalInfo" placeholder="Additional Info">
			  <button type="button" class="basicInput" onclick="prevSection()">Back</button>
			  <button type="button" class="basicInput" onclick="nextSection('step3')">Next</button>
		  </form>
	
	  <!-- Step 3: 회원가입 완료 -->
		  <form id="step3" action="/signup" method="post">
			  <h2 id="LoginHead">회원가입 완료</h2>
			  <p>회원가입이 완료되었습니다!</p>
			  <button type="button" onclick="prevSection()">Back</button>
		  </form>
		
		  <form id="findPwForm" action="/findPw" method="post">
			  <h2 id="LoginHead">비밀번호 찾기</h2>
			  <!-- 비번 찾기 폼의 필드들을 여기에 추가 -->
			  <input type="email" class="basicInput" name="email" placeholder="Email">
			  <button type="submit">비밀번호 찾기</button>
		  </form>

		</div>
  
</div>