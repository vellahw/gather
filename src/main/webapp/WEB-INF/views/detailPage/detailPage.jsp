<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<link rel="stylesheet" href="/resources/css/detailPage/detailPage.css">

<div class="detailContainer">

  <div class="slideContainer">
		<button type="button" class="arrowBtn left detail dl" id="leftBtn"></button>
		<button type="button" class="arrowBtn right detail dr" id="rigthBtn"></button>
		<div class="imgSlideContainer">
			<div class="imgSlideList">
				<div class="imgWrap">
				  <img src="/resources/img/login/camping.jpg" class="img" alt="모임 이미지">
				</div>
			</div>
		</div>
  </div>
  
	<div class="background">
	  <div class="headArea">
      <div class="headLeft">
        <h2 class="detailTitle">자전거 같이 타실분!</h2>
                                <%-- 부모카테 • 자식 카테 --%>
        <div class="category">아웃도어/스포츠  •  자전거</div>
      </div>
	    
	    <div class="icons">
        <div class="heartWrap" style="position: relative;">
          <img src="/resources/img/icon/heartIcon.png"
          		 class="heartIcon d" alt="좋아요 아이콘">
	        <span class="heartCount dc">99</span>
	      </div>
        <div class="bookmarkWarp">
          <img class="bookmarkIcon" src="/resources/img/icon/detail/bookmark.png" alt="북마크 아이콘"/>
        </div>
	    </div>
	  </div>

    <div class="intro">
      안녕하세요~ 자전거 같이 타실 분들을 모집합니다.<br/>이번주 토요일 오전 8시 서울역에 만나 출발 예정입니다.<br/>현재 저 포함 여자2명 남자2명의 팀원이 있습니다.<br/>궁금한 점은 오픈카톡으로 문의 주시고, 참여신청 해주세용~^^
    </div>

    <div class="eachInfoWrap">
      <h3 class="infoTitle">게더 정보</h3>
        <div class="infomation">
          <div class="each">
          	<div class="infoIconWrap">
		          <img class="infoIcon" src="/resources/img/icon/detail/location_detail.png" alt="위치 아이콘" />
          	</div>
            서울시 중구 신당동
          </div>
          <div class="each">
          	<div class="infoIconWrap">
  	          <img class="infoIcon" src="/resources/img/icon/detail/clockIcon.png" alt="시간 아이콘" />
	          </div>
            2023년 2월 25일 오후 1시
          </div>
          <div class="each">
          	<div class="infoIconWrap">
  	          <img class="infoIcon" src="/resources/img/icon/detail/costIcon.png" alt="비용 아이콘" />
	          </div>
            참가 비용 없음
          </div>
          <div class="each">
          	<div class="infoIconWrap">
  	          <img class="infoIcon" src="/resources/img/icon/detail/smileIcon.png" alt="연령성별 아이콘" />
	          </div>
            22~27세 남자만
          </div>
          <div class="each">
          	<div class="infoIconWrap">
  	          <img class="infoIcon" src="/resources/img/icon/detail/peopleIcon.png" alt="인원 제한 아이콘" />
	          </div>
            인원 제한 없음
          </div>
        </div>
    </div>
    <div class="eachInfoWrap">
      <h3 class="infoTitle">방장 정보</h3>
      <div class="masterProfile">
        <div class="profileImgWrap dp">
          <img class="profileImg" src="https://via.placeholder.com/90x90" />
        </div>
        <div class="masterName">병아리삐약</div>
      </div>
    </div>
    <div class="eachInfoWrap">
      <h3 class="infoTitle member">함께하는 멤버들</h3>
      <div class="memeberProfiles">
      <%-- 데이터 불러와 forEach로 프사 띄우고
      		자바스크립트로 left 연산 해줘야함
       --%>
        <div class="profileImgWrap dp members">
          <img class="profileImg" src="https://via.placeholder.com/90x90" />
        </div>
        <div class="profileImgWrap dp members move">
          <img class="profileImg" src="https://via.placeholder.com/90x90" />
        </div>
      </div>
    </div>
    <div class="btnContainer">
      <button type="button" class="basicBtn"></button>
    </div>
	</div>
</div>