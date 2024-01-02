
document.addEventListener("DOMContentLoaded", function(){
  /**
  * 231224 장한원
  * 동적 슬라이드 버튼 생성
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
  * 240102 장한원
  * 카테고리바 hover시 하위 카테고리 보여짐
  */
// categoryContainer 요소를 선택합니다.
const categoryContainer = document.getElementById('categoryContainer');

// 마우스 진입 이벤트를 부여합니다.
categoryContainer.addEventListener('mouseenter', (event) => {
  // 마우스 이벤트가 발생한 요소를 확인합니다.
  const target = event.target;

  console.log(target)

  // categoryItem 클래스를 가진 요소인지 확인합니다.
  if (target.classList.contains('categoryItem')) {
    // 해당 요소의 자식 요소들을 선택합니다.
    const childList = target.querySelector('.childCateList');
    const parentsHover = target.querySelector('.parentsHover');

    // 자식 요소들과 parentsHover 요소를 보이게 만듭니다.
    if (childList) {
      childList.style.display = 'block';
    }
    if (parentsHover) {
      parentsHover.style.display = 'block';
    }
  }
});

// 마우스 벗어남 이벤트를 부여합니다.
categoryContainer.addEventListener('mouseleave', (event) => {
  const target = event.target;

  if (target.classList.contains('categoryItem')) {
    const childList = target.querySelector('.childCateList');
    const parentsHover = target.querySelector('.parentsHover');

    if (childList) {
      childList.style.display = 'none';
    }
    if (parentsHover) {
      parentsHover.style.display = 'none';
    }
  }
});

})