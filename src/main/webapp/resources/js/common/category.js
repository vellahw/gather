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

  if(cate){

      if (cate != 'all') {

        const pcate = cate.substring(0, 1);
        document.querySelector(`div[data-code="${pcate}"`).classList.add('active'); 

        if(cate.length == 3){ 

          document.querySelector(`li[data-code2="${cate}"`).classList.add('active');

        }

      } else {

        document.querySelector(`div[data-code="all"`).classList.add('active'); 

      }
  }
  
});

/*
 240103 장한원
 카테고리바 클릭 이벤트
 240115 Hwai
*/
function cateOnclick(cateCode) {
  const baseURL = '/gatherList.com'; // 항상 /gatherList.com으로 리디렉션
  const currentURL = location.href; // 현재 URL 가져오기
  const params = new URL(currentURL).searchParams; // 현재 URL의 파라미터 가져오기
  const comType = params.get('type'); // 기존 type 파라미터 가져오기

  // 새로운 URL 생성
  let newURL = baseURL;

  // 필요한 파라미터 추가
  if (comType) {
    newURL += `?type=${comType}&cate=${cateCode}`;
  } else {
    newURL += `?cate=${cateCode}`;
  }

  // 새 URL로 리디렉션
  location.href = newURL;
}
