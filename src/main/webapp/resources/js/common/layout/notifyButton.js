/**
 * 240128 장한원
 */
document.addEventListener('DOMContentLoaded', ()=>{
  const notifyBtn = document.querySelector('.notifyBtn');
  const closeBtn = document.querySelector('.closeBtn');
  const notiWrap = document.querySelector('.notifyList');

  closeBtn.addEventListener('click', ()=>{
    removeClass();
  })

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