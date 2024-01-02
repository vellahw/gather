
document.addEventListener("DOMContentLoaded", function(){

  /**
  * 231224 장한원
  * 동적 카테고리 생성
  */
  const contentsContainer = document.querySelector('.slideContentsWrap');
  const hiddenArrowBtn = document.querySelectorAll('.arrowBtn');
  
  contentsContainer.addEventListener('mouseenter', () => {
    for (let i = 0; i < hiddenArrowBtn.length; i++) {
      hiddenArrowBtn[i].classList.add('btnHover');
    }
  })
  
  contentsContainer.addEventListener('mouseleave', () => {
    for (let i = 0; i < hiddenArrowBtn.length; i++) {
      hiddenArrowBtn[i].classList.remove('btnHover');
    }
  })

  /**
  * 231229 장한원
  * 카테고리바 hover시 하위 카테고리 보여짐
  */

})