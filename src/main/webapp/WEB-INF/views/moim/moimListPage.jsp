<%@page import="java.util.Map"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<link rel="stylesheet" href="/resources/css/listPage/listSorting.css">
<link rel="stylesheet" href="/resources/css/common/card.css">
<script src="/resources/js/listPage/listPage.js"></script>

<div class="bannerContainer">
  <img src="/resources/img/banner/banner.png" class="bannerImg">
</div>

<%@ include file="../components/category.jsp"%>

<div class="contentsContainer">
  <div class="contentsHeader">
	  <h1 class="areaTitle">
	  	<c:if test="${CATE_NAME ne null}">
		  <c:out value="${CATE_NAME}" />
		</c:if>
		<c:if test="${KEYY_WORD ne null}">
		  <span style = "color:#fd8731; font-weight: bold">'${KEYY_WORD}'&nbsp;</span><span>의 검색 결과</span>
		</c:if>
	  </h1>
	  <% if(session.getAttribute("USER_NUMB") != null) { %>
	    <button type="button" class="moimRegiBtn" onclick="comWhere2Go('makeMoim')">
	    	<c:out value="${MOIM_TYPE}"/> 개설하기
	    </button>
	  <% } %>
  </div>
	<c:choose>
  	<c:when test="${fn:length(list) > 0 }">
			<div class="contentsList">
				<c:forEach var="list" items="${list}">
					<div class="Contents">
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
											<img src="${list.USER_IMAG}"
								  					class="profileImg" alt="프로필사진">
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
				</c:forEach>
			</div>
		</c:when>
		<c:otherwise>
		 	<div class="none">조회된 결과가 없습니다.</div>
		</c:otherwise>
	</c:choose>
</div>

<div class="page_wrap">
	<div class="page_nation">
		<ul>
			<c:if test="${pageMaker.prev}">
				<li class="arrow prev">
					<a href="${pageMaker.startPage - 1 }"></a>
				</li>
			</c:if>

			<c:forEach var="num" begin="${pageMaker.startPage}" end="${pageMaker.endPage}">
				<li ${pageMaker.cri.pageNum == num ? "active":""}>
					<c:if test="${CATE_IDXX ne null and MOIM_TYPE eq null}">
						<a href="/gatherList.com?cate=${CATE_IDXX}&pageNum=${num}"<c:if test="${pageMaker.cri.pageNum == num}">class="act"</c:if>>${num}</a>
					</c:if>
					<c:if test="${CATE_IDXX ne null and MOIM_TYPE ne null}">
						<a href="/gatherList.com?type=${MOIM_TYPE}&cate=${CATE_IDXX}&pageNum=${num}"<c:if test="${pageMaker.cri.pageNum == num}">class="act"</c:if>>${num}</a>
					</c:if>
					<c:if test="${KEYY_WORD ne null and MOIM_TYPE eq null}">
						<a href="/gatherList.com?keyword=${KEYY_WORD}&pageNum=${num}"<c:if test="${pageMaker.cri.pageNum == num}">class="act"</c:if>>${num}</a>
					</c:if>
					<c:if test="${KEYY_WORD ne null and MOIM_TYPE ne null}">
						<a href="/gatherList.com?type=${MOIM_TYPE}&keyword=${KEYY_WORD}&pageNum=${num}"<c:if test="${pageMaker.cri.pageNum == num}">class="act"</c:if>>${num}</a>
					</c:if>
				</li>
			</c:forEach>

			<c:if test="${pageMaker.next}">
				<li class="arrow next">
					<a href="${pageMaker.endPage + 1 }"></a>
				</li>
			</c:if>
		</ul>
	</div>
</div>

<div>
</div>
</body>