function contentsSlider(){

  /**
  * 240111 장한원
  * 컨텐츠 슬라이드
  */
  const slideContainer = document.querySelectorAll('.slideContainer'); // 리스트를 감싸는 부모
  slideContainer.forEach((slideContainer) => {

    const slideList = slideContainer.querySelectorAll('.slideList'); // 컨텐츠를 감싸는 리스트
    
    /* 리스트 제어 */
    slideList.forEach((slideList)=>{

      const slideContents = slideList.querySelectorAll('.slideContents'); // 컨텐츠
      let slideContentCount = slideContents.length;
      
      if(slideContentCount > 4) {

        slideList.style.transform = "translateX(-1056px)";
        slideContents.forEach((slideContents, i)=>{

          slideContents.dataset.index = i;
    
          if(slideContents.dataset.index < 4){

            const cloneSlide = slideContents.cloneNode(true);
            //cloneSlide.dataset.clone = 'b';
            cloneSlide.dataset.index = i + slideContentCount;
            slideList.appendChild(cloneSlide);

          } else {
              
            const cloneSlide = slideContents.cloneNode(true);
            //cloneSlide.dataset.clone = 'f';
            cloneSlide.dataset.index = i - slideContentCount;
            const firstSlide = slideList.querySelector("[data-index='0']")
            slideList.insertBefore(cloneSlide, firstSlide);

          }

        })

        const btn = slideContainer.querySelectorAll('.arrowBtn'); // 화살표 버튼
          
        /* 버튼 제어 */
        btn.forEach((btn) => {
          
          // 마우스 올리면 버튼 등장
          slideContainer.addEventListener('mouseenter', () => {
              btn.classList.add('_hover');
          })
  
          // 마우스 떠나면 버튼 사라짐
          slideContainer.addEventListener('mouseleave', () => {
              btn.classList.remove('_hover');
          })

          // 클릭 이벤트 등록
          btn.addEventListener('click', moveSlide); 
          
          let currentIdx = 0; // 현재 인덱스
          let translate = 0;  // 슬라이드 이동값

          /* 슬라이드 실행 */
          function move(curIdx) {

            currentIdx += (-1 * curIdx); // c = c + (-1 * -1)
            translate += 1056 * curIdx; // tl = tl + 1056 * -1
            
            slideList.style.transform = `translateX(${translate}px * ${currentIdx})`;
            slideList.style.transition = `all .4ms ease`

          }
          
          /* 클릭 이벤트 함수 */
          function moveSlide(event) {

            event.preventDefault();

            if (event.target.classList.contains("left")) {
              currentIdx = -2;
              translate = 1056 * currentIdx;
              slideList.style.transform = `translateX(${translate}px)`; // 1056 * -2
              slideList.style.transition = `all 400ms ease`


              // move(-1);
              // if (currentIdx === 2)
              //   setTimeout(() => {
              //     slideList.style.transition = 'none';
              //     currentIdx = 1;
              //     translate = -1056;
              //     slideList.style.transform = `translateX(${translate}px)`;
              //   }, speedTime);
                
            } else {
              currentIdx = 0;
              translate = 1056 * currentIdx;
              slideList.style.transform = `translateX(${translate}px)`; // 1056 * 2
              slideList.style.transition = `all 400ms ease`
             
              //move(1);
              // if (currentIdx === 0) {
          
              //   setTimeout(() => {
    
              //     slideList.style.transition = 'none';
              //     currentIdx = 2;
              //     translate = -(1056 * currentIdx);
              //       slideList.style.transform = `translateX(${translate}px)`;
    
              //   }, speedTime);
              // }


            }
          }

        }) // END btn.forEach

      } // END  if(slideContentCount > 4)

    }) // END slideList.forEach

  }) // END slideContainer.forEach  


}