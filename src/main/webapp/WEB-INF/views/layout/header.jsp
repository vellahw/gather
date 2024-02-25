<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<nav class="nav">
  <div class="leftContainer">
    <div class="logoContainer" id="logoContainer">
      <img class="logo" src="/resources/img/logo/logo.png" alt="로고">
    </div> 
    <div class="menuContainer">
      <ul class="menu">
        <li class="menuItem" onclick="menuOnClick('gt')">게더</li>
        <li class="menuItem" onclick="menuOnClick('cb')">클럽</li>
        <li class="menuItem" onclick="menuOnClick('ch')">챌린지</li>
        <li class="menuItem" onclick="menuOnClick('fd')">피드</li>
      </ul>
    </div>
  </div>
  <div class="rightContainer">
  		<form action="/gather.com" method="get">	
    		<div class="searchContainer">
	    	<input type="text" name="keyword" class="searchBox" placeholder="관심사, 해시태그, 회원명을 검색해주세요!">
	      	<button type="submit" class="searchBtn" >
	        	<img class="searchIcon" src="/resources/img/icon/navbar/searchIcon.png" alt="검색버튼">
	      	</button>
    		</div>
    	</form>
    <div class="userWrap">
      <c:if test="${USER_NUMB != null }">
        <div class="iconContainer mypage">
          <div class="profileImgWrap">
            <img src="${USER_IMAG}" class="profileImg" alt="프로필사진" onclick="comWhere2Go('userPage','${USER_NUMB}')">
          </div>
        </div>
        <div class="iconContainer">
          <div onclick="logoutOnclick()" class="textWrap">로그아웃</div>
        </div>
      </c:if>
      <c:if test="${USER_NUMB == null }">
        <div class="iconContainer login">
          <div class="textWrap" onclick="loginOnClick()">로그인</div>
        </div>
      </c:if>
      <div class="iconContainer">
        <div class="textWrap">고객센터</div>
      </div>
    </div>
  </div>
</nav>