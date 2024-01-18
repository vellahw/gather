document.addEventListener("DOMContentLoaded", function(){
  
  /**
   * 240118 장한원
   * 이미지 슬라이더
  */
 const slideContainer = document.querySelector('.slideContainer'); // 리스트를 감싸는 부모
 const slideList = slideContainer.querySelector('.imgWrap'); // 이미지 감싸는 리스트
 const img = slideList.querySelectorAll('img');
 const btn = slideContainer.querySelectorAll('.arrowBtn'); // 화살표 버튼
 
 const slideContentCount = img.length; // 이미지 갯수
 const liWidth = slideList.clientWidth; // 이미지 너비
 
 /* 백그라운드 이미지 초기화 */
 const backgroundImg = document.querySelector('.backgroundImg'); 
 backgroundImg.src = img[0].src;

      // 컨텐츠가 1개 초과일 때
      if(slideContentCount > 1) {

        let currentIdx = 0; // 현재 슬라이드 index
        let translate = 0; // 슬라이드 이동값

        // dot 생성
        const dotsContainer = document.querySelector('.dotsContainer');
        
        for (let i = 0; i < slideContentCount; i++) {

          const dot = document.createElement('span');
          dot.className = 'dot';
          dot.dataset.index = i;
          dot.onclick = function() {
            if(i > currentIdx) {

              currentIdx = i

              translate = liWidth * currentIdx;
              slideList.style.transform = `translateX(-${translate}px)`;
              slideList.style.transition = `all 400ms ease`;

              updateDot(currentIdx)

            }

            if(i < currentIdx) {

              currentIdx = i

              translate = liWidth * -currentIdx;
              slideList.style.transform = `translateX(${translate}px)`;
              slideList.style.transition = `all 400ms ease`;

              updateDot(currentIdx)

            }

            backgroundImg.src = img[i].src;

          }

          dotsContainer.appendChild(dot);

        }

        updateDot(currentIdx);
        
        // 버튼 제어
        btn.forEach((btn) => {
          const rigthBtn = slideContainer.querySelector('#rigthBtn');
          const leftBtn = slideContainer.querySelector('#leftBtn');
                    
          slideContainer.addEventListener('mouseenter', () => {

            if(currentIdx >= 0 && currentIdx !== slideContentCount-1) {
              addBtnHover(rigthBtn);
            }
            
            if(currentIdx !== 0) {
              addBtnHover(leftBtn);
            } 
          })
          
          slideContainer.addEventListener('mouseleave', () => {

            if(currentIdx === slideContentCount-1) {
              removeBtnHover(rigthBtn);
            }
            
            if(currentIdx === 0) {
              removeBtnHover(leftBtn);
            }

            removeBtnHover(leftBtn);
            removeBtnHover(rigthBtn);

          })

          function addBtnHover(targetBtn) {
            targetBtn.classList.add('_hover');
          }
          
          function removeBtnHover(targetBtn) {
            targetBtn.classList.remove('_hover');
          }
          
          /* 이벤트 등록 */
          btn.addEventListener('click', moveSlide);
        
          /* 버튼 클릭 이벤트 콜백 함수 */
          function moveSlide(event) {
            event.preventDefault();
            
            // 오른쪽 버튼 클릭시
            if(event.target.classList.contains("dr")) {
              if (currentIdx !== slideContentCount-1) {
                currentIdx++;
                transform(currentIdx, leftBtn);
              }

              //마지막 슬라이드라면 오른쪽 버튼 안 보이게함
              if(currentIdx === slideContentCount-1) {
                event.target.classList.remove('_hover');
              }

            // 왼쪽 버튼 클릭시
            } else if(event.target.classList.contains("dl")) {
              if (currentIdx !== 0) {
                currentIdx--;
                translate = liWidth * -currentIdx;
                slideList.style.transform = `translateX(${translate}px)`;
                rigthBtn.classList.add('_hover');
              }

              //첫번째 슬라이드라면 왼쪽 버튼 안 보이게함
              if(currentIdx === 0) {
                event.target.classList.remove('_hover');
              }
            }

            updateDot(currentIdx);

          }
        }) // END btn.forEach
      } // END  if(slideContentCount > 1)

      else {
        btn.forEach((btn) => {
          btn.style.display = 'none';
        })
      }
      
      function transform(currentIdx, btnDirection) {
            translate = liWidth * currentIdx;
            slideList.style.transform = `translateX(-${translate}px)`;
            slideList.style.transition = `all 400ms ease`;
            btnDirection.classList.add('_hover');
          }

  
  /**
   * 240119 장한원
   * dot 스타일 적용
   */
  function updateDot(currentIdx) {
    const dots = document.querySelectorAll('.dot');

    dots.forEach((target, index) => {
      if(index == currentIdx) {
        target.classList.add('_active');
      } else {
        target.classList.remove('_active');
      }
    })
  }
  
  /**
   * 240118 장한원
   * 멤버 프로필 오른쪽으로 이동
   */
  const countNode = document.getElementById('count');
  const count = countNode.getAttribute('data-count');

  if(count != 0) {
    
    const memeberItem = countNode.querySelectorAll('.profileImgWrap')

    memeberItem.forEach((item, i) => {
      item.style.left = 44 * i + 'px';
    })

  }
  
})
