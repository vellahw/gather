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
  * 240103 장한원
  * 카테고리바 hover시 하위 카테고리 보여짐
  */
  const categoryItems = document.querySelectorAll('.categoryItem');

  categoryItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      const childList = item.querySelector('.childCateList');

      if (childList) {
        childList.style.opacity = '1';
        childList.style.zIndex = '1';
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

// $.ajax({
//     url: '/cateGory.get', 
//     type: 'GET', 
//     dataType: 'json', 
//     success: function(response) {
//       const childCateData = response.cCate;
//       const parentsCateData = response.pCate;

//       const categoryIcon = document.getElementById('categoryIcon');
//       const categoryIconData = childCateData[i].IMAG_SRCC;
//       categoryIcon.src = categoryIconData;

//       append.childCateData[i].CATE_CODE



//     },
//     error: function(error) {
//         console.error('데이터를 가져오는데 실패했습니다. >> ', error);
//     }
// });

  /*
   * 240103 장한원
   * 카테고리바 '전체' 클릭 이벤트
  */
  function cateAllOnclick() {
    const currentURL = location.href;
    const params = new URL(location.href).searchParams;
    const type = params.type;

    if (type != null) {
      makeCateAllParam(currentURL, '&');
    } else {
      makeCateAllParam(currentURL, '?');
    }
  }

  function makeCateAllParam(currentURL, char) {
    location.href = currentURL + char +'cate=all'
  }