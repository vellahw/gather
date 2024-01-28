<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<div class="notifyBtnWrap">
<button type="button" class="notifyBtn">
	<img src="/resources/img/icon/bellIcon.png" alt="알림 아이콘"/>
</button>
<div class="notiCount">${notiCount}</div>
</div>

<div class="notifyList" >
	<ul style="margin-top:648px">
		<li class="delAll" onclick="comConfirm2('모든 알림을 삭제하시겠습니까?',null,'warning','삭제되었습니다.','success',function(){updateReadNoti();})">모두삭제</li>
		<c:choose>
  		<c:when test="${fn:length(notify) > 0 }">
			<c:forEach var="noti" items="${notify}">
			    <li class="noti" data-noti-id="${noti.NOTI_SEQC}" onclick="updateReadNoti(${noti.NOTI_SEQC})">
			        <div class="regDate">
			            <span>${noti.REGG_DATEKR}</span>
			            <button class="trachCan">
			            	<img src="/resources/img/icon/trashIcon.png" alt="삭제 아이콘" />
			            </button>
			        </div>
			        <div>
			            <c:if test="${noti.USER_NICK ne null}"> 
			                <span class="nick">${noti.USER_NICK}</span>
			            </c:if>
			            <span>${noti.NOTI_CNT1}</span>
			            <span><button class="t" onclick="comGoSomewhere('detail','${noti.CNTT_IDXX}')">'${noti.MOIM_TITL}'</button></span>
			            <span>${noti.NOTI_CNT2}</span>
			        </div>
			    </li>
			</c:forEach>
		</c:when>
			<c:otherwise>
			 	<div class="noAlim">알림이 없습니다.</div>
			</c:otherwise>
	 </c:choose>
</ul>
</div>