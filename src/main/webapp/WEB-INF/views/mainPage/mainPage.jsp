<%@page import="java.util.Map"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<link rel="stylesheet" href="/resources/css/mainPage/mainPage.css">
<script src="/resources/js/common/category.js"></script>
<script src="/resources/js/common/naver.js"></script>
<script src="/resources/js/mainPage/mainPage.js"></script>

<div class="bannerContainer">
  <img src="/resources/img/banner/banner.png" class="bannerImg">
</div>

<%@ include file="../components/category.jsp"%>

<c:if test="${sUSER_NUMB != null}">
  <c:import url="../components/contents.jsp">
    <c:param name="type" value="Taste" />
    <c:param name="title" value="${sUSER_NICK}님의 취향 저격 ${moimType}" />
    <c:param name="titleIcon" value="tasteTitleIcon" />
  </c:import>
</c:if>

<c:if test = "${sUSER_NUMB != null}" >
  <c:import url="../components/contents.jsp">
    <c:param name="main" value="${main}" />
    <c:param name="type" value="Region" />
    <c:param name="title" value="어디에서 ${moimType} 할까?" />
    <c:param name="titleIcon" value="" />
  </c:import>
</c:if>

<c:import url="../components/contents.jsp">
  <c:param name="type" value="Hot" />
  <c:param name="title" value="마감이 얼마 남지 않았어요!" />
  <c:param name="titleIcon" value="hotTitleIcon" />
</c:import>

<c:import url="../components/contents.jsp">
  <c:param name="type" value="Like" />
  <c:param name="title" value="좋아요가 많은 ${moimType}" />
  <c:param name="titleIcon" value="hotTitleIcon" />
</c:import>

</body>