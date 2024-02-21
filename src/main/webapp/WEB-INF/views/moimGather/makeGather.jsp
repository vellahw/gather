<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<link rel="stylesheet" href="/resources/css/moimGather/makeGather.css">
<link rel="stylesheet" href="/resources/css/moimGather/rangeSlider.css">
<script src="/resources/js/moimGather/makeGather_form.js"></script>
<script src="/resources/js/moimGather/makeGather_fn.js"></script>
<script src="/resources/summernote/summernote-lite.js"></script>
<script src="/resources/summernote/lang/summernote-ko-KR.js"></script>
<link rel="stylesheet" href="/resources/summernote/summernote-lite.css">
<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=d204e67062ee2684baf0eaa95db96a85&libraries=services"></script>

<% if(session.getAttribute("USER_NUMB") ==  null)  { %>
	<script>
		comAlert3(
	        '세션이 만료되었습니다.'
	      , '로그인 후 이용해주세요.'
	      , 'warning'
	      , function() { location.href = '/gather/login.com' }
	    )
	</script>
<% } %>

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
					
					<div class="btnContainer btnContainer_act" style="justify-content: right;">
					  <button type="button" class="waybtn next" id="next">다음</button>
					</div>
				</div>

				<div id="step2">
					<div class="eachInputWrap">
						<label class="eachLabel" for="gatherCost">
							<span aria-label="필수 입력값입니다.">⁕</span>
							참가비가 있나요?
						</label>
						<div>
							<button type="button" class="costBtn parent" data-cost="Y">있음</button>
							<button type="button" class="costBtn parent" data-cost="N">없음</button>
						</div>
						<input type="number" id="gatherCost" class="basicInput register-p">
					</div>
					
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
							어디에서 모일까요?
						</h3>
	          <button type="button" class="searchMap">주소 검색</button>
	          <input type="text" id="gatherAddress" class="basicInput register-p moimRegion" readonly="readonly">
	          <input type="text" id="gatherDetailAddress" class="basicInput register-p moimRegion" placeholder="상세주소를 입력해주세요.">
	          <input type="hidden" id="gatherLati" />
	          <input type="hidden" id="gatherLong" />
	          <div id="map" style="width:500px;height:400px; margin-top: 10px;"></div>
					</div>
					
						<div class="btnContainer" style="margin-top: 30px;">
							<button type="button" class="waybtn prev" id="prev2">이전</button>
						  <button type="button" class="waybtn next" id="next2">다음</button>
						</div>
				</div>
				
				<div id="step3">
					<div class="eachInputWrap">
						<h3>
			        <span aria-label="필수 입력값입니다.">⁕</span>
							어떻게 멤버를 모을까요?
						</h3>
						
						<div class=" _row">
							<h3 class="secondLabel">참여 승인제 여부</h3>
								<div class="apprBtn">
									<p data-appr="Y">필요</p>
									<p>방장이 직접 멤버의 참여 요청을 수락하거나 거절할 수 있어요.</p>
									<p>질문을 통해 취향이 통하는 사람들과 만날 수 있어요.</p>
								</div>
								<div class="apprBtn">
									<p  data-appr="N">불필요</p>
									<p>멤버들의 신청과 동시에 참여가 완료돼요.</p>
								</div>
							</div>
						</div>
						
						<div class=" _row">
							<h3 class="secondLabel" aria-label="gatherAge">연령대</h3>
			        <div slider id="slider-distance">
							  <div>
							    <div inverse-left style="width:70%;"></div>
							    <div inverse-right style="width:70%;"></div>
							    <div range style="left:30%;right:40%;"></div>
							    <span thumb style="left:30%;"></span>
							    <span thumb style="left:60%;"></span>
							    <div sign style="left:30%;">
							      <span id="value">30</span>
							    </div>
							    <div sign style="left:60%;">
							      <span id="value">60</span>
							    </div>
							  </div>
							  <input type="range" id="minAge" class="range1" tabindex="0" value="30" max="100" min="0" step="1" />
							  <input type="range" id="maxAge" class="range2" tabindex="0" value="60" max="100" min="0" step="1" />
							</div>
						</div>
						
						<div class=" _row">
							<h3 class="secondLabel">인원수</h3>
			        <label for="minPeople" >최소 인원(2명~)</label>
			        <input type="number" id="minPeople" class="basicInput register-p">
			        <label for="maxPeople" >최대 인원</label>
			        <input type="number" id="maxPeople" class="basicInput register-p">
						</div>
						
						<div class=" _row">
							<h3 class="secondLabel">성별</h3>
							<button type="button" class="genderBtn" data-gender="null">누구나</button>
							<button type="button" class="genderBtn" data-gender="W">여자만</button>
							<button type="button" class="genderBtn" data-gender="M">남자만</button>
						</div>
					
					<div class="btnContainer" style="margin-top: 30px;">
						<button type="button" class="waybtn prev" id="prev3">이전</button>
					  <button type="button" class="waybtn next" id="next3">다음</button>
					</div>
				</div>		
				
				<div id="step4">
					<div class="eachInputWrap">
						<label class="eachLabel" for="moimContent">
							<span aria-label="필수 입력값입니다.">⁕</span>
							모임 소개
						</label>
						<textarea id="summernote"></textarea>
					</div>
					<div class="btnContainer">
						<button type="button" class="waybtn prev" id="prev4">이전</button>
					  <button type="button" class="waybtn next" id="submit">확인</button>
					</div>
				</div>
				
				</div>
			</div>
		</div>
	</div>
<input id="cateData" type="hidden" value="${cate}">
