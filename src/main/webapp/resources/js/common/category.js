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
});

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