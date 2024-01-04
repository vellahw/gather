<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<nav class="nav">
  <div class="leftContainer">
    <div class="logoContainer" id="logoContainer">
      <img class="logo" src="/resources/img/logo/logo.png" alt="로고">
    </div> 
    <div class="menuContainer">
      <ul class="menu">
        <li class="menuItem" onClick="menuOnClick('gt')">게더</li>
        <li class="menuItem" onClick="menuOnClick('cb')">클럽</li>
        <li class="menuItem" onClick="menuOnClick('cg')">챌린지</li>
        <li class="menuItem" onClick="menuOnClick('fd')">피드</li>
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
    <div class="userWrap">
      <div class="iconContainer mypage">
        <div class="profileImgWrap">
          <img src="${USER_IMAG}" class="profileImg" alt="프로필사진">
        </div>
      </div>
      <div class="iconContainer">
        <div class="textWrap" id="login">로그인</div>
      </div>
      <div class="iconContainer">
        <div class="textWrap">고객센터</div>
      </div>
    </div>
  </div>
</nav>