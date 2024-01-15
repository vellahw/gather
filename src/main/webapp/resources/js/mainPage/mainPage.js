function contentsSlider(){

  /**
  * 240111 장한원
  * 컨텐츠 슬라이드
  */
  const slideContainer = document.querySelectorAll('.slideContainer'); // 리스트를 감싸는 부모
  
  slideContainer.forEach((slideContainer) => {

    const slideList = slideContainer.querySelectorAll('.slideList'); // 컨텐츠를 감싸는 리스트
    
    /* 리스트 제어 */
    slideList.forEach(slideList =>{

      const slideContents = slideList.querySelectorAll('.slideContents'); // 컨텐츠
      let slideContentCount = slideContents.length;

      // 컨텐츠가 4개 초과일 때
      if(slideContentCount > 4) {

        const btn = slideContainer.querySelectorAll('.arrowBtn'); // 화살표 버튼

        let currentIdx = 0; // 슬라이드 현재 번호
        let translate = 0; // 슬라이드 위치 값
        
        btn.forEach((btn) => {
          
          const targetB = slideContainer.querySelector('#rigthBtn');
          const targetleftB = slideContainer.querySelector('#leftBtn');
          
          slideContainer.addEventListener('mouseenter', () => {
            if(currentIdx > 0) {
              targetleftB.classList.add('_hover');
            }
              targetB.classList.add('_hover');
          })
          
          // 마우스 떠나면 버튼 사라짐
          slideContainer.addEventListener('mouseleave', () => {
            targetB.classList.remove('_hover');
          })
          
          /* 이벤트 등록 */
          btn.addEventListener('click', moveSlide);
        
          /* 버튼 클릭 이벤트 콜백 함수 */
          function moveSlide(event) {
            event.preventDefault();
            
            // 오른쪽 버튼 클릭시
            if(event.target.classList.contains("right")) {
              if (currentIdx !== 2) {
                currentIdx += 1;
                translate = 1056 * currentIdx;
                slideList.style.transform = `translateX(-${translate}px)`;
                slideList.style.transition = `all 400ms ease`
              }

              // 마지막 슬라이드라면 오른쪽 버튼 안 보이게함
              // if(currentIdx === 2) {
              //   event.target.style.opacity = '0';
              //   event.target.style.zIndex = '1';
              // }


            // 왼쪽 버튼 클릭시
            } else if(event.target.classList.contains("left")) {
                if (currentIdx !== 0) {
                  currentIdx -= 1; // 1 0
                  translate = 1056 * -currentIdx;
                  slideList.style.transform = `translateX(${translate}px)`;
                }
              }
          }
          
        }) // END btn.forEach

      } // END  if(slideContentCount > 4)

    }) // END slideList.forEach

  }) // END slideContainer.forEach  

}