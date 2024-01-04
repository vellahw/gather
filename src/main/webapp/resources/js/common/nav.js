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

 /**
  * 240104 장한원
  * 마우스오버/아웃시 로그아웃, 고객센터 아이콘 컬러 바뀜
  */
 function showHoverIcon(container) {
  const hoverIcon = container.querySelector("#hoverIcon");
  const basicIcon = container.querySelector("#basicIcon");
  const iconLink = container.querySelector("#iconLink");

  if (hoverIcon) {
    hoverIcon.style.display = "block";
    basicIcon.style.display = "none";
    iconLink.style.color = "var(--primary)";
  }
}

function hideHoverIcon(container) {
  const hoverIcon = container.querySelector("#hoverIcon");
  const basicIcon = container.querySelector("#basicIcon");
  const iconLink = container.querySelector("#iconLink");

  if (hoverIcon) {
    hoverIcon.style.display = "none";
    basicIcon.style.display = "block";
    iconLink.style.color = "var(--color-gray500)";
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
  * 게더/클럽/챌린지/피드 네비게이션바 active 클래스 적용
  */
  const currentURL = location.href;
  const params = new URL(location.href).searchParams;
  const type = params.get('type');

  // type 파라미터를 가져와 비교
  switch (type) {
    case 'cb':
      addActiveClass(2)
      break;

    case 'cg':
      addActiveClass(3)
      break;
    
      case 'fd':
      addActiveClass(4)
      break;
  
    default: null
      addActiveClass(1);
      break;
  }

  // 클래스 추가하는 함수
  function addActiveClass(order) {
    document.querySelector('.menuItem:nth-child('+ order +')').classList.add('active');
  }

  const loginBtn = document.getElementById('login');
  loginBtn.addEventListener('click', ()=>{
    this.location.href = '/gather/login.com';
  })
});