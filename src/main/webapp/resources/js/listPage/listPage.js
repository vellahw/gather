window.onload = function () {

  const scrollPosition = localStorage.getItem('scrollPosition') || 0;
  window.scrollTo(0, scrollPosition);
    
  const eachWrap = document.querySelectorAll('.eachWrap');
  eachWrap.forEach((eachCard) => {

    // 모임 마감되면 어두운 필터 적용
    addEndfilter(eachCard);
    
    // 마우스오버하면 모임 이미지 확대 효과
    const thumnailImg = eachCard.querySelector('.thumnail');
    
    eachCard.addEventListener('mouseover', function() {
      thumnailImg.style.transform = 'scale(1.05)';
    });
  
    eachCard.addEventListener('mouseout', function() {
      thumnailImg.style.transform = 'scale(1)';
    });


    
  })
}

/**
  * 240130 장한원
  * 마감 여부에 따른 썸네일 이미지 필터 적용
*/
function addEndfilter(element) {
  const thumnailContainer = element.querySelector('.thumnailContainer');
  const endValue = thumnailContainer.querySelector('.thumnail');
  let getValue = endValue.getAttribute('data-end');

  if(getValue == 'Y') {
    thumnailContainer.classList.add('end');
  }
  
}


// 페이지를 떠날 때 스크롤 위치를 저장합니다.
window.onbeforeunload = function () {

    localStorage.setItem('scrollPosition', window.scrollY);

};