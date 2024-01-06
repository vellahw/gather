<%@page import="java.util.Map"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<link rel="stylesheet" href="/resources/css/mainPage/mainPage.css">
<script src="/resources/js/common/category.js"></script>
<script type="text/javascript">
var naver_id_login = new naver_id_login("imq4BJkILgfjUij4Rw1W", "/gather/naverLoginDo.com");
  // 접근 토큰 값 출력
  //alert(naver_id_login.oauthParams.access_token);
  // 네이버 사용자 프로필 조회
  naver_id_login.get_naver_userprofile("naverSignInCallback()");
  // 네이버 사용자 프로필 조회 이후 프로필 정보를 처리할 callback function
  function naverSignInCallback() {
    //alert(naver_id_login.getProfileData('email'));
    //alert(naver_id_login.getProfileData('nickname'));
   // alert(naver_id_login.getProfileData('age'));
  }
</script>

<div class="bannerContainer">
  <img src="/resources/img/banner/banner.png" class="bannerImg">
</div>


<%@ include file="../components/category.jsp" %>

<div class="contentsContainer">
  <h1 class="areaTitle">
    <c:if test="${USER_NUMB != null }">
      <c:out value="${USER_NICK}" />님의 취향 저격 게더
      <img src="/resources/img/icon/tasteTilteIcon.png" class="areaTitleIcon" alt="타이틀 아이콘">
    </c:if>
    <c:if test="${USER_NUMB == null }">
	  오늘의 HOT 게더  
      <img src="/resources/img/icon/hotTitleIcon.png" class="areaTitleIcon" alt="타이틀 아이콘">
	</c:if>
  </h1>
  
  <%@ include file="../components/contents.jsp" %>
</div>
</body>