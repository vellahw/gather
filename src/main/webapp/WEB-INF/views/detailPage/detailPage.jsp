<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<link rel="stylesheet" href="/resources/css/detailPage/detailPage.css">
<script src="/resources/js/detailPage/detailPage.js"></script>

<img class="backgroundImg">

<div class="detailContainer">
  <div class="slideContainer">
		<button type="button" class="arrowBtn detail dl" id="leftBtn"></button>
		<button type="button" class="arrowBtn detail dr" id="rigthBtn"></button>
		<div class="imgSlideContainer">
			<div class="imgSlideList">
				<div class="imgWrap">
				  <c:forEach var="i" items="${img}" varStatus="status">
				    <img src="${i.MOIM_IMAG}" class="img" alt="모임 이미지" data-iindex="${status.index}">
				  </c:forEach>
				</div>
			</div>
		</div>
  </div>
	<div class="dotsContainer">
	</div>  
	<div class="detailInfoContainer">
	  <div class="headArea">
      <div class="headLeft">
        <h2 class="detailTitle">${detail.MOIM_TITL}</h2>
        <div class="category">${detail.PARENTS_CATE}  |  ${detail.CHILD_CATE}</div>
      </div>
	    
	    <div class="icons">
        <div class="heartWrap" style="position: relative;">
          <img src="/resources/img/icon/heartIcon.png"
          		 class="heartIcon d" alt="좋아요 아이콘">
	        <span class="heartCount dc">
						<c:out value="${detail.LIKE_COUNT}" />
					</span>
	      </div>
        <div class="bookmarkWarp">
          <img class="bookmarkIcon" src="/resources/img/icon/detail/bookmark.png" alt="북마크 아이콘"/>
        </div>
	    </div>
	  </div>

    <div class="intro">
    	<c:out value="${detail.MOIM_CNTT}" />
    </div>

    <div class="eachInfoWrap">
      <h3 class="infoTitle">게더 정보</h3>
        <div class="infomation">
          <div class="each">
          	<div class="infoIconWrap">
		          <img class="infoIcon loca" src="/resources/img/icon/detail/location_detail.png" alt="위치 아이콘" />
          	</div>
          	<span class="infoText">
	            <c:out value="${detail.PREGI_NAME}" />
	            <c:out value="${detail.REGI_NAME}" />
          	</span>
          </div>
          <div class="each">
          	<div class="infoIconWrap">
  	          <img class="infoIcon" src="/resources/img/icon/detail/clockIcon.png" alt="시간 아이콘" />
	          </div>
	          <span class="infoText">
            	<c:out value="${detail.FULL_DATE}" />
          	</span>
          </div>
          <div class="each">
          	<div class="infoIconWrap">
  	          <img class="infoIcon" src="/resources/img/icon/detail/costIcon.png" alt="비용 아이콘" />
	          </div>
	          <span class="infoText">
            	<c:out value="${detail.MOIM_COST}" />
            </span>
          </div>
          <div class="each">
          	<div class="infoIconWrap">
  	          <img class="infoIcon" src="/resources/img/icon/detail/smileIcon.png" alt="연령성별 아이콘" />
	          </div>
	          <span class="infoText">
            	<c:out value="${detail.MOIM_AGEE}" />
            	<c:out value="${detail.APPR_GNDR}" />
          	</span>
          </div>
          <div class="each">
          	<div class="infoIconWrap">
  	          <img class="infoIcon" src="/resources/img/icon/detail/peopleIcon.png" alt="인원 제한 아이콘" />
	          </div>
	          <span class="infoText">
            	<c:out value="${detail.PRES_PEOP}" />
            </span>
          </div>
        </div>
    </div>
    <div class="eachInfoWrap">
      <h3 class="infoTitle">방장 정보</h3>
      <div class="masterProfile">
        <div class="profileImgWrap dp">
          <img class="profileImg" src="${detail.USER_IMAG}"/>
        </div>
        <div class="masterName">${detail.USER_NICK}</div>
      </div>
    </div>
    <div class="eachInfoWrap">
 			<h3 class="infoTitle member">함께하는 멤버들</h3>
      <%-- 데이터 불러와 forEach로 프사 띄우고
      		자바스크립트로 left 연산 해줘야함
       --%>
			<c:choose>
		    <c:when test="${fn:length(member) > 0 }">
		      <div class="memeberProfiles" data-count="${fn:length(member)}" id="count">
						<c:forEach var="m" items="${member}">
						  <c:if test="${m.BANN_YSNO == 'N' && m.WAIT_YSNO == 'N' && m.MAST_YSNO == 'N'}">
						      <div class="profileImgWrap dp members">
						      	<img class="profileImg" src="${m.USER_IMAG}" />
						      </div>
							</c:if>
						</c:forEach>
      		</div>
				 </c:when>
				 <c:otherwise>
					 <p class="noMember" data-count="0" id="count">
				     참여한 멤버가 없습니다.	첫 번째 멤버가 되어보세요!
					 </p>  
				 </c:otherwise>
	  </c:choose>
    </div>
    <div class="btnContainer">
      <button type="button" class="basicBtn">참여하기</button>
    </div>
	</div>
	
</div>