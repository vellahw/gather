<%@page import="java.util.List"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<link rel="stylesheet" href="/resources/css/login/login.css">
<script src="/resources/js/login/login.js"></script>
<script src="/resources/js/login/join.js"></script>
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
	
		<div class="loginContainer" id="signupContainer">
		  <form id="signupForm" class="signupForm" method="post" autocomplete="off">
		    <h2 class="LoginHead">회원가입</h2>
		    <label class="joinlabel" for="user-idxx">아이디</label>
		    <input type="text" id="user-idxx" class="basicInput _join" name="USER_IDXX">
		    <label class="joinlabel" for="user-pass">비밀번호</label>
		    <input type="password" id="user-pass" class="basicInput _join" name="PASS_WORD">
		    <label class="joinlabel" for="user-name">이름</label>
		    <input type="text" id="user-name" class="basicInput _join" name="USER_NAME">
		    <label class="joinlabel" for="user-cell">핸드폰번호</label>
		    <input type="text" id="user-cell" class="basicInput _join" name="CELL_NUMB">
		    <div class="btnContainer">
			    <button type="button" class="waybtn prev" onclick="prevSection('step2')">이전</button>
			    <button type="button" class="waybtn next" id="next" onclick="nextSection('step2')">다음</button>
		    </div>
		  </form>
		</div>
		  
		  
		<div class="loginContainer" id="signupStep2">
		  <form method="post" action="/signup">
		    <h2 class="LoginHead">회원가입</h2>
			  <label class="joinlabel" for="user-regi">주민등록번호</label>
			  <div class="reginumbWrap">
			    <input type="text" id="user-regi" class="basicInput _join regi" name="REGI_NUMB">-
			    <input type="text" id="user-regi2" class="basicInput _join regi2" name="REGI_NUMB2">
			    <span>●●●●●●</span>
			  </div>
		    <label class="joinlabel" for="user-nick">닉네임</label>
		    <input type="text" id="user-nick" class="basicInput _join" name="USER_NICK" placeholder="게더에서 사용할 닉네임을 입력해주세요!">
			  <label class="joinlabel" for="user-self">자기소개</label>
		    <input type="text" id="user-self" class="basicInput _join" name="SELF_INTR" placeholder="취향, 가치관 등을 나타내보세요!">
		    
		    <div class="btnContainer" style="margin-top: 90px;">
			  	<button type="button" class="waybtn prev" onclick="prevSection('step3')">이전</button>
			  	<button type="button" class="waybtn next" id="next2" onclick="nextSection('step3')">다음</button>
		  	</div>
		  </form>
		</div>
		
		<div class="loginContainer" id="signupStep3">
			<div class="bubble">이대로 프로필을 생성할까요?</div>
			<div class="mypage-bg"></div>
			<div class="container" style="transform: translateY(-60px);">
				<div class="profileImgWrap pro">
					<img class="profileImg" src="/resources/img/basic/profile/profile.jpg" alt="프로필사진"/>
				</div>
				<div class="p-updateBtn">
					<img src="/resources/img/icon/pencile.png" class="p-updateIcon" alt="프사수정버튼">
				</div>
				<div>
					<p>닉네임</p>
					<p>자기소개</p>
				</div>
				
				
			</div>
		
			<div class="btnContainer" style="margin-top: 90px;">
			  <button type="button" class="waybtn prev" onclick="prevSection('step4')">이전</button>
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