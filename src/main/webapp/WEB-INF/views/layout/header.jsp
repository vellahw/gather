<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<nav class="nav">
  <div class="leftContainer">
    <div  class="logoContainer">
      <img class="logo" src="/resources/img/logo/logo.png" alt="로고">
    </div>
    <div class="menuContainer">
      <ul class="menu">
        <li class="menuItem">게더</li>
        <li class="menuItem">클럽</li>
        <li class="menuItem">챌린지</li>
        <li class="menuItem">피드</li>
      </ul>
    </div>
  </div>
  <div class="rightContainer">
    <div class="searchContainer">
      <input type="text" class="searchBox" placeholder="관심사, 해시태그, 회원명을 검색해주세요!">
      <button type="submit" class="searchBtn" >
        <img class="searchIcon" src="/resources/img/icon/navbar/searchIcon.png" alt="검색버튼">
      </button>
    </div>
    <div class="userContainer">
      <div class="iconContainer">
        <a class="iconLink">
        <img class="icon" src="/resources/img/icon/navbar/logoutIcon.png" alt="로그아웃 아이콘">
        <span class="text">Login</span>
        </a>
      </div>
      <div class="iconContainer">
        <a class="iconLink">
          <img class="icon" src="/resources/img/icon/navbar/helpIcon.png" alt="고객센터">
          <span class="text">Help</span>
        </a>
      </div>
    </div>
  </div>
</nav>