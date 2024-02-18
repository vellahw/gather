document.addEventListener("DOMContentLoaded", function(){

  /**
  * 240103 장한원
  * 카테고리바 hover시 하위 카테고리 보여짐
  */
  const categoryItems = document.querySelectorAll('.categoryItem');

  categoryItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      const childList = item.querySelector('.childCateList');

      if (childList) {
        childList.style.opacity = '1';
        childList.style.zIndex = '999';
      }
    });

    item.addEventListener('mouseleave', () => {
      const childList = item.querySelector('.childCateList');

      if (childList) {
       childList.style.opacity = '0';
        childList.style.zIndex = '-1';
      }
    });
  });
  
  
  /*
  240124 강승현
  해당 카테고리 진입시 active
  */
  const params = new URL(location.href).searchParams;
  const cate = params.get('cate');  

    if (cate != 'all') {

      const pcate = cate.substring(0, 1);
      document.querySelector(`div[data-code="${pcate}"`).classList.add('active'); 

      if(cate.length == 3){ 

        document.querySelector(`li[data-code2="${cate}"`).classList.add('active');

      }

    } else {

      document.querySelector(`div[data-code="all"`).classList.add('active'); 

    }
  
});

/*
 240103 장한원
 카테고리바 클릭 이벤트
 240115 Hwai
*/
function cateOnclick(cateCode) {

  const currentURL = location.href;
  const params = new URL(location.href).searchParams;
  const comType = params.get('type'); 

  // URL에서 모든 type 및 cate 파라미터를 제거
  const newURL = currentURL.replace(/(\?|&)type=[^&]*/g, '').replace(/(\?|&)cate=[^&]*/g, '').replace(/(\?|&)keyword=[^&]*/g, '').replace(/(\?|&)pageNum=[^&]*/g, '');

  // type 및 cate 파라미터가 함께 추가되도록 조작
  if (comType) {
    location.href = newURL + '?type=' + comType + '&cate=' + cateCode;
  } else {
    location.href = newURL +  '?cate=' + cateCode;
  }
}
