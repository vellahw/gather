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
									<div class="thumnailContainer" onclick="comWhere2Go('detail','${list.MOIM_IDXX}')">
										<img src="${list.MOIM_IMAG}" data-end="${list.ENDD_YSNO}"
											 class="thumnail"
											 alt="썸네일">
									</div>
									<div class="infoContainer">
										<h3 class="title" onclick="comWhere2Go('detail','${list.MOIM_IDXX}')">
											<c:out value="${list.MOIM_TITL}" />
										</h3>
										<div class="hashtagContainer">
											<c:choose>
												<c:when test="${fn:length(list.HASH_TAGG) != 0 }">
													<c:forEach var="hashtag" items="${list.HASH_TAGG}">
														<button type="button" class="hashtag" onclick="comWhere2Go('search','${hashtag}')">
															<c:out value="#${hashtag}" />
														</button>
													</c:forEach>
												</c:when>
												<c:otherwise>
													<div style="height: 30px;"></div>
												</c:otherwise>
											</c:choose>
										</div>
										<div class="locationDateContainer">
											<div class="locationContainer">
												<div class="tooltip">
													<img src="/resources/img/icon/locationIcon.png"
														 class="locationIcon" alt="장소 아이콘">
													<span class="location">
														<c:out value="${list.REGI_NAME}" />
													</span>
													<div class="tooltiptext">
														<c:out value="${list.PREGI_NAME}" />
													</div>
												</div>
											</div>
											<span class="dateContainer">
												<c:out value="${list.SMAL_DATE}" />
											</span>
										</div>
										<div class="userContainer">
											<div class="userProfileWrap">
												<div class="profileImgWrap">
													<img src="${list.USER_IMAG}"class="profileImg" alt="프로필사진" onclick="comWhere2Go('userPage','${list.USER_NUMB}')">
												</div>
												<span class="nickname">
													<c:out value="${list.USER_NICK}" />
												</span>
											</div>
											<div class="heartWrap">
												<input type="hidden" data-like-id="${list.MOIM_IDXX}" value="${list.LIKE_YSNO}" id="heartYN"/>
												<div class="heartContainer">
													<input class="heart-box" type="checkbox" id="${list.MOIM_IDXX}"  data-master="${list.USER_NUMB}" onchange="handleCheckboxChange(this)">
													<label class="heartIcon" for="${list.MOIM_IDXX}"></label>
													<input id="realCount" type="hidden" data-realCount-id="${list.MOIM_IDXX}" value="${list.LIKE_COUNT}" >
													<span id="showCount"class="heartCount main" data-ShowCount-id="${list.MOIM_IDXX}"></span>
												</div>
											</div>
										</div>
									</div>
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
									<div class="thumnailContainer" onclick="comWhere2Go('detail','${list.MOIM_IDXX}')">
										<img src="${list.MOIM_IMAG}" data-end="${list.ENDD_YSNO}"
											 class="thumnail"
											 alt="썸네일">
									</div>
									<div class="infoContainer">
										<h3 class="title" onclick="comWhere2Go('detail','${list.MOIM_IDXX}')">
											<c:out value="${list.MOIM_TITL}" />
										</h3>
										<div class="hashtagContainer">
											<c:choose>
												<c:when test="${fn:length(list.HASH_TAGG) != 0 }">
													<c:forEach var="hashtag" items="${list.HASH_TAGG}">
														<button type="button" class="hashtag" onclick="comWhere2Go('search','${hashtag}')">
															<c:out value="#${hashtag}" />
														</button>
													</c:forEach>
												</c:when>
												<c:otherwise>
													<div style="height: 30px;"></div>
												</c:otherwise>
											</c:choose>
										</div>
										<div class="locationDateContainer">
											<div class="locationContainer">
												<div class="tooltip">
													<img src="/resources/img/icon/locationIcon.png"
														 class="locationIcon" alt="장소 아이콘">
													<span class="location">
														<c:out value="${list.REGI_NAME}" />
													</span>
													<div class="tooltiptext">
														<c:out value="${list.PREGI_NAME}" />
													</div>
												</div>
											</div>
											<span class="dateContainer">
												<c:out value="${list.SMAL_DATE}" />
											</span>
										</div>
										<div class="userContainer">
											<div class="userProfileWrap">
												<div class="profileImgWrap">
													<img src="${list.USER_IMAG}"class="profileImg" alt="프로필사진" onclick="comWhere2Go('userPage','${list.USER_NUMB}')">
												</div>
												<span class="nickname">
													<c:out value="${list.USER_NICK}" />
												</span>
											</div>
											<div class="heartWrap">
												<input type="hidden" data-like-id="${list.MOIM_IDXX}" value="${list.LIKE_YSNO}" id="heartYN"/>
												<div class="heartContainer">
													<input class="heart-box" type="checkbox" id="${list.MOIM_IDXX}"  data-master="${list.USER_NUMB}" onchange="handleCheckboxChange(this)">
													<label class="heartIcon" for="${list.MOIM_IDXX}"></label>
													<input id="realCount" type="hidden" data-realCount-id="${list.MOIM_IDXX}" value="${list.LIKE_COUNT}" >
													<span id="showCount"class="heartCount main" data-ShowCount-id="${list.MOIM_IDXX}"></span>
												</div>
											</div>
										</div>
									</div>
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
									<div class="thumnailContainer" onclick="comWhere2Go('detail','${list.MOIM_IDXX}')">
										<img src="${list.MOIM_IMAG}" data-end="${list.ENDD_YSNO}"
											 class="thumnail"
											 alt="썸네일">
									</div>
									<div class="infoContainer">
										<h3 class="title" onclick="comWhere2Go('detail','${list.MOIM_IDXX}')">
											<c:out value="${list.MOIM_TITL}" />
										</h3>
										<div class="hashtagContainer">
											<c:choose>
												<c:when test="${fn:length(list.HASH_TAGG) != 0 }">
													<c:forEach var="hashtag" items="${list.HASH_TAGG}">
														<button type="button" class="hashtag" onclick="comWhere2Go('search','${hashtag}')">
															<c:out value="#${hashtag}" />
														</button>
													</c:forEach>
												</c:when>
												<c:otherwise>
													<div style="height: 30px;"></div>
												</c:otherwise>
											</c:choose>
										</div>
										<div class="locationDateContainer">
											<div class="locationContainer">
												<div class="tooltip">
													<img src="/resources/img/icon/locationIcon.png"
														 class="locationIcon" alt="장소 아이콘">
													<span class="location">
														<c:out value="${list.REGI_NAME}" />
													</span>
													<div class="tooltiptext">
														<c:out value="${list.PREGI_NAME}" />
													</div>
												</div>
											</div>
											<span class="dateContainer">
												<c:out value="${list.SMAL_DATE}" />
											</span>
										</div>
										<div class="userContainer">
											<div class="userProfileWrap">
												<div class="profileImgWrap">
													<img src="${list.USER_IMAG}"class="profileImg" alt="프로필사진" onclick="comWhere2Go('userPage','${list.USER_NUMB}')">
												</div>
												<span class="nickname">
													<c:out value="${list.USER_NICK}" />
												</span>
											</div>
											<div class="heartWrap">
												<input type="hidden" data-like-id="${list.MOIM_IDXX}" value="${list.LIKE_YSNO}" id="heartYN"/>
												<div class="heartContainer">
													<input class="heart-box" type="checkbox" id="${list.MOIM_IDXX}"  data-master="${list.USER_NUMB}" onchange="handleCheckboxChange(this)">
													<label class="heartIcon" for="${list.MOIM_IDXX}"></label>
													<input id="realCount" type="hidden" data-realCount-id="${list.MOIM_IDXX}" value="${list.LIKE_COUNT}" >
													<span id="showCount"class="heartCount main" data-ShowCount-id="${list.MOIM_IDXX}"></span>
												</div>
											</div>
										</div>
									</div>
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
									<div class="thumnailContainer" onclick="comWhere2Go('detail','${list.MOIM_IDXX}')">
										<img src="${list.MOIM_IMAG}" data-end="${list.ENDD_YSNO}"
											 class="thumnail"
											 alt="썸네일">
									</div>
									<div class="infoContainer">
										<h3 class="title" onclick="comWhere2Go('detail','${list.MOIM_IDXX}')">
											<c:out value="${list.MOIM_TITL}" />
										</h3>
										<div class="hashtagContainer">
											<c:choose>
												<c:when test="${fn:length(list.HASH_TAGG) != 0 }">
													<c:forEach var="hashtag" items="${list.HASH_TAGG}">
														<button type="button" class="hashtag" onclick="comWhere2Go('search','${hashtag}')">
															<c:out value="#${hashtag}" />
														</button>
													</c:forEach>
												</c:when>
												<c:otherwise>
													<div style="height: 30px;"></div>
												</c:otherwise>
											</c:choose>
										</div>
										<div class="locationDateContainer">
											<div class="locationContainer">
												<div class="tooltip">
													<img src="/resources/img/icon/locationIcon.png"
														 class="locationIcon" alt="장소 아이콘">
													<span class="location">
														<c:out value="${list.REGI_NAME}" />
													</span>
													<div class="tooltiptext">
														<c:out value="${list.PREGI_NAME}" />
													</div>
												</div>
											</div>
											<span class="dateContainer">
												<c:out value="${list.SMAL_DATE}" />
											</span>
										</div>
										<div class="userContainer">
											<div class="userProfileWrap">
												<div class="profileImgWrap">
													<img src="${list.USER_IMAG}"class="profileImg" alt="프로필사진" onclick="comWhere2Go('userPage','${list.USER_NUMB}')">
												</div>
												<span class="nickname">
													<c:out value="${list.USER_NICK}" />
												</span>
											</div>
											<div class="heartWrap">
												<input type="hidden" data-like-id="${list.MOIM_IDXX}" value="${list.LIKE_YSNO}" id="heartYN"/>
												<div class="heartContainer">
													<input class="heart-box" type="checkbox" id="${list.MOIM_IDXX}"  data-master="${list.USER_NUMB}" onchange="handleCheckboxChange(this)">
													<label class="heartIcon" for="${list.MOIM_IDXX}"></label>
													<input id="realCount" type="hidden" data-realCount-id="${list.MOIM_IDXX}" value="${list.LIKE_COUNT}" >
													<span id="showCount"class="heartCount main" data-ShowCount-id="${list.MOIM_IDXX}"></span>
												</div>
											</div>
										</div>
									</div>
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