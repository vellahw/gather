<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<div class="categoryContainer" id="categoryContainer">
  <div class="categoryList">
    <div class="categoryItem">
      <a href="#" class="categoryLink">전체</a>
    </div>

    <c:forEach var="parentsCate" items="${pCate}">
      <c:set var="parentsCode" value="${parentsCate.CATE_CODE}" />
      <div class="categoryItem" data-code="${parentsCode}">
        <a href='./gather.com?cate=<c:out value="${parentsCate.CATE_CODE}"/>' class="categoryLink">
          <img src="${parentsCate.IMAG_SRCC}" class="categoryIcon" alt="카테고리 이미지"/>
          <c:out value="${parentsCate.CATE_NAME}"/>
        </a>
        <div class="childCateListWrap">
        <ul class="childCateList">
          <c:forEach var="childCate" items="${cCate}">
            <c:set var="childCode" value="${childCate.PARENTS_CODE}" />
            <c:if test = "${parentsCode == childCode}">
              <li class="childCateItem">
                <c:out value="${childCate.CATE_NAME}" />
              </li>
            </c:if>
          </c:forEach>
        </ul>
        </div>
        
      </div>
    </c:forEach>
  </div>
</div>