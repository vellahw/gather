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
  const leftArrowBtn = document.getElementById('leftBtn');
  const rightArrowBtn = document.getElementById('rightBtn');
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

});