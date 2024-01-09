 document.addEventListener("DOMContentLoaded", function(){
  /**
   * 240109 장한원
   * 날씨에 따른 추천 타이틀 동적 생성 
   */
  const weatherTitleArea = document.getElementById('weatherTitle');
  weatherTitleArea.innerHTML = "구름 많은 흐린날";

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


  
  const leftArrowBtn = document.getElementById('leftBtn');
  const rightArrowBtn = document.getElementById('rightBtn');
});
  /**
   * 240110 장한원
   * 컨텐츠 슬라이더 (모임 4~8개)
  */
  const slides = document.querySelector('.slideList');
  const slideItems = document.querySelectorAll('.slideContents');

  const slideWidth = 264;
  let currentIndex = 0;

  
  // 왼쪽 버튼 클릭 시
  function prevSlide() {
    if (currentIndex > 0) {
      currentIndex--;
      slides.style.transform = 'translateX(-150px)';
    }
  }
  
  // 오른쪽 버튼 클릭 시
  function nextSlide() {
    if (currentIndex < slideItems.length - 4) {
      currentIndex++;
      slides.style.transform = 'translateX(150px)';
    }
  }