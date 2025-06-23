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
				<c:if test="${CATE_IMGG ne null}">
					<img src="${CATE_IMGG}" class="listCategoryIcon" alt="카테고리 이미지"/>
				</c:if>
				<c:out value="${CATE_NAME}" />
			</c:if>
			<c:if test="${KEYY_WORD ne null}">
				<span style = "color:#fd8731; font-weight: bold">'${KEYY_WORD}'&nbsp;</span><span>의 검색 결과</span>
			</c:if>
		</h1>
		<% if(session.getAttribute("USER_NUMB") != null) { %>
		<button type="button" class="moimRegiBtn" onclick="comWhere2Go('makeMoim')">
			<c:out value="${MOIM_TYPE_KR}"/> 개설하기
		</button>
		<% } %>
	</div>
	<c:choose>
		<c:when test="${fn:length(list) > 0 }">
			<div class="contentsList">
				<c:forEach var="list" items="${list}">
					<div class="Contents">
						<%@ include file="../components/contents.jsp"%>
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