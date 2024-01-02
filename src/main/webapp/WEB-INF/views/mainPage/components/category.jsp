<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<div class="categoryContainer" id="categoryContainer">
  <div class="categoryList">
    <div class="categoryItem">
      <a href="#" class="categoryLink">전체</a>
    </div>

    <c:forEach var="categoryList" items="${category}">
      <c:set var="childCodes" value="${categoryList.CHILD_CODE}" />
      <c:set var="parentsCode" value="${categoryList.PARENTS_CODE}" />
      <c:set var="getParentsCode" value="${fn:substring(categoryList.CHILD_CODE, 0, 1)}" />
      <c:set var="length" value="${fn:length(childCodes)}" />
      
      <!-- 부모 카테를 뽑은 조건 -->
      <c:if test="${childCodes == parentsCode}">
        <div class="categoryItem">
          <a href="${categoryList.CATE_PATH}" class="categoryLink">
            <img src="/resources/img/icon/category/sp.png" class="categoryIcon" alt="카테고리 이미지">
  	        ${categoryList.CHILD_CATE}
          </a>
        </div>
      </c:if>
    </c:forEach>
  </div>
</div>