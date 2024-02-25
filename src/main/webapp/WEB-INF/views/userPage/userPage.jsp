<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<link rel="stylesheet" href="/resources/css/userPage/userPage.css">

<div class="userInfo1">
	<div class="background-image">
		<img src="${user.BACK_IMAG}" alt="프로필 사진">
	</div>
	<div class="profile-picture">
	    <img src="${user.USER_IMAG}" alt="프로필 사진">
	</div>
	<div class="user-info">
	    <div class="info">
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
</div>
