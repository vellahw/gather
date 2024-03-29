/**
 * 240128 장한원
 */
document.addEventListener('DOMContentLoaded', ()=>{
  if(sessionStorage.USER_NUMB != null) {
    const notifyBtn = document.querySelector('.notifyBtn');
    const notifyList = document.querySelector('.notifyList');
    const delAllBtn = document.querySelector('.delAll'); // 읽음 버튼
    let notiCountValue;

    if(notifyList) {
      notiCountValue = notifyList.dataset.count;
    }

    
    btnControl(notiCountValue);

    if(notiCountValue == '0') {

      delAllBtn.style.display = 'none';

    }

    // 버튼 및 목록의 이벤트 핸들러 등록
    if(notifyBtn || notifyList) {
      [notifyBtn, notifyList].forEach(element => {
         element.addEventListener('mouseenter', addClass);
         element.addEventListener('mouseleave', removeClass);
      });
    }

    function addClass() {
      notifyList.classList.add('listact');
    }
  
    function removeClass() {
      notifyList.classList.remove('listact');
    }
  }
})


 /**
 * 240128 KSH
 * 버튼 제어
 */
function btnControl(notiCount) {

  const delAll = document.querySelector('.delAll'); // 모두 삭제 버튼
  const noAlim = document.querySelector('.noAlim'); // 알림이 없습니다.

  if(delAll || noAlim ) {
    if(notiCount > "1"){
  
      delAll.style.display = 'block';
      noAlim.style.display = 'none';
  
    } else {
     
      delAll.style.display = 'none';
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
  const notiSeqcValue = notiSeqc.getAttribute('data-noti-seqc');
  const notiCount = document.querySelector('.notiCount'); //알림 갯수
  const delAllBtn = document.querySelector('.delAll'); // 읽음 버튼
  const notifyList = document.querySelector('.notifyList');
  const noAlim = document.querySelector('.noAlim'); // 읽음 버튼
  const notiCountValue = notifyList.dataset.count;


  if(notiSeqcValue != 'undefined'){

    data = JSON.stringify({NOTI_SEQC : notiSeqcValue});

    notiCount.textContent = parseInt(notiCount.textContent) - 1;
    const notiCntt = document.querySelector(`li[data-noti-id="${notiSeqcValue}"`); //해당 알림
    notiCntt.style.transform = `translateY(-134px)`;
    notiCntt.classList.add('readAct');
    
     notiCntt.addEventListener('transitionend', function() {
       notiCntt.style.display = 'none';
     });
    

    if( notiCount.textContent == 0){

        delAllBtn.style.display = 'none';
        noAlim.style.display = 'block';
        
    }
      
    } else if(notiCountValue == '0') {
      
      data = null;
      notiCount.textContent = 0;
      delAllBtn.style.display = 'none';
      noAlim.style.display = 'block';
      
    }
    
    comAjax(
      "POST"
      , "/updateReadNoti.com"
      , data
      , "application/json"
      );

      btnControl(notiCountValue);
      
}