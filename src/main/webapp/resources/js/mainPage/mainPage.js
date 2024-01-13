function contentsSlider(){

  /**
  * 240111 장한원
  * 컨텐츠 슬라이드
  */
  const slideContainer = document.querySelectorAll('.slideContainer'); // 리스트를 감싸는 부모
  let movePixel = 0;
  let currentIdx = 0;
  let translate = 0;
  const speedTime = 500;
  
  slideContainer.forEach((slideContainer) => {

    const slideList = slideContainer.querySelectorAll('.slideList'); // 컨텐츠를 감싸는 리스트
    
    slideList.forEach((slideList)=>{

      const slideContents = slideList.querySelectorAll('.slideContents'); // 컨텐츠
      let slideContentCount = slideContents.length;
      
      if(slideContentCount > 4) {

          slideContents.forEach((slideContents, i)=>{

            slideContents.dataset.index = i;
              if(slideContents.dataset.index < 4){

                const cloneSlide = slideContents.cloneNode(true);
                cloneSlide.dataset.clone = 'b';
                cloneSlide.dataset.index = i + slideContentCount;
                slideList.appendChild(cloneSlide);

              } else {

                const cloneSlide = slideContents.cloneNode(true);
                cloneSlide.dataset.clone = 'f';
                cloneSlide.dataset.index = '';
                const firstSlide = slideList.querySelector("[data-index='0']")
                slideList.insertBefore(cloneSlide, firstSlide);

              }

          })

        const btn = slideContainer.querySelectorAll('.arrowBtn');
          
        btn.forEach(btn => {

          // 마우스 올리면 버튼 등장
          slideContainer.addEventListener('mouseenter', () => {
              btn.classList.add('_hover');
          })
  
          // 마우스 떠나면 버튼 사라짐
          slideContainer.addEventListener('mouseleave', () => {
              btn.classList.remove('_hover');
          })

          btn.addEventListener('click', moveSlide);

          /* 슬라이드 실행 */
          function move(D) {
            currentIdx += (-1 * D);
            translate += 1056 * D;
            slideList.style.transform = `translateX(${translate}px)`;
            slideList.style.transition = `all ${speedTime}ms ease`
          }

          /* 클릭 버튼 */
          function moveSlide(event) {
            event.preventDefault();
            if (event.target.classList.contains("left")) {
              move(-1);
              if (currentIdx === 2)
                setTimeout(() => {
                  slideList.style.transition = 'none';
                  currentIdx = 1;
                  translate = -1056;
                  slideList.style.transform = `translateX(${translate}px)`;
                }, speedTime);
                console.log(currentIdx)
            } else {
                move(1);
                if (currentIdx === 0) {
                  setTimeout(() => {
                    slideList.style.transition = 'none';
                    currentIdx = 2;
                    translate = -(1056 * currentIdx);
                    slideList.style.transform = `translateX(${translate}px)`;
                  }, speedTime);
                }
                console.log(currentIdx)
              }
          }

          console.log(currentIdx)

        }) // END btn.forEach

      } // END  if(slideContentCount > 4)

    }) // END slideList.forEach

  }) // END slideContainer.forEach  


}