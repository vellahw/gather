 document.addEventListener("DOMContentLoaded", function(){
 /**
  * 231224 장한원
  * 동적 슬라이드 버튼 생성
  */
  const contentsContainer = document.querySelector('.slideList');
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
 * 240109 장한원
 * 컨텐츠 슬라이더 (모임 4~8개)
 */
function contentsSlider() {
  const slideList = document.querySelector('.slideContentsWrap');  // Slide parent dom
  const slideContents = document.querySelectorAll('.eachContainer');  // each slide dom
  const slideBtnNext = document.querySelector('.arrowBtn left'); // next button
  const slideBtnPrev = document.querySelector('.arrowBtn right'); // prev button
  const slideLen = slideContents.length;  // slide length
  const slideWidth = 400; // slide width
  const slideSpeed = 300; // slide speed
  const startNum = 0; // initial slide index (0 ~ 4)
  
  slideList.style.width = slideWidth * (slideLen + 2) + "px";
  
  // Copy first and last slide
  let firstChild = slideList.firstElementChild;
  let lastChild = slideList.lastElementChild;
  let clonedFirst = firstChild.cloneNode(true);
  let clonedLast = lastChild.cloneNode(true);

  // Add copied Slides
  slideList.appendChild(clonedFirst);
  slideList.insertBefore(clonedLast, slideList.firstElementChild);

  // Add pagination dynamically
  let pageChild = '';
  for (var i = 0; i < slideLen; i++) {
    pageChild += '<li class="dot';
    pageChild += (i === startNum) ? ' dot_active' : '';
    pageChild += '" data-index="' + i + '"><a href="#"></a></li>';
  }
  
  slideList.style.transform = "translate3d(-" + (slideWidth * (startNum + 1)) + "px, 0px, 0px)";

  let curIndex = startNum; // current slide index (except copied slide)
  let curSlide = slideContents[curIndex]; // current slide dom
  curSlide.classList.add('slide_active');

  /** Next Button Event */
  slideBtnNext.addEventListener('click', function() {
    if (curIndex <= slideLen - 1) {
      slideList.style.transition = slideSpeed + "ms";
      slideList.style.transform = "translate3d(-" + (slideWidth * (curIndex + 2)) + "px, 0px, 0px)";
    }
    if (curIndex === slideLen - 1) {
      setTimeout(function() {
        slideList.style.transition = "0ms";
        slideList.style.transform = "translate3d(-" + slideWidth + "px, 0px, 0px)";
      }, slideSpeed);
      curIndex = -1;
    }
    curSlide.classList.remove('slide_active');
    curSlide = slideContents[++curIndex];
    curSlide.classList.add('slide_active');
  });

  /** Prev Button Event */
  slideBtnPrev.addEventListener('click', function() {
    if (curIndex >= 0) {
      slideList.style.transition = slideSpeed + "ms";
      slideList.style.transform = "translate3d(-" + (slideWidth * curIndex) + "px, 0px, 0px)";
    }
    if (curIndex === 0) {
      setTimeout(function() {
        slideList.style.transition = "0ms";
        slideList.style.transform = "translate3d(-" + (slideWidth * slideLen) + "px, 0px, 0px)";
      }, slideSpeed);
      curIndex = slideLen;
    }
    curSlide.classList.remove('slide_active');
    pageDots[(curIndex === slideLen) ? 0 : curIndex].classList.remove('dot_active');
    curSlide = slideContents[--curIndex];
    curSlide.classList.add('slide_active');
    pageDots[curIndex].classList.add('dot_active');
  });
};

});