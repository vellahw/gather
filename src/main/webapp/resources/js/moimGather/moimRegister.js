document.addEventListener('DOMContentLoaded',()=>{

	/**
	 * summernote 에디터
	 *  */	
	$('#summernote').summernote({
		height: 300,                 // 에디터 높이
		minHeight: null,             // 최소 높이
		maxHeight: null,             // 최대 높이
		focus: true,                  // 에디터 로딩후 포커스를 맞출지 여부
		lang: "ko-KR",					// 한글 설정
		//placeholder: '최대 2048자까지 쓸 수 있습니다'	//placeholder 설정
				
	});

   
})