document.addEventListener('DOMContentLoaded',()=>{
	const cateValue = document.getElementById('cateData').value;
	const cateData = comObjectInArray(cateValue).result; // 카테고리 데이터
	const gatherCostNode = document.getElementById('moimCost'); // 참가비용 입력 input
	const categoryListNode =  document.querySelector('.categoryList'); // 카테고리들을 담고있는 ul tag
	
	/**
	 * 240219 장한원
	 * 모임 주제를 골라주세요 - 카테고리 생성
	 */
	// 카테고리 생성
	cateData.forEach(item => {

		// 부모 카테고리 생성 
		if(item.CATE_LEVL == '1') {

			const parentNode = document.createElement('li');
			parentNode.className = 'level1';
			parentNode.dataset.parentcode = item.CATE_CODE;

			const parentCateBtn = document.createElement('span');
			parentCateBtn.className = 'parent';
			parentCateBtn.dataset.code1 = item.CATE_CODE;
			
			const parentNameNode = document.createElement('span');
			parentNameNode.className = 'name';
			parentNameNode.innerHTML = item.CATE_NAME;
			parentNameNode.dataset.code1 = item.CATE_CODE;

			const parentIcon = document.createElement('img');
			parentIcon.className = 'cateImg';
			parentIcon.src = item.CATE_IMAG;
		
			parentCateBtn.appendChild(parentIcon);
			parentCateBtn.appendChild(parentNameNode);
			parentNode.appendChild(parentCateBtn);
			categoryListNode.appendChild(parentNode);

			// 자식 담을 ul 생성
			const childCateNode = document.createElement('ul');
			childCateNode.className = 'level2';
			childCateNode.dataset.pcode = item.PARENTS_CODE;
			 
			parentNode.appendChild(childCateNode);

		// 자식 카테고리 생성
		} else if(item.CATE_LEVL == '2') {
			const childNode = document.createElement('li');
			childNode.className = 'childWrap';

			const childNameNode = document.createElement('button');
			childNameNode.className = 'child';
			childNameNode.innerHTML = item.CATE_NAME;
			childNameNode.dataset.code2 = item.CATE_CODE;
		
			childNode.appendChild(childNameNode);
			document.querySelector(`[data-pcode=${item.PARENTS_CODE}]`).appendChild(childNode);
		}
	});

	/*
	 * 240225 장한원 
	 * 부모 카테고리 마우스오버/리브 이벤트
	 */
	const parentCategory = document.querySelectorAll('li[data-parentcode]');
	parentCategory.forEach(parent => {
		parent.addEventListener('mouseover', ()=>{
			
			const targetParentCode = parent.getAttribute('data-parentcode');
			
			if(document.querySelector('.parent_active')) {
				document.querySelector(`.parent[data-code1=${targetParentCode}]`).classList.remove('parent_active');
			}

			document.querySelector(`.parent[data-code1=${targetParentCode}]`).classList.add('parent_active');
			
			const targetChild = parent.querySelector(`ul[data-pcode=${targetParentCode}]`);
			targetChild.classList.add('level2_active');
		});
	});

	parentCategory.forEach(parent => {
		parent.addEventListener('mouseleave', ()=>{

			const targetParentCode = parent.getAttribute('data-parentcode');
			const targetChild = parent.querySelector(`ul[data-pcode=${targetParentCode}]`);

			document.querySelector(`.parent[data-code1=${targetParentCode}]`).classList.remove('parent_active');
			
			if(targetChild.classList.contains('level2_active')) {
				targetChild.classList.remove('level2_active');
			}
		});
	});

	/* 
	 * 자식 카테고리 클릭 이벤트
	 */
	const categoryList = document.querySelector('.categoryList');
	categoryList.addEventListener('click', (event)=>{
		const target = event.target;
	 
		if(target.matches('.child')) {
		 
			if(document.querySelector('.picked_child')){
				document.querySelector('.picked_child').classList.remove('picked_child');
				document.querySelector('.level1_active').classList.remove('level1_active');
			}
 
			target.classList.add('picked_child'); // 선택한 자식에 액티브 클래스 추가

			// 선택한 자식의 부모에 액티브 클래스 추가
			const parentCode = target.parentElement.parentElement.getAttribute('data-pcode');
			const targetParent = document.querySelector(`.parent[data-code1=${parentCode}]`);
			targetParent.classList.add('level1_active');

			// 선택한 카테고리 화면에 띄움
			const picekParent = targetParent.querySelector('.name').innerHTML;
			const pickedChild = document.querySelector('.picked_child').innerHTML;
			document.getElementById('addPickedCate').innerHTML = `${picekParent} | ${pickedChild}`;
			document.getElementById('addPickedCate').classList.add('addPicked');
		}
	});


	/**
	 * 240220 장한원
	 * step2 클릭 이벤트
	*/
	document.getElementById('step2').addEventListener('click', (event)=>{
    const target = event.target;
		
		// 참가비 클릭 이벤트
		if(target.classList.contains('costBtn')) {

			comRemoveActiveClass('.cost_act', 'cost_act');

			target.classList.toggle('cost_act');

			// 비용 입력하는 input 띄움
			if(target.matches('[data-cost="Y"]')) {
				gatherCostNode.classList.add('block_element');
			} else if(target.matches('[data-cost="N"]')) {
				gatherCostNode.classList.remove('block_element');
			}
		}

		// 온라인/오프라인 모임 장소 클릭
		if(target.classList.contains('locaBtn')) {
			
			comRemoveActiveClass('.loca_act', 'loca_act');

			target.classList.toggle('loca_act');
			
			if(target.id == 'offline') {
				document.querySelector('.searchMap').classList.add('block_element');
			} else {
				document.querySelector('.searchMap').classList.remove('block_element');
				document.getElementById('map').classList.remove('show_kamap');
			}
		}

  });

	/*
	 * 참가비 input 천원 단위로 콤마 찍어줌
	 */
	gatherCostNode.addEventListener('input', (event)=>{
		const target = event.target;
		const originalValue = target.value;
			
		// 숫자가 아닌 문자 제거
		const cleanedValue = originalValue.replace(/[^0-9]/g, '');
			
		// 쉼표 추가
		const formattedValue = cleanedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
			
		// 입력 값을 대체
		target.value = formattedValue;
	});

	/* 
	 * moinDate
	 * 오늘 날짜 이전 날짜는 선택 불가능하게
	*/
	const today = comSetMinDate().today;
	document.getElementById("moimDate").setAttribute("min", today);


	/* 카카오맵 지도 띄우기 */
	const container = document.getElementById('map');
	const options = { //지도를 생성할 때 필요한 기본 옵션
		center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 기본 중심좌표
		level: 3 //지도의 레벨(확대, 축소 정도)
	};

	const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴 	

	/* 다음 주소검색 및 마커 표시 */
	const geocoder = new kakao.maps.services.Geocoder();

	/* 주소 검색 onclick */
	const searchMapBtn = document.querySelector('.searchMap');
	searchMapBtn.addEventListener('click', ()=>{
		
		const width = 500; //팝업의 너비
		const height = 600; //팝업의 높이
		new daum.Postcode({
				width: width, 
				height: height,
			
				oncomplete: function(data) {
					let addr = ''; // 주소 변수
					let extraAddr = ''; // 참고항목 변수

					//사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져옴
					if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
						addr = data.roadAddress;
					} else { // 사용자가 지번 주소를 선택했을 경우(J)
						addr = data.jibunAddress;
					}

					// 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합
					if(data.userSelectedType === 'R'){
						// 법정동명이 있을 경우 추가 (법정리는 제외)
						// 법정동의 경우 마지막 문자가 "동/로/가"로 끝남
						if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
							extraAddr += data.bname;
						}
						// 건물명이 있고, 공동주택일 경우 추가
						if(data.buildingName !== '' && data.apartment === 'Y'){
							extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
						}
						// 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만듦
						if(extraAddr !== ''){
								extraAddr = ' (' + extraAddr + ')';
						}
					}
					
					// 우편번호와 주소 정보를 해당 필드에 넣음
					document.getElementById("moimAddress").value = addr;
					//상세주소 입력 폼으로 포커스 이동
					document.getElementById("moimDetailAddress").focus();
					
					// 주소 검색 후 지도에 마커 표시하기
					geocoder.addressSearch(addr, function(result, status) {
							
						// 정상적으로 검색이 완료됐으면 
						if (status === kakao.maps.services.Status.OK) {
							
							document.getElementById("map").classList.add('show_kamap');
							map.relayout();
							
							let letlng = new kakao.maps.LatLng(result[0].y, result[0].x); // 위도+경도
							let gatherLati = result[0].y; // 위도
							let gatherLong = result[0].x; // 경도
						
							document.getElementById('moimAddress').style.display = 'block';
							document.getElementById('moimDetailAddress').style.display = 'block';

							// 위도 경도 hidden input 값 채움
							document.getElementById('moimLati').value = gatherLati;
							document.getElementById('moimLong').value = gatherLong;

							// 결과값으로 받은 위치를 마커로 표시
							let marker = new kakao.maps.Marker({
								map: map,
								position: letlng
							});
						
							// 인포윈도우로 장소에 대한 설명을 표시
							let infowindow = new kakao.maps.InfoWindow({
									content: '<div style="width:150px;text-align:center;padding:6px 0;">'+addr+'</div>'
							});
							infowindow.open(map, marker);
						
							// 지도의 중심을 결과값으로 받은 위치로 이동
							map.setCenter(letlng);

						} 
					}); 
				}
		}).open({
			//팝업 가운데 정렬
			left: (window.screen.width / 2) - (width / 2),
			top: (window.screen.height / 2) - (height / 2),
			//팝업창 타이틀 지정
			popupTitle: '모임 장소 검색하기'
		});
	});


	/**
	 * 240220 장한원
	 * 연령 선택 range 슬라이더
	 */
	const range1 = document.querySelector('.range1');
	const range2 = document.querySelector('.range2');
	const appendMaxAgeRange = document.getElementById('appendMaxAgeRange');
	const appendAgeRangeNode = document.getElementById('appendAgeRange');

	let minRange = '15';
	let maxRange = '50';

	range1.addEventListener('input', (event)=>{
		const target = event.target;
		
		target.value = Math.min(target.value, target.parentNode.childNodes[5].value-1);
		let value = (100/(parseInt(target.max)-parseInt(target.min)))*parseInt(target.value)-(100/(parseInt(target.max)-parseInt(target.min)))*parseInt(target.min);
		let children = target.parentNode.childNodes[1].childNodes;
		children[1].style.width = value + '%';
		children[5].style.left = value + '%';
		children[7].style.left = value + '%';
		children[11].style.left = value + '%';
		children[11].childNodes[1].innerHTML = target.value;
		
	});
	
	range1.addEventListener('change', (event)=>{ // 최소 연령 화면에 띄움
		const target = event.target;
		
		minRange = target.value;
		
		appendAgeRangeNode.innerHTML = minRange + '세~';

		if(minRange == '15' && maxRange == '50') {
			appendAgeRangeNode.innerHTML = '제한 없음';
			appendMaxAgeRange.innerHTML = '';
		} else if(maxRange == '50') {
			appendMaxAgeRange.innerHTML = '50세 이상';
		}

	});
	
	range2.addEventListener('input', (event)=>{
		const target = event.target;
		
		target.value = Math.max(target.value,target.parentNode.childNodes[3].value-(-1));
		let value = (100/(parseInt(target.max)-parseInt(target.min)))*parseInt(target.value)-(100/(parseInt(target.max)-parseInt(target.min)))*parseInt(target.min);
		let children = target.parentNode.childNodes[1].childNodes;
		children[3].style.width = (100-value) + '%';
		children[5].style.right = (100-value) + '%';
		children[9].style.left = value + '%';
		children[13].style.left = value + '%';
		
		if(target.value == '50') {
			children[13].childNodes[1].innerHTML = target.value + '+';
		} else {
			children[13].childNodes[1].innerHTML = target.value;
		}
		
	});
	
	range2.addEventListener('change', (event)=>{ // 최대 연령 화면에 띄움
		const target = event.target;
		
		maxRange = target.value;

		appendMaxAgeRange.innerHTML = maxRange + '세';

		if(minRange == '15' && maxRange == '50') {
			appendMaxAgeRange.innerHTML = '';
			appendAgeRangeNode.innerHTML = '제한 없음';
		} else if(minRange == '15') {
			appendAgeRangeNode.innerHTML = '15세~';
		}

	});


	/**
	 * 240224 장한원
	 * 성별 버튼 클릭 이벤트 
	 */
	document.getElementById('step3').addEventListener('click', (event)=>{
		const target = event.target;

		if(target.matches('[data-gender]')){

			if(document.querySelector('.gender_act')) {
				document.querySelector('.gender_act').classList.remove('gender_act');
			}

			target.classList.add('gender_act');
		}
	});
	
});


// ======= DOMContentLoaded 후 아님 =======

/**
 * 다음(이전) 버튼 클릭 시 show_step 클래스 삭제하거나 추가하는 함수
 */
const showStep = function(removeTarget, addTarget) {
	removeTarget.classList.remove('show_step');
	addTarget.classList.add('show_step');

	// 이전/다음 버튼 컨테이너
	removeTarget.querySelector('.btnContainer').classList.remove('btnContainer_act');
	addTarget.querySelector('.btnContainer').classList.add('btnContainer_act');
}

/*
 * 240224 장한원
 * 참여 승인제 클릭 이벤트
 */
const chooseAppr = function(element) {

	comRemoveActiveClass('.appr_act', 'appr_act');
	
	// active 클래스 추가
	element.classList.add('appr_act');

}

/*
 * 240224 장한원
 * 참여 승인제 클릭 이벤트
 */
const peopleNoLimit = function(element) {
	
	element.classList.toggle('picked_noLimit');
	
	document.getElementById('peopleInputContainer').classList.toggle('none_element'); // input 가리기 toggle
	document.getElementById('bubble').classList.toggle('show_flex_element'); // 안내문구 띄우기 toggle

}