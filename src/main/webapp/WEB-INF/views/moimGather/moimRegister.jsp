<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<link rel="stylesheet" href="/resources/css/moimGather/moimRegister.css">
<script src="/resources/js/moimGather/moimRegister.js"></script>
<script src="/resources/summernote/summernote-lite.js"></script>
<script src="/resources/summernote/lang/summernote-ko-KR.js"></script>
<link rel="stylesheet" href="/resources/summernote/summernote-lite.css">
<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
  <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=d204e67062ee2684baf0eaa95db96a85&libraries=services"></script>

<div class="registerContainer">
	<div class="innerContainer">
		<div class="formContainer">
			<h2>게더 개설하기</h2>

			<div class="inputWrapper">
			
				<div id="step1" class="show_step">
					<div class="eachInputWrap catesection">
						<h3>
							<span aria-label="필수 입력값입니다.">⁕</span>
							게더의 주제를 선택해주세요
						</h3>
						<div class="categoryContainer" id="categoryContainer">
							<ul class="categoryList"></ul>
						</div>
					</div>
					
					<div class="eachInputWrap">
						<label class="eachLabel moimTitle" for="moimTitle">
							<span aria-label="필수 입력값입니다.">⁕</span>
							모임 제목을 입력해주세요
						</label>
						<input type="text" id="gatherTitle" class="basicInput register-p step1" placeHolder="최소 5자 이상 입력해주세요.">
					</div>
					
					<div class="btnContainer">
						<div class="btnWrap" style="justify-content: right;">
					  	<button type="button" class="waybtn next" id="next">다음</button>
						</div>
					</div>
				</div>

				<div id="step2">
				<div class="eachInputWrap">
					<h3>
		        <span aria-label="필수 입력값입니다.">⁕</span>
						언제 모일까요?
					</h3>
					<div class="_row">
		        <label for="gatherDate" >모임 날짜</label>
		        <input type="date" id="gatherDate" class="basicInput register-p">
		        <label for="gatherTime">모임 시간</label>
		        <input type="time" id="gatherTime" class="basicInput register-p">
					</div>
				</div>		
					
				<div class="eachInputWrap">
					<h3>
		        <span aria-label="필수 입력값입니다.">⁕</span>
						몇 명이서 모일까요?
					</h3>
					<div class=" _row">
		        <label for="minPeople" >최소 인원</label>
		        <input type="text" id="minPeople" class="basicInput register-p">
		        <label for="maxPeople" >최대 인원</label>
		        <input type="text" id="maxPeople" class="basicInput register-p">
					</div>
				</div>
				
				<div class="eachInputWrap">
					<h3>
		        <span aria-label="필수 입력값입니다.">⁕</span>
						어디에서 모일까요?
					</h3>
          <button type="button" class="searchMap">주소 검색</button>
          <input type="text" class="basicInput register-p moimRegion" id="moimRegion" readonly="readonly">
          <input type="text" class="basicInput register-p moimRegion" id="moimDetailAddress" placeholder="상세주소를 입력해주세요.">
          <div id="map" style="width:500px;height:400px; margin-top: 10px;"></div>
				</div>
				
					<div class="btnContainer" style="margin-bottom: 30px;">
						<div class="btnWrap">
							<button type="button" class="waybtn prev" id="prev2">이전</button>
					  	<button type="button" class="waybtn next" id="next2">다음</button>
						</div>
					</div>
				</div>
				
				<div id="step3">
					<div class="eachInputWrap">			
						<label class="eachLabel" for="moimContent">
							<span aria-label="필수 입력값입니다.">⁕</span>
							모임 소개
						</label>
						<div id="summernote"></div>
					</div>
					<div class="btnContainer">
						<div class="btnWrap">
							<button type="button" class="waybtn prev" id="prev3">이전</button>
					  	<button type="button" class="waybtn next" id="next3">다음</button>
						</div>
					</div>
				</div>
				
			</div>
		</div>
	</div>
</div>
<input id="cateData" type="hidden" value="${cate}">
