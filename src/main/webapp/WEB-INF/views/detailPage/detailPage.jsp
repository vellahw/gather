<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<link rel="stylesheet" href="/resources/css/detailPage/detailPage.css">
<script src="/resources/js/detailPage/detailPage.js"></script>

<div>
  <img class="backgroundImg" src="${img[0].MOIM_IMAG}">
</div>
<div class="detailContainer">
  <div class="slideContainer">
		<button type="button" class="arrowBtn left detail dl" id="leftBtn"></button>
		<button type="button" class="arrowBtn right detail dr" id="rigthBtn"></button>
		<div class="imgSlideContainer">
			<div class="imgSlideList">
				<div class="imgWrap">
				  <c:forEach var="i" items="${img}">
				    <img src="${i.MOIM_IMAG}" class="img" alt="모임 이미지">
				  </c:forEach>
				</div>
			</div>
		</div>
  </div>
  
	<div class="detailInfoContainer">
	  <div class="headArea">
      <div class="headLeft">
        <h2 class="detailTitle">${detail[0].MOIM_TITL}</h2>
        <div class="category">${detail[0].PARENTS_CATE}  |  ${detail[0].CHILD_CATE}</div>
      </div>
	    
	    <div class="icons">
        <div class="heartWrap" style="position: relative;">
          <img src="/resources/img/icon/heartIcon.png"
          		 class="heartIcon d" alt="좋아요 아이콘">
	        <span class="heartCount dc">
						<c:out value="${detail[0].LIKE_COUNT}" />
					</span>
	      </div>
        <div class="bookmarkWarp">
          <img class="bookmarkIcon" src="/resources/img/icon/detail/bookmark.png" alt="북마크 아이콘"/>
        </div>
	    </div>
	  </div>

    <div class="intro">
    	<c:out value="${detail[0].MOIM_CNTT}" />
    </div>

    <div class="eachInfoWrap">
      <h3 class="infoTitle">게더 정보</h3>
        <div class="infomation">
          <div class="each">
          	<div class="infoIconWrap">
		          <img class="infoIcon loca" src="/resources/img/icon/detail/location_detail.png" alt="위치 아이콘" />
          	</div>
          	<span class="infoText">
	            <c:out value="${detail[0].PREGI_NAME}" />
	            <c:out value="${detail[0].REGI_NAME}" />
          	</span>
          </div>
          <div class="each">
          	<div class="infoIconWrap">
  	          <img class="infoIcon" src="/resources/img/icon/detail/clockIcon.png" alt="시간 아이콘" />
	          </div>
	          <span class="infoText">
            	<c:out value="${detail[0].FULL_DATE}" />
          	</span>
          </div>
          <div class="each">
          	<div class="infoIconWrap">
  	          <img class="infoIcon" src="/resources/img/icon/detail/costIcon.png" alt="비용 아이콘" />
	          </div>
	          <span class="infoText">
            	<c:out value="${detail[0].MOIM_COST}" />
            </span>
          </div>
          <div class="each">
          	<div class="infoIconWrap">
  	          <img class="infoIcon" src="/resources/img/icon/detail/smileIcon.png" alt="연령성별 아이콘" />
	          </div>
	          <span class="infoText">
            	<c:out value="${detail[0].MOIM_AGEE}" />
            	<c:out value="${detail[0].APPR_GNDR}" />
          	</span>
          </div>
          <div class="each">
          	<div class="infoIconWrap">
  	          <img class="infoIcon" src="/resources/img/icon/detail/peopleIcon.png" alt="인원 제한 아이콘" />
	          </div>
	          <span class="infoText">
            	<c:out value="${detail[0].PRES_PEOP}" />
            </span>
          </div>
        </div>
    </div>
    <div class="eachInfoWrap">
      <h3 class="infoTitle">방장 정보</h3>
      <div class="masterProfile">
        <div class="profileImgWrap dp">
          <img class="profileImg" src="${detail[0].USER_IMAG}" />
        </div>
        <div class="masterName">${detail[0].USER_NICK}</div>
      </div>
    </div>
    <div class="eachInfoWrap">
      <h3 class="infoTitle member">함께하는 멤버들</h3>
      <div class="memeberProfiles">
      <%-- 데이터 불러와 forEach로 프사 띄우고
      		자바스크립트로 left 연산 해줘야함
       --%>
			<c:forEach var="m" items="${member}">
			 <c:if test="${m.BANN_YSNO == 'N' && m.WAIT_YSNO == 'N' && m.MAST_YSNO == 'N'}">
         <div class="profileImgWrap dp members">
           <img class="profileImg" src="${m.USER_IMAG}" />
         </div>
			 </c:if>
			</c:forEach>
      </div>
    </div>
    <div class="btnContainer">
      <button type="button" class="basicBtn">참여하기</button>
    </div>
	</div>
</div>