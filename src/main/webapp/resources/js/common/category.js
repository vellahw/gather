document.addEventListener("DOMContentLoaded", function(){

  /*
  240103 장한원
  카테고리바 hover시 하위 카테고리 보여짐
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
  const PCATE_C0DE = document.querySelectorAll('#pcode');
  const CCATE_CODE = document.querySelectorAll('#ccode');

  const params = new URL(location.href).searchParams;
  const ccate = params.get('cate');  
  const pcate = ccate.substring(0, 1); 

  // 부모 카테고리에 대한 처리
for (let i = 0 ; PCATE_C0DE.length ; i++) {
  if (PCATE_C0DE[i].value === pcate) {
      
  }
}

// 자식 카테고리에 대한 처리
for (let i = 0 ; CCATE_CODE.length ; i++) {
  if (CCATE_CODE[i].value === ccate) {
   
  }
}

});

/*
 240103 장한원
 카테고리바 클릭 이벤트
 240115 Hwai
*/
function cateOnclick(cateCode) {

  const currentURL = location.href;
  const comType = comWhereIam().moimType || ""; // 기본값으로 빈 문자열 사용

  // URL에서 모든 type 및 cate 파라미터를 제거
  const newURL = currentURL.replace(/(\?|&)type=[^&]*/g, '').replace(/(\?|&)cate=[^&]*/g, '');

  // type 및 cate 파라미터가 함께 추가되도록 조작
  if (comType !== "gt") {
    makeParam(newURL, '&', 'type=' + encodeURIComponent(comType) + '&cate=' + encodeURIComponent(cateCode));
  } else {
    makeParam(newURL, '?', 'cate=' + encodeURIComponent(cateCode));
  }
}

function makeParam(currentURL, char, paramStr) {

  let newURL = currentURL;

  // URL에 파라미터가 이미 존재하면 추가, 없으면 새로운 파라미터 생성
  newURL += (newURL.includes('?') ? '&' : '?') + paramStr;

  location.href = newURL;

}