document.addEventListener("DOMContentLoaded", function(){

  /**
  * 240111 장한원
  * 컨텐츠 슬라이드
  */
  const slideContainer = document.querySelectorAll('.slideContainer'); // 리스트를 감싸는 부모
  let movePixel = 0;
  let currentListIndex = 0;
  
  slideContainer.forEach((slideContainer) => {

    const slideList = slideContainer.querySelectorAll('.slideList'); // 컨텐츠를 감싸는 리스트
    
    slideList.forEach((slideList)=>{

      function doSlide(currentIndex) {

        movePixel = 1056 * currentIndex;
        slideList.style.transform = `translateX(${movePixel}px)`; 
        slideList.style.transition = "all 400ms ease";
      
      }

      const slideContents = slideList.querySelectorAll('.slideContents'); // 컨텐츠
      let slideContentCount = slideContents.length;
      
      if(slideContentCount > 4) {

        for (let i=0; i < 4; i++) {

          const cloneSlide = slideContents[i].cloneNode(true);
          cloneSlide.dataset.clone = 'f';
          slideList.appendChild(cloneSlide);
        
        }

        const btn = slideContainer.querySelectorAll('.arrowBtn');
          
        btn.forEach(btn => {

          // 마우스 올리면 버튼 등장
          slideContainer.addEventListener('mouseenter', () => {
  
              btn.classList.add('btnHover');
            
          })
  
          // 마우스 떠나면 버튼 사라짐
          slideContainer.addEventListener('mouseleave', () => {
  
              btn.classList.remove('btnHover');
  
          })

          btn.addEventListener('click', ()=>{

            if(btn.classList.contains("left")){

              doSlide(-1);

            } else {

              doSlide(1);

            }
          })

        }) // END btn.forEach

      } // END  if(slideContentCount > 4)

    }) // END slideList.forEach

  }) // END slideContainer.forEach  


})