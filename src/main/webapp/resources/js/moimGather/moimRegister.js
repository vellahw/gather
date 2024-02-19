document.addEventListener('DOMContentLoaded',()=>{

	/**
	 * summernote 에디터
	 */	
	$('#summernote').summernote({
		height: 300,                 // 에디터 높이
		minHeight: null,             // 최소 높이
		maxHeight: null,             // 최대 높이
		focus: false,                  // 에디터 로딩후 포커스를 맞출지 여부
		lang: "ko-KR",					// 한글 설정
		//placeholder: '최대 2048자까지 쓸 수 있습니다'	//placeholder 설정
				
	});

	/**
	 * 240219 장한원
	 * 카테고리 생성
	 */
	const cateValue = document.getElementById('cateData').value;
	const cateData = comObjectInArray(cateValue).result; // 카테고리 데이터

	// 카테고리들을 담고있는 최상위 노드
	const categoryListNode =  document.querySelector('.categoryList');
	
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
			childNode.dataset.code2 = item.CATE_CODE;

			const childNameNode = document.createElement('button');
			childNameNode.className = 'child';
			childNameNode.innerHTML = item.CATE_NAME;
		
			childNode.appendChild(childNameNode);
			document.querySelector(`[data-pcode=${item.PARENTS_CODE}]`).appendChild(childNode);
		}
	});


	// 카테고리 클릭 이벤트
	categoryListNode.addEventListener('click', (event)=>{
		const target = event.target;

		if(target.matches('[data-code1]')) {

			target.classList.toggle('level1_active');

			const targetChild = document.querySelector(`[data-pcode=${target.getAttribute('data-code1')}]`);
			targetChild.classList.toggle('level2_active');

		}
	})

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
					document.getElementById("moimRegion").value = addr;
					//상세주소 입력 폼으로 포커스 이동
					document.getElementById("moimDetailAddress").focus();
		
					// 주소 검색 후 지도에 마커 표시하기
					geocoder.addressSearch(addr, function(result, status) {
							
						// 정상적으로 검색이 완료됐으면 
						if (status === kakao.maps.services.Status.OK) {
								
							//위도, 경도 저장
							let letlng = new kakao.maps.LatLng(result[0].y, result[0].x);
						
							document.getElementById('moimDetailAddress').style.display = 'block';
							document.getElementById('moimRegion').style.display = 'block';
						
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
	})



});