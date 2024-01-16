/**
 * 
 */
document.addEventListener("DOMContentLoaded", function(){
  const slideContainer =  document.querySelector('.slideContainer');
  const imgSlideList = slideContainer.querySelector('.imgSlideList');
  const imgWrap = slideContainer.querySelector('.imgWrap');
  const img = imgWrap.querySelectorAll('img');
  const imgLength = img.length;
  const moveButton = slideContainer.querySelectorAll('.arrowBtn');

  /* 클론 */
  const clone1 = img[0].cloneNode(true);
  const cloneLast = img[imgLength - 1].cloneNode(true);
  imgWrap.appendChild(clone1);
  imgWrap.insertBefore(cloneLast, img[0]);

  /* 주요 변수 초기화 */  
  let currentIdx = 0;
  let translate = 0;
  const speedTime = 400;

  /* CSSOM 셋업 */
  const imgSlideListCloneLis = imgSlideList.querySelectorAll('imgWrap');
  const liWidth = img[0].clientWidth;
  const sliderWidth = liWidth * imgSlideListCloneLis.length;
  // imgWrap.style.width = `${sliderWidth}px`;
  currentIdx = 1;
  translate = -liWidth;
  imgWrap.style.transform = `translateX(${translate}px)`

  /* 리스너 설치하기 */
  moveButton.forEach(moveButton=>{
    moveButton.addEventListener('click', moveSlide);
  })

  /* 슬라이드 실행 */
  function move(D) {
    currentIdx += (-1 * D);
    translate += liWidth * D;
    imgWrap.style.transform = `translateX(${translate}px)`;
    imgWrap.style.transition = `all ${speedTime}ms ease`
  }

  /* 클릭 버튼 */
  function moveSlide(event) {
    event.preventDefault();
    if (event.target.classList.contains('right')) {
      move(-1);
      if (currentIdx === imgSlideListCloneLis.length -1)
        setTimeout(() => {
            imgWrap.style.transition = 'none';
            currentIdx = 1;
            translate = -liWidth;
            imgWrap.style.transform = `translateX(${translate}px)`;
          }, speedTime);
      } else {
        move(1);
        if (currentIdx === 0) {
          setTimeout(() => {
            imgWrap.style.transition = 'none';
            currentIdx = imgSlideListCloneLis.length -2;
            translate = -(liWidth * currentIdx);
            imgWrap.style.transform = `translateX(${translate}px)`;
          }, speedTime);
        }
    }
  }
})
