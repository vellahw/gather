/**
 * 240128 장한원
 */
document.addEventListener('DOMContentLoaded', ()=>{
  if(sessionStorage.USER_NUMB != null) {
    const notifyBtn = document.querySelector('.notifyBtn');
    const notifyList = document.querySelector('.notifyList');
    const notiCountValue = notifyList.dataset.count;
    const delAllBtn = document.querySelector('.delAll'); // 읽음 버튼
    
    btnControl();

    if(notiCountValue == '0') {
      delAllBtn.style.display = 'none';
    }

    // 버튼 및 목록의 이벤트 핸들러 등록
    // [notifyBtn, notifyList].forEach(element => {
    //   element.addEventListener('mouseenter', addClass);
    //   element.addEventListener('mouseleave', removeClass);
    // });

    function addClass() {
      notifyList.classList.add('act');
    }
  
    function removeClass() {
      notifyList.classList.remove('act');
    }
  }
})


 /**
 * 240128 KSH
 * 버튼 제어
 */
function btnControl() {

  const notiCount = document.querySelector('.notiCount'); // 알림 갯수
  const delAll = document.querySelector('.delAll'); // 모두 삭제 버튼
  const noAlim = document.querySelector('.noAlim'); // 알림이 없습니다.

  if(notiCount < 1 ){

    delAll.style.display = 'none';

    if(notiCount == 0) {

      noAlim.style.display = 'block';

    }
  }
}

/**
 * 240128 KSH
 * 알림 읽음으로 update
 */
function updateReadNoti(notiSeqc){

  let data = "";
  const notiCount = document.querySelector('.notiCount'); //알림 갯수
  const delAllBtn = document.querySelector('.delAll'); // 읽음 버튼
  const allNoti = document.querySelectorAll('.noti'); // 모든 알림들
  const notifyList = document.querySelector('.notifyList');
  const notiCountValue = notifyList.dataset.count;

  if(notiSeqc != 'undefined'){

    data = JSON.stringify({NOTI_SEQC : notiSeqc});

    notiCount.textContent = parseInt(notiCount.textContent) - 1;
    const notiCntt = document.querySelector(`li[data-noti-id="${notiSeqc}"`); //해당 알림
    
    notiCntt.style.visibility = 'hidden';
    notiCntt.style.opacity = '0';
    notiCntt.style.transform = 'translateX(490px)';

    for (let i = 1; i < allNoti.length; i++) {
      allNoti[i].style.transform = `translateY(-134px)`;
      
    }


  } else if(notiCountValue == '0') {

    data = null;
    notiCount.textContent = 0;
    delAllBtn.style.display = 'none';

  }

  comAjax(
    "POST"
    , "/updateReadNoti.com"
    , data
    , "application/json"
  );

  btnControl();

}