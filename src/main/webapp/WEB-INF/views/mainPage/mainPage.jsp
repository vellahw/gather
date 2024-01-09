<%@page import="java.util.Map"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<link rel="stylesheet" href="/resources/css/mainPage/mainPage.css">
<script src="/resources/js/common/category.js"></script>
<script src="/resources/js/common/naver.js"></script>

<div class="bannerContainer">
	<img src="/resources/img/banner/banner.png" class="bannerImg">
</div>

<%@ include file="../components/category.jsp"%>

	<c:if test="${sUSER_NUMB != null}">
		<div class="contentsContainer">
			<h1 class="areaTitle">
				<c:out value="${sUSER_NICK}" /> 님의 취향 저격 <c:out value="${moimType}"/>
				<img src="/resources/img/icon/tasteTilteIcon.png"class="areaTitleIcon" alt="타이틀 아이콘">
			</h1>
			<div class="slideContentsWrap">
				<button type="submit" class="arrowBtn left">
					<img src="/resources/img/icon/arrowL.png" class="arrowLIcon"
						alt="left arrow">
				</button>
			
			<c:forEach var="list" items="${main}">
				<c:if test="${list.TYPE == 'Taste'}">
					<%@ include file="../components/contents.jsp"%>
				</c:if>
			</c:forEach>
				<button type="submit" class="arrowBtn right">
	   				 <img src="/resources/img/icon/arrowR.png" class="arrowLIcon" alt="right arrow">
	  			</button>
			</div>
		</div>
	</c:if>

		<div class="contentsContainer">
			<h1 class="areaTitle">
				오늘의 HOT <c:out value="${moimType}" />
				<img src="/resources/img/icon/hotTitleIcon.png" class="areaTitleIcon" alt="타이틀 아이콘">
			</h1>
			<div class="slideContentsWrap">
				<button type="submit" class="arrowBtn left">
					<img src="/resources/img/icon/arrowL.png" class="arrowLIcon"
						alt="left arrow">
				</button>
			<c:forEach var="list" items="${main}">
				<c:if test="${list.TYPE == 'Hot'}">
					<%@ include file="../components/contents.jsp"%>
				</c:if>
			</c:forEach>
				<button type="submit" class="arrowBtn right">
	   				 <img src="/resources/img/icon/arrowR.png" class="arrowLIcon" alt="right arrow">
	  			</button>
			</div>
		</div>
	
	<div class="contentsContainer">
			<h1 class="areaTitle">
				좋아요가 가장 많은 <c:out value="${moimType}" />
				<img src="/resources/img/icon/hotTitleIcon.png" class="areaTitleIcon" alt="타이틀 아이콘">
			</h1>
			<div class="slideContentsWrap">
				<button type="submit" class="arrowBtn left">
					<img src="/resources/img/icon/arrowL.png" class="arrowLIcon"
						alt="left arrow">
				</button>
			<c:forEach var="list" items="${main}">
				<c:if test="${list.TYPE == 'Like'}">
					<%@ include file="../components/contents.jsp"%>
				</c:if>
			</c:forEach>
				<button type="submit" class="arrowBtn right">
	   				 <img src="/resources/img/icon/arrowR.png" class="arrowLIcon" alt="right arrow">
	  			</button>
			</div>
		</div>
	
	<c:if test = "${sUSER_NUMB != null}" >
		<div class="contentsContainer">
			<h1 class="areaTitle">
				<c:out value="${sUSER_NICK}" />	님 근처의<c:out value="${moimType}"/>
				<!-- 타이틀 -->
				<img src="/resources/img/icon/tasteTilteIcon.png"class="areaTitleIcon" alt="타이틀 아이콘">
			</h1>
			<div class="slideContentsWrap">
				<button type="submit" class="arrowBtn left">
					<img src="/resources/img/icon/arrowL.png" class="arrowLIcon"
						alt="left arrow">
				</button>
			<c:forEach var="list" items="${main}">
				<c:if test="${list.TYPE == 'Region'}">
					<%@ include file="../components/contents.jsp"%>
				</c:if>
			</c:forEach>
				<button type="submit" class="arrowBtn right">
	   				 <img src="/resources/img/icon/arrowR.png" class="arrowLIcon""C:/Users/SAMSUNG/Desktop/STS.exe.lnk" alt="right arrow">
	  			</button>
			</div>
		</div>
	 </c:if>

</body>