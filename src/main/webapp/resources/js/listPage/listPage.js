window.onload = function () {

  const scrollPosition = localStorage.getItem('scrollPosition') || 0;
  window.scrollTo(0, scrollPosition);
    
  // 마우스오버하면 모임 이미지 확대 효과
  const eachWrap = document.querySelectorAll('.eachWrap');
  eachWrap.forEach((eachCard) => {
      
    const thumnailImg = eachCard.querySelector('.thumnail');
    
    eachCard.addEventListener('mouseover', function() {
      thumnailImg.style.transform = 'scale(1.05)';
    });
  
    eachCard.addEventListener('mouseout', function() {
      thumnailImg.style.transform = 'scale(1)';
    });
    
  })
}


// 페이지를 떠날 때 스크롤 위치를 저장합니다.
window.onbeforeunload = function () {

    localStorage.setItem('scrollPosition', window.scrollY);

};