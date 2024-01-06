<%@ page language="java" contentType="text/html; charset=UTF-8"
  pageEncoding="UTF-8"%>


  <!-- eachContainer for문  -->
  <div class="eachContainer">
    <div class="eachWrap">
      <div class="thumnailContainer">
      <img src="${list.GATH_IMAG}" class="thumnail" alt="썸네일">
      </div>
      <div class="infoContainer">
      <h3 class="title">${list.GATH_TITL}</h3>
      <div class="hashtagContainer">
        <!-- hashtag for문 -->
        <button type="button" class="hashtag">
        #전시회
        </button>
        <button type="button" class="hashtag">#같이가요</button>
      </div>
      <div class="locationDateContainer">
        <div class="locationContainer">
        <img src="/resources/img/icon/locationIcon.png" class="locationIcon" alt="장소 아이콘">
        <span class="location">${list.REGI_NAME}</span>
        </div>
        <span class="dateContainer">
        ${list.SMAL_DATE}
        </span>
      </div>
      <div class="userContainer">
        <div class="userProfileWrap">
        <div class="profileImgWrap">
          <img src="${list.USER_IMAG}" class="profileImg" alt="프로필사진">
        </div>
        <span class="nickname">${list.USER_NICK}</span>
        </div>
        <div class="heartWrap">
        <img src="/resources/img/icon/heartIcon.png" class="heartIcon" alt="좋아요 아이콘">
        <span class="heartCount">${list.LIKE_COUNT}</span>
        </div>
      </div>
      </div>
    </div>
  </div>
  