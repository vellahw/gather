<%@page import="java.util.Map"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<link rel="stylesheet" href="/resources/css/mainPage/mainPage.css">
<script src="/resources/js/common/category.js"></script>
<script src="/resources/js/common/naver.js"></script>

<div class="bannerContainer">
  <img src="/resources/img/banner/banner.png" class="bannerImg">
</div>

<%@ include file="../components/category.jsp" %>

<div class="contentsContainer">
  <h1 class="areaTitle">
    <c:if test="${sUSER_NUMB != null }">
      <c:out value="${sUSER_NICK}" />님의 취향 저격 게더
      <img src="/resources/img/icon/tasteTilteIcon.png" class="areaTitleIcon" alt="타이틀 아이콘">
    </c:if>
    <c:if test="${sUSER_NUMB == null }">
	  오늘의 HOT 게더  
      <img src="/resources/img/icon/hotTitleIcon.png" class="areaTitleIcon" alt="타이틀 아이콘">
	</c:if>
  </h1>
  
	<%@ include file="../components/contents.jsp" %>
</div>

<div class="contentsContainer">
  <h1 class="areaTitle">
    <c:if test="${sUSER_NUMB != null }">
      <c:out value="${sUSER_NICK}" />님의 취향 저격 게더
      <img src="/resources/img/icon/tasteTilteIcon.png" class="areaTitleIcon" alt="타이틀 아이콘">
    </c:if>
    <c:if test="${sUSER_NUMB == null }">
	  오늘의 HOT 게더  
      <img src="/resources/img/icon/hotTitleIcon.png" class="areaTitleIcon" alt="타이틀 아이콘">
	</c:if>
  </h1>
  
	<%@ include file="../components/contents.jsp" %>
</div>

<div class="contentsContainer">
  <h1 class="areaTitle">
    <c:if test="${sUSER_NUMB != null }">
      <c:out value="${sUSER_NICK}" />님의 취향 저격 게더
      <img src="/resources/img/icon/tasteTilteIcon.png" class="areaTitleIcon" alt="타이틀 아이콘">
    </c:if>
    <c:if test="${sUSER_NUMB == null }">
	  오늘의 HOT 게더  
      <img src="/resources/img/icon/hotTitleIcon.png" class="areaTitleIcon" alt="타이틀 아이콘">
	</c:if>
  </h1>
  
	<%@ include file="../components/contents.jsp" %>
</div>
</body>