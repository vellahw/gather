<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<div class="notifyBtnWrap">
	<button type="button" class="notifyBtn">
		<img src="/resources/img/icon/bellIcon.png" alt="알림 아이콘"/>
	</button>
	<div class="notiCount">
		<c:out value="${notiCount}" />
	</div>
</div>

<div class="notifyList" data-count="${notiCount}">
	<ul>
		<li class="delAll" onclick="comConfirm2('모든 알림을 삭제하시겠습니까?',null,'warning','삭제되었습니다.','success',function(){updateReadNoti();})">모두삭제</li>
			<c:choose>
  			<c:when test="${fn:length(notify) > 0 }">
				<c:forEach var="noti" items="${notify}">
			    <li class="noti" data-noti-id="${noti.NOTI_SEQC}">
		      	<div class="regDate">
			      	<span>
			      		<c:out value="${noti.REGG_DATEKR}" />
			      	</span>
			      	<div class="parent">
				      	<button type="button" data-noti-seqc="${noti.NOTI_SEQC}" class="readBtn" onclick="updateReadNoti(this)">
				      		읽음
				      	</button>
			      	</div>
			   		</div>
			      <div class="notiContent">
			      	<c:if test="${noti.USER_NICK ne null}"> 
			        	<span class="nick">
			        		<c:out value="${noti.USER_NICK}" />
			        	</span>
			        </c:if>
			        <span>
			        	<c:out value="${noti.NOTI_CNT1}" />
			        </span>
			        <span class="t" onclick="comGoSomewhere('detail','${noti.CNTT_IDXX}')">
			        	'<c:out value="${noti.MOIM_TITL}" />'
			        </span>
			        <span>
			        	<c:out value="${noti.NOTI_CNT2}" />
			        	</span>
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