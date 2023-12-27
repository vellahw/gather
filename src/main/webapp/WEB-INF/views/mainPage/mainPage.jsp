<%@page import="java.util.Map"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
  pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<link rel="stylesheet" href="/resources/css/mainPage/mainPage.css">
<script src="/resources/js/mainPage/mainPage.js"></script>

<div class="bannerContainer">
  <img src="/resources/img/banner/banner.png" class="bannerImg">
</div>

<div class="categoryContainer" id="categoryContainer">
  <ul class="categoryList">
  <li class="categoryItem">
    <a href="#" class="categoryLink">전체</a>
  </li>
  <li class="categoryItem">
    <a href="#" class="categoryLink">
    <img src="/resources/img/icon/category/sp.png" class="categoryIcon" alt="카테고리 이미지">
    문화·예술
    </a>
  </li>
  <li class="categoryItem">
    <a href="#" class="categoryLink">운동·액티비티</a>
  </li>
  </ul>
</div>

<div class="contentsContainer">
  <h1 class="areaTitle">일일하논님의 취향 저격 게더</h1>
  <div class="slideContentsWrap">
    <button type="submit" class="arrowBtn left">
      <img src="/resources/img/icon/arrowL.png" class="arrowLIcon" alt="left arrow">
    </button>
    <!-- eachContainer for문  -->
    <div class="eachContainer">
      <a href="#">
        <div class="eachWrap">
          <div class="thumnailContainer">
            <img src="/resources/img/sp/thumnail.png" class="thumnail" alt="썸네일">
          </div>
          <div class="infoContainer">
            <h3 class="title">아야코록카쿠 전시보러가요</h3>
            <div class="hashtagContainer">
              <!-- hashtag for문 -->
              <button type="button" class="hashtag">#전시회</button>
              <button type="button" class="hashtag">#같이가요</button>
            </div>
            <div class="locationDateContainer">
              <div class="locationContainer">
              <img src="/resources/img/icon/locationIcon.png" class="locationIcon" alt="장소 아이콘">
              <span class="location">영등포구</span>
              </div>
              <span class="dateContainer">
              12.22(토) 오전 10:30
              </span>
            </div>
            <div class="userContainer">
              <div class="userProfileWrap">
                <div class="profileImgWrap">
                  <img src="/resources/img/sp/profile.jpg" class="profileImg" alt="프로필사진">
                </div>
                <span class="nickname">일일하논</span>
              </div>
              <div class="heartWrap">
                <img src="/resources/img/icon/heartIcon.png" class="heartIcon" alt="좋아요 아이콘">
                <span class="heartCount">999+</span>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
	<button type="submit" class="arrowBtn right">
      <img src="/resources/img/icon/arrowR.png" class="arrowLIcon" alt="right arrow">
    </button>
  </div>
</div>
</body>
