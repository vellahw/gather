document.addEventListener("DOMContentLoaded", function(){

  const categoryIcon = document.querySelectorAll('.categoryIcon');
  const PCATE_NAME = document.querySelectorAll('#PCATE_NAME');
  const CCATE_NAME = document.querySelectorAll('#CCATE_NAME');

  /**
  * 240111 Hwai
  * 카테고리 객체 요청
  */
  // $.ajax({
  //   url: '/cateGory.get', // 실제 서버의 엔드포인트에 맞게 수정
  //   type: 'POST',
  //   dataType: 'json',
  //   success: function(data) {

  //     const categories = {};

  //     for (let i = 0; i < data.length; i++) {
  //       const category = data[i];

  //       // 대분류의 경우
  //       if (category.CATE_LEVL === 1) {
  //         const pcateCode = category.CATE_CODE;
  //         const pcateName = category.CATE_NAME;
  //         const categoryIcon = category.IMAG_SRCC;

  //         // pcateName과 categoryIcon을 이용하여 대분류에 대한 작업 수행
  //         // 예: pcateName을 어떤 HTML 엘리먼트의 innerHTML로 설정

  //         // 소분류를 담을 배열 초기화
  //         categories[pcateCode] = {
  //           pcateName: pcateName,
  //           categoryIcon: categoryIcon,
  //           subcategories: [],
  //         };

  //         // 소분류의 경우
  //       } else if (category.CATE_LEVL === 2) {
  //         const ccateName = category.CATE_NAME;
  //         const pcateCode = category.PARENTS_CODE; // 대분류 카테고리 코드

  //         // 소분류 정보를 대분류에 추가
  //         if (categories[pcateCode]) {
  //           categories[pcateCode].subcategories.push({
  //             ccateName: ccateName,
  //             ccateCode: category.CATE_CODE,
  //           });
  //         }
  //       }
  //     }

    // 여기서 categories 객체에는 각 대분류와 그에 속하는 소분류들이 저장되어 있습니다.
  //   console.log(categories);
  //     },
  //     error: function(error) {
  //         console.error('Error:', error);
  //     }
  // });



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
});

/*
  * 240103 장한원
  * 카테고리바 클릭 이벤트
  * 240115 Hwai
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