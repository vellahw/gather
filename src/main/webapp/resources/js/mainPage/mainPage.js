document.addEventListener("DOMContentLoaded", function(){

  /**
  * 240111 장한원
  * 컨텐츠 슬라이드
  */
  const slideContainer = document.querySelectorAll('.slideContainer'); // 리스트를 감싸는 부모
  let movePixel = 0;
  let currentListIndex = 0;
  console.log("현재 currentListIndex " + currentListIndex);
  
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

          btn.addEventListener('click', ()=>{
            // 왼쪽(이전) 클릭
            if(btn.classList.contains("left")){

              if (currentListIndex != 0) {
                currentListIndex--;
              } else {
                currentListIndex = 2;
                slideList.style.transform = `translateX(-${1056 * currentListIndex}px)`;
              }
            
              slideList.style.transform = `translateX(-${1056 * currentListIndex}px)`;
              slideList.style.transition = "all 400ms ease";

              // 오른쪽(다음) 클릭
            } else {
              if (currentListIndex < 2) {
                currentListIndex++;
              } else {
                currentListIndex = 0;
              }

              slideList.style.transform = `translateX(-${1056 * currentListIndex}px)`;
              slideList.style.transition = "all 400ms ease";

            }
          })

        }) // END btn.forEach

      } // END  if(slideContentCount > 4)

    }) // END slideList.forEach

  }) // END slideContainer.forEach  


})