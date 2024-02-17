<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<link rel="stylesheet" href="/resources/css/moimGather/moimRegister.css">
<script src="/resources/js/moimGather/moimRegister.js"></script>

<div class="registerContainer">
	<div class="innerContainer">
		<div class="formContainer" id="step1">
			<h2>게더 개설하기</h2>

			<div class="inputWrapper">
				<label class="eachLabel" for="moimTitle">
					<span aria-label="필수 입력값입니다.">*</span>
					모임 제목
				</label>
				
        <label for="date" >모임 날짜</label>
        <span style="color:#fd8731;margin-left:3px;">*</span>
          <input type="date" class="form-control" name="MO_DEADLINE" id="date">
          
        <label for="MO_DEADTIME" >모임 시간</label>
        <span style="color:#fd8731;margin-left:3px;">*</span>
        <input type="time" class="form-control" name="MO_DEADTIME" id="date2">
				
				<input type="text" id="moimTitle" class="basicInput register-p step1" placeHolder="최소 5자 이상 입력해주세요.">
				
				<label class="eachLabel" for="moimContent">
					<span aria-label="필수 입력값입니다.">*</span>
					모임 소개
				</label>
				<textarea id="moimContent" placeHolder="모임 소개글을 입력해주세요."></textarea>

				<label for="moimParentCate">상위 카테고리
					<span aria-label="필수 입력값입니다.">*</span>
				</label>
				<select id="moimParentCate">
					<option>부모카테</option>
				</select>
				
				<label for="moimChildCate">하위 카테고리
					<span aria-label="필수 입력값입니다.">*</span>
				</label>
				<select id="moimChildCate">
					<option>자식 카테</option>
				</select>
			
			
			
			
			</div>
		</div>
	</div>
</div>
