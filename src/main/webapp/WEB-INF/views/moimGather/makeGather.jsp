<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<link rel="stylesheet" href="/resources/css/moimGather/makeGather.css">
<script src="/resources/js/moimGather/makeGather_form.js"></script>
<script src="/resources/js/moimGather/makeGather_fn.js"></script>
<script src="/resources/js/moimGather/formCheck.js"></script>
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
							<span class="required" aria-label="필수 입력값입니다.">⁕</span>
							게더의 주제를 선택해주세요
							<span id="addPickedCate" style="padding: 0;"></span>
						</h3>
						<div class="categoryContainer" id="categoryContainer">
							<ul class="categoryList"></ul>
						</div>
					</div>
					
					<div class="eachInputWrap">
						<label class="eachLabel moimTitle" for="moimTitle">
							<span  class="required" aria-label="필수 입력값입니다.">⁕</span>
							모임 제목을 입력해주세요
						</label>
						<input type="text" id="moimTitle" class="basicInput register-p step1" placeHolder="최소 5자 이상 입력해주세요.">
					</div>
					
					<div class="btnContainer btnContainer_act" style="justify-content: right;">
					  <button type="button" class="waybtn next" id="next">다음</button>
					</div>
				</div>

				<div id="step2">
					<div class="eachInputWrap">
						<label class="eachLabel" for="moimCost">
							<span class="required" aria-label="필수 입력값입니다.">⁕</span>
							참가비가 있나요?
						</label>
						<div class="chooseCost">
							<button type="button" class="costBtn parent" data-cost="Y">있음</button>
							<button type="button" class="costBtn parent" data-cost="N">없음</button>
						</div>
						<input type="text" id="moimCost" class="basicInput register-p" placeHolder="숫자만 입력해주세요." style="margin-right: 18px; display: none;">
					</div>
					
					<div class="eachInputWrap">
						<h3>
			        <span class="required" aria-label="필수 입력값입니다.">⁕</span>
							언제 모일까요?
						</h3>
						<div class="_row moimWhen">
							<div>
				        <label for="moimDate" >모임 날짜</label>
				        <input type="date" id="moimDate" class="basicInput register-p">
							</div>
							<div>
				        <label for="moimTime">모임 시간</label>
				        <input type="time" id="moimTime" class="basicInput register-p" style="width: 113.33px;">
							</div>
						</div>
					</div>	
					
					<div class="eachInputWrap">
						<h3>
			        <span class="required" aria-label="필수 입력값입니다.">⁕</span>
							어디에서 모일까요?
						</h3>
						<div class="chooseLocation">
		          <button type="button" id="online" class="locaBtn parent" data-loca="on">온라인에서 모여요</button>
		          <button type="button" id="offline" class="locaBtn parent" data-loca="off">오프라인에서 모여요</button>
						</div>
            <button type="button" class="searchMap hashtag">주소 검색하기</button>
	          <input type="text" id="moimAddress" class="basicInput register-p moimRegion" readonly="readonly">
	          <input type="text" id="moimDetailAddress" class="basicInput register-p moimRegion" placeholder="상세주소를 입력해주세요.">
	          <input type="hidden" id="moimLati" />
	          <input type="hidden" id="moimLong" />
	          <div id="map"></div>
					</div>
					
						<div class="btnContainer" style="margin-top: 30px;">
							<button type="button" class="waybtn prev" id="prev2">이전</button>
						  <button type="button" class="waybtn next" id="next2">다음</button>
						</div>
				</div>
				
				<div id="step3">
					<div class="eachInputWrap">
						<h3 style="margin-bottom: 5px;">
			        <span class="required" aria-label="필수 입력값입니다.">⁕</span>
							어떻게 멤버를 모을까요?
						</h3>
						
						<div class="row">
							<h3 class="secondLabel">
								<img src="/resources/img/form/peopleApprIcon.png" alt="참여승인제 아이콘">
								참여 승인제 여부
							</h3>
								<div class="apprBtnContainer">
									<div class="apprBtn parent" data-appr="Y" id="apprY" onclick="chooseAppr(this)">
										<label for="apprY" aria-label="승인 필요">필요</label>
										<p>직접 멤버의 참여 요청을 수락하거나 거절할 수 있어요.</p>
									</div>
									<div class="apprBtn parent" data-appr="N" id="apprN" onclick="chooseAppr(this)">
										<label for="apprN" aria-label="승 인 불필요">불필요</label>
										<p>멤버들의 신청과 동시에 참여가 완료돼요.</p>
									</div>
								</div>
							</div>
						</div>
						
						<div class="row">
							<h3 class="secondLabel" aria-label="moimAge">
								<img src="/resources/img/form/peopleAgeIcon.png" alt="연령대 아이콘">
								연령대
								<span id="appendAgeRange" style="padding-left: 8px;">
									제한 없음
								</span>
								<span id="appendMaxAgeRange"></span>
							</h3>
			        <div slider id="slider-distance">
							  <div>
							    <div inverse-left style="width:70%;"></div>
							    <div inverse-right style="width:70%;"></div>
							    <div range style="left:0%;right:0%;"></div>
							    <span thumb style="left:0%;"></span>
							    <span thumb style="left:100%;"></span>
							    <div sign style="left:0%;">
							      <span id="value">15</span>
							    </div>
							    <div sign style="left:100%;">
							      <span id="value">50</span>
							    </div>
							  </div>
							  <input type="range" id="minAge" class="range1" tabindex="0" value="15" max="50" min="15" />
							  <input type="range" id="maxAge" class="range2" tabindex="0" value="50"  max="50" min="15" />
							</div>
							  <div class="scale">
							  	<span style="padding-left: 18px;">15</span>
							  	<span>20</span>
							  	<span style="padding-left: 32px;">25</span>
							  	<span>30</span>
							  	<span style="padding-left: 32px;">35</span>
							  	<span>40</span>
							  	<span style="padding-left: 32px;">45</span>
							  	<span style="padding-right: 0;">50+</span>
							  </div>
						</div>
						
						<div class="row">
							<h3 class="secondLabel">
								<img src="/resources/img/form/peopleCountIcon.png" alt="인원수 아이콘">
								인원수 (2명~30명)
							</h3>
							<div id="peopleInputContainer">
								<div>
					        <label for="minPeople" >최소 인원</label>
					        <input type="text" id="minPeople" class="basicInput register-p" placeHolder="숫자만 입력 가능">
								</div>
								<div style="margin-right: 10px;">
					        <label for="maxPeople" >최대 인원</label>
					        <input type="text" id="maxPeople" class="basicInput register-p" placeHolder="숫자만 입력 가능">
								</div>
							</div>
							<div id="noLimitContainer">
							  <button type="button" id="peopleNoLimit" class="parent" onclick="peopleNoLimit(this)">제한 없음</button>
							  <span id="bubble">👈 다시 누르면 입력창이 나와요</span>
							</div>
						</div>
						
						<div class="row">
							<h3 class="secondLabel" style="margin-bottom: 7px;">
							  <img src="/resources/img/form/peopleGenderIcon.png" alt="성별 아이콘" style="width: 16px;">
							  성별
							</h3>
							<div style="display: flex; margin-right: 10px;">
								<button type="button" class="genderBtn parent" data-gender="">누구나</button>
								<button type="button" class="genderBtn parent" data-gender="W">여자만</button>
								<button type="button" class="genderBtn parent" data-gender="M">남자만</button>
							</div>
						</div>
					
					<div class="btnContainer" style="margin-top: 30px;">
						<button type="button" class="waybtn prev" id="prev3">이전</button>
					  <button type="button" class="waybtn next" id="next3">다음</button>
					</div>
				</div>		
				
				<div id="step4">
					<div class="eachInputWrap">
						<label class="eachLabel" for="moimContent">
							<span class="required" aria-label="필수 입력값입니다.">⁕</span>
							모임 소개
						</label>
						<textarea id="summernote"></textarea>
						<div id="uploadFileBox">
							<ul id="uploadList"></ul>
						</div>
					</div>
					<div class="btnContainer" style="margin-top: 30px;">
						<button type="button" class="waybtn prev" id="prev4">이전</button>
					  <button type="button" class="waybtn next" id="submit">확인</button>
					</div>
				</div>
				
				</div>
			</div>
		</div>
	</div>
<input id="cateData" type="hidden" value="${cate}">
