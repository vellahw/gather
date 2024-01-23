<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<div class="contentsContainer mainContainer">
  <div class="contentsWrap">
	  <h1 class="mainAreaTitle">
	    <c:out value="${param.title}" />
	    <c:if test="${param.titleIcon != ''}">
	      <img src="/resources/img/icon/${param.titleIcon}.png"
					   class="areaTitleIcon" alt="타이틀 아이콘">
	    </c:if> 
	  </h1>
		
		<div class="slideWrap">
			<div class="slideContainer">
				<button type="button" class="arrowBtn left" id="leftBtn"></button>
				<button type="button" class="arrowBtn right" id="rigthBtn"></button>
				<div class="slideList">
					<c:forEach var="list" items="${main}">
						<c:if test="${list.TYPE == param.type}">
							<div class="slideContents">
								<div class="eachWrap">
									<div class="thumnailContainer" onclick="goDetail('${list.MOIM_IDXX}')">
										<img src="${list.MOIM_IMAG}" class="thumnail" alt="썸네일">
									</div>
									<div class="infoContainer">
										<h3 class="title" onclick="goDetail('${list.MOIM_IDXX}')">${list.MOIM_TITL}</h3>
										<div class="hashtagContainer">
											<!-- 해시태그 -->
											<button type="button" class="hashtag">#전시회</button>
											<button type="button" class="hashtag">#같이가요</button>
										</div>
										<div class="locationDateContainer">
											<div class="locationContainer">
												<div class="tooltip">
													<img src="/resources/img/icon/locationIcon.png"
															class="locationIcon" alt="장소 아이콘">
													<span class="location">${list.REGI_NAME}</span>
													<div class="tooltiptext">${list.PREGI_NAME}</div>
												</div>
											</div>
											<span class="dateContainer">
												${list.SMAL_DATE}
											</span>
										</div>
										<div class="userContainer">
											<div class="userProfileWrap">
												<div class="profileImgWrap">
													<img src="${list.USER_IMAG}"
															class="profileImg" alt="프로필사진">
												</div>
												<span class="nickname">${list.USER_NICK}</span>
											</div>
											<div class="heartWrap">
												<input type="hidden" data-like-id="${list.MOIM_IDXX}" value="${list.LIKE_YSNO}" id="heartYN"/>
												<div class="heartContainer">
												  <input type="checkbox" id="${list.MOIM_IDXX}" onchange="handleCheckboxChange(this)">
												  <label for="${list.MOIM_IDXX}"></label>
												  <span class="heartCount" data-count-id="${list.MOIM_IDXX}">${list.LIKE_COUNT}</span>
											  </div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</c:if>
					</c:forEach>
				</div>
			</div>
		</div>
	</div>
</div>