<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<link rel="stylesheet" href="/resources/css/userPage/userPage.css">

<div class="userInfo1">
	<div class="background-image">
		<img src="${user.BACK_IMAG}" alt="프로필 사진">
		<div class="profileBtnContainer">
		    <button class="Btn f" data-code="${user.FOLW_CODE}"data-numb="${user.USER_NUMB}" onclick="comFollow('${user.FOLW_CODE}','${user.USER_NUMB}')" >
	        	<c:out value="${user.FOLW_BTNN}" />
	        </button>
		</div>
	</div>
	<div class="profile-picture">
	    <img src="${user.USER_IMAG}" alt="프로필 사진">
	</div>
	<div class="nickname">
	    <c:out value="${user.USER_NICK}"/>
	</div>
	<div class="counter">
	    <div class="countInfo">
	    	<table>
	    		<tr>
			    	<td>개설한 모임</td>
			        <td>팔로워</td>
			        <td>팔로잉</td>
			    </tr>
	       		<tr>
			    	<td>${user.TOTAL_BOARD}</td>
			       	<td>${user.FOLW_COUNT}</td>
			        <td>${user.FOLN_COUNT}</td>
			    </tr>
	        </table>
	    </div>
	</div>
</div>
<div class="userInfo2">
	<div class="user">
		<p class="id">${user.USER_IDXX}</p>
		<p class="selfIntro">${user.SELF_INTR}</p>
		<div class="pickedRegiContianer">
			<h3>
				<img src="/resources/img/icon/detail/location_detail.png" alt="지역 아이콘" />
				선호하는 모임 지역
			</h3>
			<ul class="regiList">
			<c:forEach var="userRegi" items="${userRegi}">
				<li class="pickedChildRegiitem">
                	<c:out value="${userRegi.COMD_NAME}" />
                </li>
			</c:forEach>
			</ul>
		</div>
	</div>
</div>
