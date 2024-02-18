<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<link rel="stylesheet" href="/resources/css/moimGather/moimRegister.css">
<script src="/resources/js/moimGather/moimRegister.js"></script>
<script src="/resources/summernote/summernote-lite.js"></script>
<script src="/resources/summernote/lang/summernote-ko-KR.js"></script>
<link rel="stylesheet" href="/resources/summernote/summernote-lite.css">

<div class="registerContainer">
	<div class="innerContainer">
		<div class="formContainer" id="step1">
			<h2>게더 개설하기</h2>

			<div class="inputWrapper">
			
				<div class="eachInputWrap">
					<h3>
						<span aria-label="필수 입력값입니다.">*</span>
						게더의 주제를 선택해주세요
					</h3>
					<div class="categoryContainer" id="categoryContainer">
						<ul class="categoryList"></ul>
					</div>
				</div>
				
				<div class="eachInputWrap">
					<label class="eachLabel" for="moimTitle">
						<span aria-label="필수 입력값입니다.">*</span>
						모임 제목
					</label>
					<input type="text" id="moimTitle" class="basicInput register-p step1" placeHolder="최소 5자 이상 입력해주세요.">
				</div>
	
				<div class="eachInputWrap">
					<h3>
		        <span aria-label="필수 입력값입니다.">*</span>
						언제 모일까요?
					</h3>
					<div class="_row">
		        <label for="date" >모임 날짜</label>
		        <input type="date" class="form-control" name="MO_DEADLINE" id="date">
		        <label for="MO_DEADTIME">모임 시간</label>
		        <input type="time" class="form-control" name="MO_DEADTIME" id="date2">
					</div>
				</div>		
					
				<div class="eachInputWrap">
					<h3>
		        <span aria-label="필수 입력값입니다.">*</span>
						몇 명이서 모일까요?
					</h3>
					<div class=" _row">
		        <label for="date" >최소 인원</label>
		        <input type="date" class="form-control" name="MO_DEADLINE" id="date">
		        <label for="MO_DEADTIME" >최대 인원</label>
		        <input type="time" class="form-control" name="MO_DEADTIME" id="date2">
					</div>
				</div>			
				
				<div class="eachInputWrap">			
					<label class="eachLabel" for="moimContent">
						<span aria-label="필수 입력값입니다.">*</span>
						모임 소개
					</label>
					<div id="summernote"></div>
				</div>
			
			</div>
		</div>
	</div>
</div>
<input id="cateData" type="hidden" value="${cate}">
