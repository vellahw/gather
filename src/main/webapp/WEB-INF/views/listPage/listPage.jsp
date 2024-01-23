<%@page import="java.util.Map"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<link rel="stylesheet" href="/resources/css/listPage/listSorting.css">
<link rel="stylesheet" href="/resources/css/common/card.css">
<script src="/resources/js/listPage/listPage.js"></script>
<script src="/resources/js/common/like.js"></script>

<div class="bannerContainer">
  <img src="/resources/img/banner/banner.png" class="bannerImg">
</div>

<%@ include file="../components/category.jsp"%>

<div class="contentsContainer">
  <div class="contentsWrap">
	  <h1 class="areaTitle">
		  <c:out value="${CATE_NAME}" />
		  <span class="moimMakeArea">
		    <button type="button" class="hashtag"><c:out value="${moimType}" /> 만들기</button>
		  </span>	  
	  </h1>
  </div>
	<c:choose>
  	<c:when test="${fn:length(list) > 0 }">
			<div class="contentsList">
				<c:forEach var="list" items="${list}">
					<div class="Contents">
						<div class="eachWrap">
							<div class="thumnailContainer" onclick="goDetail('${list.MOIM_IDXX}')">
								<img src="${list.MOIM_IMAG}" class="thumnail" alt="썸네일">
							</div>
							<div class="infoContainer">
								<h3 class="title" onclick="goDetail('${list.MOIM_IDXX}')">${list.MOIM_TITL}</h3>
								<div class="hashtagContainer">
									<!-- 해시태그 -->
									<button type="button" class="hashtag">#전시회</button>
									<button type="button" class="hashtag">#같이가요</button>
								</div>
								<div class="locationDateContainer">
									<div class="locationContainer">
										<div class="tooltip">
											<img src="/resources/img/icon/locationIcon.png"
							 		   				class="locationIcon" alt="장소 아이콘">
								 			<span class="location">${list.REGI_NAME}</span>
											<div class="tooltiptext">${list.PREGI_NAME}</div>
										</div>
									</div>
									<span class="dateContainer">
										${list.SMAL_DATE}
									</span>
								</div>
								<div class="userContainer">
									<div class="userProfileWrap">
										<div class="profileImgWrap">
											<img src="${list.USER_IMAG}"
								  					class="profileImg" alt="프로필사진">
										</div>
										<span class="nickname">${list.USER_NICK}</span>
									</div>
									<div class="heartWrap">
										<input type="hidden" data-like-id="${list.MOIM_IDXX}" value="${list.LIKE_YSNO}" id="heartYN"/>
										<div class="heartContainer">
											<input type="checkbox" id="${list.MOIM_IDXX}" onchange="handleCheckboxChange(this)">
											<label for="${list.MOIM_IDXX}"></label>
											<span class="heartCount main" data-count-id="${list.MOIM_IDXX}">${list.LIKE_COUNT}</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</c:forEach>
			</div>
		</c:when>
		<c:otherwise>
		 	<div class="none">조회된 결과가 없습니다.</div>
		</c:otherwise>
	</c:choose>
</div>
</body>