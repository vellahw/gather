window.onload = function () {

    const scrollPosition = localStorage.getItem('scrollPosition') || 0;
    window.scrollTo(0, scrollPosition);

};


// 페이지를 떠날 때 스크롤 위치를 저장합니다.
window.onbeforeunload = function () {

    localStorage.setItem('scrollPosition', window.scrollY);

};