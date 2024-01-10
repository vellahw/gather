document.addEventListener("DOMContentLoaded", function(){
 /**
  * 231224 장한원
  * 동적 슬라이드 버튼 생성
  */
  // const contentsContainer = document.querySelector('.slideList');
  // const hiddenArrowBtn = document.querySelectorAll('.arrowBtn');
  // contentsContainer.addEventListener('mouseenter', () => {
  //   for (let i = 0; i < hiddenArrowBtn.length; i++) {
  //     hiddenArrowBtn[i].classList.add('btnHover');
  //   }
  // })
  // contentsContainer.addEventListener('mouseleave', () => {
  //   for (let i = 0; i < hiddenArrowBtn.length; i++) {
  //     hiddenArrowBtn[i].classList.remove('btnHover');
  //   }
  // })

  /**
  * 240110 장한원
  * 컨텐츠 슬라이드
  */
  const slideContainer = document.querySelectorAll('.slideContainer');
  const slideContents = document.querySelectorAll('.slideContents');
  const slideWidth = 1056;

  let currentIndex = 0;
  let slideContentCount = slideContents.length;

  slideContainer.forEach(slideContainer => {
    const btn = slideContainer.querySelectorAll('.arrowBtn');
    const slideList = slideContainer.querySelectorAll('.slideList');

    slideList.forEach((slideList)=>{
      btn.forEach(btn => {
        btn.addEventListener('click', ()=>{
          if(btn.classList.contains("left")){
            slideList.style.transition = "all 400ms";
            slideList.style.transform = "translateX("+ -slideWidth +"px)";
          } else {
            slideList.style.transition = "all 400ms";
            slideList.style.transform = "translateX("+ -slideWidth +"px)";
          }
        })
      })
    })
  })

  
});