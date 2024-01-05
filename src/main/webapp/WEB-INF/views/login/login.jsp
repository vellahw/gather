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
    <div class="loginContainer">
        <!-- 로그인 폼 -->
        <form id="loginForm" action="/gather/loginDo.com" method="post">
            <h2 class="LoginHead">로그인</h2>
            <input type="text" class="inputLogin" name="USER_IDXX" id = "USER_IDXX" placeholder="ID" required>
            <input type="password" class="inputLogin" name="PASS_WORD" id = "PASS_WORD"placeholder="PASSWORD" required>
            <button type="submit" id="loginButton">Login</button>
            <div class="additionalButtons">
                <button id="toggleFormButton" onclick="toggleForm('findIdForm')" class="findIdButton">아이디찾기</button>
                <button id="toggleFormButton" onclick="toggleForm('signupForm')" class="signupButton">회원가입</button>
            </div>

            <!-- 소셜 로그인 버튼 추가 -->
            <div class="socialButtons">
                <button class="naverLogin"><img src="/resources/img/icon/loginApi/naver.png"> 네이버 로그인</button>
                <button class="kakaoLogin"><img src="path/to/kakao-icon.png" alt="Kakao Icon"> 카카오 로그인</button>
                <button class="googleLogin"><img src="path/to/google-icon.png" alt="Google Icon"> 구글 로그인</button>
            </div>
        </form>

        <!-- 회원가입 폼 -->
        <form id="signupForm" action="/signup" method="post" style="display:none;">
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

        <!-- 아이디 찾기 폼 -->
        <form id="findIdForm" action="/findId" method="post" style="display:none;">
            <h2 id="LoginHead">아이디 비밀번호 찾기</h2>
            <!-- 아이디 찾기 폼의 필드들을 여기에 추가 -->
            <input type="email" name="email" placeholder="Email">
            <button type="submit">Find ID</button>
        </form>
    </div>
</div>