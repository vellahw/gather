<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<script src="/resources/js/common/category.js"></script>
<link rel="stylesheet" href="/resources/css/common/category.css">

<div class="categoryContainer" id="categoryContainer">
    <div class="categoryList">
        <div class="categoryItem" onClick="cateOnclick('all');" data-code="all">
            <div class="categoryLink" >전체</div>
        </div>

        <c:forEach var="parentsCate" items="${pCate}">
            <c:set var="parentsCode" value="${parentsCate.CATE_CODE}" />
            <input id="pcode" type="hidden" value="${parentsCate.CATE_CODE}"/>
            <div class="categoryItem" data-code="${parentsCode}">
            <div class="categoryLink" onClick="cateOnclick('${parentsCode}');">
                <img src="${parentsCate.IMAG_SRCC}" class="categoryIcon" alt="카테고리 이미지"/>
                <c:out value="${parentsCate.CATE_NAME}"/>
            </div>
                <div class="childCateListWrap">
                    <ul class="childCateList">
                        <c:forEach var="childCate" items="${cCate}">
                            <c:set var="childCode" value="${childCate.PARENTS_CODE}" />
                            <input id="ccode"type="hidden" value="${childCate.CATE_CODE}"/>
                            <c:if test="${parentsCode == childCode}">
                                <li class="childCateItem" data-code2="${childCate.CATE_CODE}" onClick="cateOnclick('${childCate.CATE_CODE}');">
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