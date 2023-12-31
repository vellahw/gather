<%@page import="java.util.List"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<link rel="stylesheet" href="/resources/css/login/login.css">
<script src="/resources/js/login/login.js"></script>

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
    <div class="loginContainer">
	  	<form id="loginForm" action="/gather/loginDo.com" method="post">
	  		<h2 class="LoginHead">로그인</h2>
	  		<input type="text" class="inputLogin" name="USER_IDXX" id="USER_IDXX" placeholder="아이디(이메일 형식)">
	  		<input type="password" class="inputLogin" name="PASS_WORD" id="PASS_WORD" placeholder="비밀번호">
	  		<div id="append" class="append"></div>
	  		<button class="inputLogin btn">로그인</button>
	  		<div class="additionalButtons">
	  			<button onclick="toggleForm('findIdForm')" class="findIdButton">아이디 찾기</button>
	  			<button onclick="toggleForm('findPwForm')" class="findIdButton">비밀번호 찾기</button>
	  			<button onclick="toggleForm('signupForm')" class="signupButton">회원가입</button>
	  		</div>
   		</form>
	
	  	<div class="socialButtons">
		  <div id="naverIdLogin" style="display:none;"></div>
	  	  <button id="naverLogin" class="loginButton naver">
	  	    <img class="navericon" src="/resources/img/icon/loginApi/naver.png">
	  		네이버 로그인
	  	  </button>
	  	  <button class="loginButton kakao">
	  		<img class="kakaoicon" src="/resources/img/icon/loginApi/kakao.png" alt="Kakao Icon">
	   			카카오 로그인
	  		</button>
	  		<button class="Login google">
	  			<img class="googleicon" src="/resources/img/icon/loginApi/google.png" alt="Google Icon">
	   			구글 로그인
	  		</button>
	  	</div>
		</div>

	  <div id="findIdForm"  style="display:none;">
	   <form action="/findId" method="post">
	   <h2 id="LoginHead">아이디 찾기</h2>
	   <!-- 아이디 찾기 폼의 필드들을 여기에 추가 -->
	   <input type="email" name="email" placeholder="Email">
	   <button type="submit">아이디 찾기</button>
	   </form>
	  </div>
	
	  <form id="signupForm" action="/signup" method="post"  style="display:none;">
	    <h2 class="LoginHead">회원가입</h2>
	    <!-- 회원가입 폼의 필드들을 여기에 추가 -->
	    <input type="text" name="newUsername" placeholder="New Username">
	    <input type="password" name="newPassword" placeholder="New Password">
	    <button type="button" onclick="nextSection('step2')">Next</button>
	  </form>
	
	  <!-- Step 2: 추가 정보 입력 -->
	  <form id="step2" action="/signup" method="post" style="display:none;">
	  <h2 class="LoginHead">회원가입 - 추가 정보 입력</h2>
	  <!-- 회원가입 폼의 필드들을 여기에 추가 -->
	  <input type="text" name="additionalInfo" placeholder="Additional Info">
	  <button type="button" onclick="prevSection()">Back</button>
	  <button type="button" onclick="nextSection('step3')">Next</button>
	  </form>
	
	  <!-- Step 3: 회원가입 완료 -->
	  <form id="step3" action="/signup" method="post" style="display:none;">
	  <h2 id="LoginHead">회원가입 완료</h2>
	  <p>회원가입이 완료되었습니다!</p>
	  <button type="button" onclick="prevSection()">Back</button>
	  </form>
	
	  <form id="findPwForm" action="/findPw" method="post" style="display:none;">
	  <h2 id="LoginHead">비밀번호 찾기</h2>
	  <!-- 비번 찾기 폼의 필드들을 여기에 추가 -->
	  <input type="email" name="email" placeholder="Email">
	  <button type="submit">비밀번호 찾기</button>
	  </form>
	  
  </div>
</div>