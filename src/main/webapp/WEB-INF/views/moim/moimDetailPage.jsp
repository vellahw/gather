<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<link rel="stylesheet" href="/resources/css/detailPage/detailPage.css">
<script src="/resources/js/detailPage/detailPage.js"></script>
<script src="/resources/summernote/summernote-lite.js"></script>
<script src="/resources/summernote/lang/summernote-ko-KR.js"></script>
<link rel="stylesheet" href="/resources/summernote/summernote-lite.css">

<img class="backgroundImg">

<c:if test="${detail.ENDD_YSNO eq 'Y'}">
   <div class="closebar">마감된 모임이에요</div>
</c:if>

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
         <div class="heartWrap">
              <input type="hidden" data-like-id="${detail.MOIM_IDXX}" value="${detail.LIKE_YSNO}" id="heartYN"/>
               <div class="heartContainer">
                 <input  class="heart-box" type="checkbox" id="${detail.MOIM_IDXX}" onchange="handleCheckboxChange(this)">
                  <label class="heartIcon detailHeart" for="${detail.MOIM_IDXX}"></label>
            <input id="realCount" type="hidden" data-realCount-id="${detail.MOIM_IDXX}" value="${detail.LIKE_COUNT}" >
                  <span id="showCount" class="heartCount detailC" data-ShowCount-id="${detail.MOIM_IDXX}"></span>
               </div>
           </div>
        <div class="bookmarkWarp">
          <img class="bookmarkIcon" src="/resources/img/icon/detail/bookmark.png" alt="북마크 아이콘"/>
        </div>
       </div>
     </div>

    <div class="intro">
       ${contents}
    </div>

    <div class="eachInfoWrap">
      <h3 class="infoTitle">게더 정보</h3>
        <div class="infomation">
          <div class="each">
             <div class="infoIconWrap">
                <img class="infoIcon loca" src="/resources/img/icon/detail/location_detail.png" alt="위치 아이콘" />
             </div>
             <span class="infoText">
             	 <c:if test="${detail.PREGI_NAME != null && detail.REGI_NAME != null}">
               	<c:out value="${detail.PREGI_NAME}" />
               	<c:out value="${detail.REGI_NAME}" />
               	<!-- <button type="button">자세한 장소 보기</button>
               	<div class="showMap">
                	<div id="map" style="width:500px;height:400px;margin-top:10px;"></div>
                </div> -->
             	 </c:if>
             	 <c:if test="${detail.PREGI_NAME == null && detail.REGI_NAME == null}">
             	 	오프라인 모임
             	 </c:if>
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
               <c:out value="${detail.APPR_LMIT}" />
             </span>
          </div>
          <div class="each peop">
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
          <img class="profileImg" src="${detail.USER_IMAG}" onclick="comWhere2Go('userPage','${detail.USER_NUMB}')"/>
        </div>
        <div class="profileInfo master">
           <p style="margin-bottom: 5px;">
              <c:out value="${detail.USER_NICK}" />
           </p>
           <p class="self" data-intr-length="${fn:length(detail.SELF_INTR)}">
              <input type="hidden" value="${detail.SELF_INTR}" id="selfIntr">
              <c:out value="${detail.SELF_INTR}" />
           </p>
         </div>
            <div class="profileBtnContainer">
                <button class="Btn f" data-code="${detail.FOLW_CODE}"data-numb="${detail.USER_NUMB}" onclick="comFollow('${detail.FOLW_CODE}','${detail.USER_NUMB}')" >
                	<c:out value="${detail.FOLW_BTNN}" />
                </button>
            </div>
      </div>
    </div>
     <div class="eachInfoWrap">
          <h3 class="infoTitle member">함께하는 멤버들</h3>
        <div class="memeberProfiles">
            <c:forEach var="m" items="${member}">
               <c:if test="${m.BANN_YSNO == 'N' && m.WAIT_YSNO == 'N' && m.MAST_YSNO == 'N'}">
                   <c:set var="count" value="${count + 1}" />
                      <div class="profileWrapper">
                        <div class="profileImgContainer">
                           <div class="profileImgWrap dp" data-count="${count}" id="count">
                             <img class="profileImg" src="${m.USER_IMAG}" onclick="comWhere2Go('userPage','${m.USER_NUMB}')"/>
                           </div>
                        </div>
                        <div class="profileInfo">
                           <div style="padding-right: 25px;">
                              <p><c:out value="${m.USER_NICK}" /></p>
                              <p class="self" data-intr-length="${fn:length(m.SELF_INTR)}">
                              <input type="hidden" value="${m.SELF_INTR}" id="selfIntr">
                                 <c:out value="${m.SELF_INTR}" />
                              </p>
                           </div>
                           <div class="profileBtnContainer">
                             <button class="Btn f" data-code="${m.FOLW_CODE}"data-numb="${m.USER_NUMB}" onclick="comFollow('${m.FOLW_CODE}','${m.USER_NUMB}')" >
                               <c:out value="${m.FOLW_BTNN}" />
                            </button>
                              <button class="Btn bann" data-numb="${m.USER_NUMB}">
                                 강퇴
                              </button>
                           </div>
                      </div>
                  </div>
               </c:if>
            </c:forEach>
        </div>
    </div>
    <div class="eachInfoWrap apprlist">
          <h3 class="infoTitle member">참여 승인을 기다리고 있어요</h3>
           <div class="memeberProfiles" data-appr="Y">
               <c:forEach var="m" items="${member}">
                 <c:if test="${m.BANN_YSNO == 'N' && m.WAIT_YSNO == 'Y' && m.MAST_YSNO == 'N'}">
                     <c:set var="count" value="${count + 1}" />
                   <div class="profileWrapper">
                      <div class="profileImgContainer">
                         <div class="profileImgWrap dp" data-count="${count}" id="count">
                            <img class="profileImg" src="${m.USER_IMAG}" onclick="comWhere2Go('userPage','${m.USER_NUMB}')"/>
                         </div>
                      </div>
                      <div class="profileInfo">
                         <div style="padding-right: 25px;">
                            <p><c:out value="${m.USER_NICK}" /></p>
                              <p class="self" data-intr-length="${fn:length(m.SELF_INTR)}">
                                 <input type="hidden" value="${m.SELF_INTR}" id="selfIntr">
                                 <c:out value="${m.SELF_INTR}" />
                              </p>
                         </div>
                         <div class="profileBtnContainer">
                            <button class="Btn f" data-code="${m.FOLW_CODE}"data-numb="${m.USER_NUMB}" onclick="comFollow('${m.FOLW_CODE}','${m.USER_NUMB}')" >
                               <c:out value="${m.FOLW_BTNN}" />
                            </button>
                            <button class="Btn appr" data-numb="${m.USER_NUMB}">
                               승인
                            </button>
                            <button class="Btn noAppr" data-numb="${m.USER_NUMB}">
                               거절
                            </button>
                         </div>
                      </div>
                   </div>
                  </c:if>
               </c:forEach>
        </div>
    </div>
    
     <div class="btnContainer">
       <input type="hidden" value="${yourState}" id="yourState" />
       <input type="hidden" value="${detail}" id="detail"/> 
       <div class="bubble">참여 승인 대기중이에요!</div>
       
       <button class="basicBtn loginPlz" onclick="loginOnClick()">로그인하고 참여하기</button>
       
       <button type="button" class="basicBtn" id="joinMoimBtn"></button>
         
        <button type="button" class="basicBtn" id="reviewBtn">리뷰쓰기</button>
          
        <button type="button" class="basicBtn" id="updateBtn">수정하기</button>
     
      <button type="button" class="basicBtn" id="reJoin">참여하기</button>
     </div>
   </div>
   
</div>