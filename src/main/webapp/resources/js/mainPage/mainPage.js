function contentsSlider(){

  /**
  * 240111 장한원
  * 컨텐츠 슬라이드
  */
  const slideContainer = document.querySelectorAll('.slideContainer'); // 리스트를 감싸는 부모
  
  slideContainer.forEach((slideContainer) => {
    let currentIndex = 0; // 현재 인덱스
    let translate = 0;  // 슬라이드 이동값

    const slideList = slideContainer.querySelectorAll('.slideList'); // 컨텐츠를 감싸는 리스트
    
    /* 리스트 제어 */
    slideList.forEach(slideList =>{

      const slideContents = slideList.querySelectorAll('.slideContents'); // 컨텐츠
      let slideContentCount = slideContents.length;
      let count = slideContentCount - 4;

      if(count > 4) {
        slideList.dataset.curIdx = 2;
      } else if(count > 0){
        slideList.dataset.curIdx = 1;
      } else {
        slideList.dataset.curIdx = 0;
      }

      // 컨텐츠가 4개 초과일 때
      if(slideContentCount > 4) {

        slideContents.forEach((slideContents, i)=>{
          // const targetContentsIndex = slideContents.getAttribute('data-index');
        })

        const rightBtn = slideContainer.querySelectorAll('#rigthBtn');
        const leftBtn = slideContainer.querySelectorAll('#leftBtn');

        rightBtn.forEach(rightBtn => {

           // 마우스 올리면 오른쪽 버튼 등장
          slideContainer.addEventListener('mouseenter', () => {
            rightBtn.classList.add('_hover');
          })

          // 마우스 떠나면 버튼 사라짐
          slideContainer.addEventListener('mouseleave', () => {
            rightBtn.classList.remove('_hover');
          })

          // 클릭 이벤트 등록
          rightBtn.addEventListener('click', nextSlide)

        })

        function nextSlide() {
          const slideCurrentIdx = slideList.getAttribute('data-cur-idx');
          currentIndex++;
          
          if(currentIndex <= slideCurrentIdx) {
            translate = 1056 * currentIndex;
            slideList.style.transform = `translateX(-${translate}px)`;
            slideList.style.transition = `all 400ms ease`
          } else if(currentIndex > slideCurrentIdx) {
            currentIndex=0;
            translate = 1056 * currentIndex;
            slideList.style.transform = `translateX(-${translate}px)`;
            slideList.style.transition = `all 400ms ease`
          }
        }

        // if(currentIndex != 0){
        //   leftBtn.forEach(leftBtn =>{
        //     // 마우스 올리면  쪽 버튼 등장
        //     slideContainer.addEventListener('mouseenter', () => {
        //       leftBtn.classList.add('_hover');
        //     })

        //   })
        // }

        
        // const btn = slideContainer.querySelectorAll('.arrowBtn'); // 화살표 버튼
        
        // /* 버튼 제어 */
        // btn.forEach((btn) => {
          
        //   // 마우스 올리면 버튼 등장
        //   slideContainer.addEventListener('mouseenter', () => {
        //       btn.classList.add('_hover');
        //   })
  
        //   // 마우스 떠나면 버튼 사라짐
        //   slideContainer.addEventListener('mouseleave', () => {
        //       btn.classList.remove('_hover');
        //   })

        //   // 클릭 이벤트 등록
        //   btn.addEventListener('click', moveSlide); 
          
        //   let currentIdx = 0; // 현재 인덱스
        //   let translate = 0;  // 슬라이드 이동값

        //   /* 슬라이드 실행 */
        //   function move(curIdx) {

        //     currentIdx += (-1 * curIdx); // c = c + (-1 * -1)
        //     translate += 1056 * curIdx; // tl = tl + 1056 * -1
            
        //     slideList.style.transform = `translateX(${translate}px * ${currentIdx})`;
        //     slideList.style.transition = `all .4ms ease`

        //   }
          
        //   /* 클릭 이벤트 함수 */
        //   function moveSlide(event) {

        //     event.preventDefault();

        //     if (event.target.classList.contains("left")) {
              
        //       currentIdx = -1;
        //       translate = 1056 * (currentIdx * 2);
        //       slideList.style.transform = `translateX(${translate}px)`; // 1056 * -2
        //       slideList.style.transition = `all 400ms ease`

        //       // if(currentIdx == -1) {
        //       //   setTimeout(() => {
        //       //     slideList.style.transition = 'none';
        //       //     currentIdx = 0;
        //       //     translate = -1056;
        //       //     slideList.style.transform = `translateX(${translate}px)`;
        //       //   }, 400);
        //       // }

        //       // move(-1);
        //       // if (currentIdx === 2)
        //       //   setTimeout(() => {
        //       //     slideList.style.transition = 'none';
        //       //     currentIdx = 1;
        //       //     translate = -1056;
        //       //     slideList.style.transform = `translateX(${translate}px)`;
        //       //   }, speedTime);
                
        //     } else {

        //       currentIdx = 0;
        //       translate = 1056 * currentIdx;
        //       slideList.style.transform = `translateX(${translate}px)`; // 1056 * 2
        //       slideList.style.transition = `all 400ms ease`
             
        //       //move(1);
        //       // if (currentIdx === 0) {
          
        //       //   setTimeout(() => {
    
        //       //     slideList.style.transition = 'none';
        //       //     currentIdx = 2;
        //       //     translate = -(1056 * currentIdx);
        //       //       slideList.style.transform = `translateX(${translate}px)`;
    
        //       //   }, speedTime);
        //       // }


        //     }
        //   }

        // }) // END btn.forEach

      } // END  if(slideContentCount > 4)

    }) // END slideList.forEach

  }) // END slideContainer.forEach  

}