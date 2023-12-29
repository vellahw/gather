<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<div class="categoryContainer" id="categoryContainer">
  <div class="categoryList">
    <div class="categoryItem">
      <a href="#" class="categoryLink">전체</a>
    </div>
    <c:forEach var="cateory" items="${menu}">
      <c:set var="childCodes" value="${cateory.CHILD_CODE}" />
      <c:set var="length" value="${fn:length(childCodes)}" />
      <c:if test="${length == 1}">
        <div class="categoryItem">
          <a href="${cateory.CATE_PATH}" class="categoryLink">
            <img src="/resources/img/icon/category/sp.png" class="categoryIcon" alt="카테고리 이미지">
    	    ${cateory.CHILD_CATE}
          </a>
        </div>
      </c:if>
    </c:forEach>
  </div>
</div>
