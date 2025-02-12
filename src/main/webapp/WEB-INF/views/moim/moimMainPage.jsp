<%@page import="java.util.Map"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<link rel="stylesheet" href="/resources/css/listPage/listSorting.css">
<link rel="stylesheet" href="/resources/css/mainPage/mainSorting.css">
<link rel="stylesheet" href="/resources/css/common/card.css">
<script src="/resources/js/mainPage/asyncMoim.js"></script>
<script src="/resources/js/mainPage/mainPage.js"></script>
<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=d204e67062ee2684baf0eaa95db96a85&libraries=services"></script>

<div class="bannerContainer">
	<img src="/resources/img/banner/banner.png" class="bannerImg">
</div>

<%@ include file="../components/category.jsp"%>

<div class="contentsContainer mainContainer" data-type="Taste">
	<div class="contentsWrap">
		<h1 class="mainAreaTitlegr">
			<c:out value="${USER_NICK}님의 취향 저격 ${moimType}" />
			<img src="/resources/img/icon/tasteTitleIcon.png" class="areaTitleIcon" alt="타이틀 아이콘">
		</h1>
		<div class="slideWrap">
			<div class="slideContainer">
				<button type="button" class="arrowBtn left" id="leftBtn"></button>
				<button type="button" class="arrowBtn right" id="rigthBtn"></button>
				<div class="slideList">
					<c:forEach var="list" items="${tasteList}">
					<c:if test="${fn:length(list) > 0}">
						<div class="slideContents">
							<div class="eachWrap">
								<%@ include file="../components/contents.jsp"%>
							</div>
							</c:if>
							<c:if test="${fn:length(list) == 0}">
								<div class="none">조회된 결과가 없습니다!</div>
							</c:if>
							</c:forEach>
						</div>
				</div>
			</div>
		</div>
	</div>

	<div class="contentsContainer mainContainer"  data-type="Region">
		<div class="contentsWrap">
			<h1 class="mainAreaTitle">
				<c:out value="$${USER_NICK}님 근처의  ${moimType}" />
			</h1>
			<div class="slideWrap">
				<div class="slideContainer">
					<button type="button" class="arrowBtn left" id="leftBtn"></button>
					<button type="button" class="arrowBtn right" id="rigthBtn"></button>
					<div class="slideList">
						<c:forEach var="list" items="${regionList}">
							<c:if test="${fn:length(list) > 0}">
								<div class="slideContents">
									<div class="eachWrap">
										<%@ include file="../components/contents.jsp"%>
									</div>
								</div>
							</c:if>
							<c:if test="${fn:length(list) == 0}">
								<div class="none">조회된 결과가 없습니다!</div>
							</c:if>
						</c:forEach>
					</div>
				</div>
			</div>
		</div>
	</div>



<%-- 날씨 추천 게더 --%>
	<div class="contentsContainer mainContainer" data-id="weatherList">
		<div id="weatherSection">
			<h1 id="weatherTitle" class="mainAreaTitle">
				<span class="tempArea">
				</span>
			</h1>
			<div class="slideWrap">
				<div class="slideContainer">
					<button type="button" class="arrowBtn left" id="leftBtn"></button>
					<button type="button" class="arrowBtn right" id="rigthBtn"></button>
					<div class="slideList" id="weatherList">
					</div>
				</div>
			</div>
		</div>
	</div>

	<%-- 근처의 게더 --%>
	<div class="contentsContainer mainContainer" data-id="regionList">
		<div id="regionSection">
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
	<div class="contentsContainer mainContainer"  data-type="Hot">
		<div class="contentsWrap">
			<h1 class="mainAreaTitle">
				<c:out value="자리가 얼마 남지 않았어요!" />
				<img src="/resources/img/icon/runIcon.png" class="areaTitleIconhot" alt="타이틀 아이콘">
			</h1>
			<div class="slideWrap">
				<div class="slideContainer">
					<button type="button" class="arrowBtn left" id="leftBtn"></button>
					<button type="button" class="arrowBtn right" id="rigthBtn"></button>
					<div class="slideList">
						<c:forEach var="list" items="${hotList}">
							<c:if test="${fn:length(list) > 0}">
								<div class="slideContents">
									<div class="eachWrap">
										<%@ include file="../components/contents.jsp"%>
									</div>
								</div>
							</c:if>
							<c:if test="${fn:length(list) == 0}">
								<div class="none">조회된 결과가 없습니다!</div>
							</c:if>
						</c:forEach>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="contentsContainer mainContainer"  data-type="Like">
		<div class="contentsWrap">
			<h1 class="mainAreaTitle">
				<c:out value="좋아요가 많은 ${moimType}" />
				<img src="/resources/img/icon/hotTitleIcon.png" class="areaTitleIcon" alt="타이틀 아이콘">
			</h1>
			<div class="slideWrap">
				<div class="slideContainer">
					<button type="button" class="arrowBtn left" id="leftBtn"></button>
					<button type="button" class="arrowBtn right" id="rigthBtn"></button>
					<div class="slideList">
						<c:forEach var="list" items="${likeList}">
							<c:if test="${not empty likeList}">
								<div class="slideContents">
									<div class="eachWrap">
										<%@ include file="../components/contents.jsp"%>
									</div>
								</div>
							</c:if>
							<c:if test="${empty likeList}">
								<div class="none">조회된 결과가 없습니다!</div>
							</c:if>
						</c:forEach>
					</div>
				</div>
			</div>
		</div>
	</div>
	</body>