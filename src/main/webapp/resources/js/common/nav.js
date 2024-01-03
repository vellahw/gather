/**
 * 240103 장한원
 * navbar 메뉴들 클릭이벤트
*/
function menuOnClick(val) {
  switch (val) {
    case 'gt':
      location.href = '/gather.com';
      break;
   
    case 'cb':
      location.href = '/gather.com?type=cb';
      break;
    
    case 'cg':
      location.href = '/gather.com?type=cg';
      break;
    
    case 'fd':
      location.href = '/gather.com?type=fd';
      break;
  }
}

document.addEventListener("DOMContentLoaded", function(){
  /**
   * 240103 장한원
   * 로고 누르면 '/gather.com'으로 이동
  */
  const logoContainer = document.getElementById('logoContainer');
  
  logoContainer.addEventListener('click', ()=>{
    this.location.href="/gather.com"
  })
  
 /**
  * 240103 장한원
  * url에 맞게 active 클래스 적용
  */
  const currentURL = location.pathname;

  if(currentURL == '/gather.com') {
    addActiveClass();
  } else if(currentURL == '/gather.com?type=cb') {
    addActiveClass();
  } else if(currentURL == '/gather.com?type=cg') {
    addActiveClass();
  } else if(currentURL == '/gather.com?type=fd') {
    addActiveClass();
  }

  function addActiveClass() {
    document.querySelector('.menuItem:nth-child(1)').classList.add('active');
  }
  
  
})