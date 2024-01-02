<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<div class="categoryContainer" id="categoryContainer">
  <div class="categoryList">
    <div class="categoryItem">
      <a href="#" class="categoryLink">전체</a>
    </div>

    <c:forEach var="pCate" items="${pCate}">
      <c:set var="parentsCode" value="${pCate.CATE_CODE}" />
      
          <img src="/resources/img/icon/category/sp.png" class="categoryIcon" alt="카테고리 이미지"/>
          ${pCate.CATE_NAME}
          <ul>
          <c:forEach var="cCate" items="${cCate}">
           <c:set var="childCode" value="${cCate.PARENTS_CODE}" />
           <c:if test = "${parentsCode == childCode}">
            <li>${cCate.CATE_NAME}</li>
          </c:if>
          </c:forEach>
          </ul>
    </c:forEach>
  </div>
</div>