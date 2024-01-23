<%@page import="java.util.Map"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<link rel="stylesheet" href="/resources/css/listPage/listSorting.css">
<link rel="stylesheet" href="/resources/css/mainPage/mainSorting.css">
<link rel="stylesheet" href="/resources/css/common/card.css">
<script src="/resources/js/common/like.js"></script>
<script src="/resources/js/mainPage/asyncMoim.js"></script>
<script src="/resources/js/mainPage/mainPage.js"></script>

<div class="bannerContainer">
  <img src="/resources/img/banner/banner.png" class="bannerImg">
</div>

<%@ include file="../components/category.jsp"%>

<c:if test="${USER_NUMB != null}">
	<c:import url="../components/contents.jsp">
	    <c:param name="type" value="Taste" />
	    <c:param name="title" value="${USER_NICK}님의 취향 저격 ${moimType}" />
	    <c:param name="titleIcon" value="tasteTitleIcon" />
	</c:import>

	<c:import url="../components/contents.jsp">
	    <c:param name="type" value="Region" />
	    <c:param name="title" value="${USER_NICK}님 근처의  ${moimType}" />
	    <c:param name="titleIcon" value="tasteTitleIcon" />
 	</c:import>

</c:if>

<div class="contentsContainer mainContainer">
  <div id="weatherSection">
  	<h1 id="weatherTitle" class="mainAreaTitle">
  	</h1>
		<div class="slideWrap">
  	  <div class="slideContainer">
			  <button type="button" class="arrowBtn left" id="leftBtn"></button>
			  <button type="button" class="arrowBtn right" id="rigthBtn"></button>
			  <div class="slideList"  id="weatherList">
			  </div>
		  </div>
	  </div>
	</div>
</div>

<c:if test="${USER_NUMB == null}">
	<div class="contentsContainer mainContainer">
	  <div id="weatherSection">
	  	<h1 id="regionTitle" class="mainAreaTitle"></h1>
				<div class="slideWrap">
	  	  	<div class="slideContainer">
				  	<button type="button" class="arrowBtn left" id="leftBtn"></button>
				  	<button type="button" class="arrowBtn right" id="rigthBtn"></button>
				  	<div class="slideList" id="regionList">
				  	</div>
			  	</div>
				</div>	
		</div>
	</div>
</c:if>

<c:import url="../components/contents.jsp">
  <c:param name="type" value="Hot" />
  <c:param name="title" value="자리가 얼마 남지 않았어요!" />
  <c:param name="titleIcon" value="hotTitleIcon" />
</c:import>

<c:import url="../components/contents.jsp">
  <c:param name="type" value="Like" />
  <c:param name="title" value="좋아요가 많은 ${moimType}" />
  <c:param name="titleIcon" value="hotTitleIcon" />
</c:import>
</body>