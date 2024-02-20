/**
 * 게더 개설 폼 기능을 담당하는 파일
 */

document.addEventListener('DOMContentLoaded', ()=>{
  const categoryList = document.querySelector('.categoryList');

  let pickedCateData; // 유저가 선택한 카테고리 값을 담음

  // 자식 카테고리 클릭 이벤트
  categoryList.addEventListener('click', (event)=>{
    if(event.target.matches('[data-code2]')) {
      console.log('하위')
    }

    // pickedCateData = childNode.getAttribute('data-code2'); // 유저가 선택한 카테고리 코드 할당

    // if(document.querySelector('.picked_child')){
    //   document.querySelector('.picked_child').classList.remove('picked_child');
    // }

    // childNameNode.classList.toggle('picked_child');
  });
});