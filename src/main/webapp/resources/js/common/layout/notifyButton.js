/**
 * 240128 장한원
 */
document.addEventListener('DOMContentLoaded', ()=>{
  const notifyBtn = document.querySelector('.notifyBtn');
  const notiWrap = document.querySelector('.notifyList');
  btnControl();

  notifyBtn.addEventListener('mouseenter', ()=>{
    addClass();
  })

  notifyBtn.addEventListener('mouseleave', ()=>{
    removeClass();
  })

  notiWrap.addEventListener('mouseenter', ()=>{
    addClass();
  })

  notiWrap.addEventListener('mouseleave', ()=>{
    removeClass();
  })

  function addClass() {
    notiWrap.classList.add('act');
  }

  function removeClass() {
    notiWrap.classList.remove('act');
  }
	
 })

 /**
 * 240128 KSH
 * 버튼 제어
 */
function btnControl() {

  const notiCount = document.querySelector('.notiCount'); //알림 갯수
  const delAll = document.querySelector('.delAll'); //모두 삭제 버튼
  const noAlim = document.querySelector('.noAlim'); //모두 삭제 버튼

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

  console.log(notiSeqc);

  let data = "";
  const notiCount = document.querySelector('.notiCount'); //알림 갯수
  const allNotiCntt = document.querySelectorAll('.class'); //모두 삭제 버튼

  if(notiSeqc != 'undefined'){

    data = JSON.stringify({NOTI_SEQC : notiSeqc});

    notiCount.textContent = parseInt(notiCount.textContent) - 1;
    const notiCntt = document.querySelector(`li[data-noti-id="${notiSeqc}"`); //해당 알림
    notiCntt.style.display = 'none';


  } else if(notiSeqc == 'undefined') {

    data = null;
    notiCount.textContent = 0;
    allNotiCntt.style.display = 'none';

  }

  comAjax(
    "POST"
    , "/updateReadNoti.com"
    , data
    , "application/json"
  );

  btnControl();

}