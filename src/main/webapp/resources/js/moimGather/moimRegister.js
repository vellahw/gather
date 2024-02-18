document.addEventListener('DOMContentLoaded',()=>{

	/**
	 * summernote 에디터
	 */	
	$('#summernote').summernote({
		height: 300,                 // 에디터 높이
		minHeight: null,             // 최소 높이
		maxHeight: null,             // 최대 높이
		focus: true,                  // 에디터 로딩후 포커스를 맞출지 여부
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
			parentNode.className = 'level1'
			parentNode.dataset.parentcode = item.CATE_CODE;

			const parentCateBtn = document.createElement('span');
			parentCateBtn.className = 'parent'
			
			const parentNameNode = document.createElement('span');
			parentNameNode.className = 'name';
			parentNameNode.innerHTML = item.CATE_NAME;
			parentNameNode.dataset.code1 = item.CATE_CODE;
		
			parentCateBtn.appendChild(parentNameNode)
			parentNode.appendChild(parentCateBtn)
			categoryListNode.appendChild(parentNode);

			// 자식 담을 ul 생성
			const childCateNode = document.createElement('ul');
			childCateNode.className = 'level2';
			childCateNode.dataset.pcode = item.PARENTS_CODE;
			 
			parentNode.appendChild(childCateNode);

		// 자식 카테고리 생성
		} else if(item.CATE_LEVL == '2') {
			const childNode = document.createElement('li');
			childNode.className = 'childWrap'
			childNode.dataset.code2 = item.CATE_CODE;

			const childNameNode = document.createElement('button');
			childNameNode.className = 'child';
			childNameNode.innerHTML = item.CATE_NAME;
		
			childNode.appendChild(childNameNode)
			document.querySelector(`[data-pcode=${item.PARENTS_CODE}]`).appendChild(childNode);
		}
	});


	// 카테고리 클릭 이벤트
	categoryListNode.addEventListener('click', (event)=>{
		const target = event.target;

		console.log(target)
		
		if(target.matches('[data-code1]')) {

			target.classList.toggle('clicked');

			const targetChild = document.querySelector(`[data-pcode=${target.getAttribute('data-code1')}]`);
			targetChild.classList.toggle('level2_active');

		}
	})




});