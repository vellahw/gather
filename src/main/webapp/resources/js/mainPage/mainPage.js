function contentsSlider(){

  /**
  * 240111 장한원
  * 컨텐츠 슬라이더
  */
 const slideContainer = document.querySelectorAll('.slideWrap'); // 리스트를 감싸는 부모
 
  slideContainer.forEach((slideContainer) => {

    const slideList = slideContainer.querySelectorAll('.slideList'); // 컨텐츠를 감싸는 리스트
   
    /* 리스트 제어 */
    slideList.forEach(slideList => {

      const slideContents = slideList.querySelectorAll('.slideContents'); // 컨텐츠
      let slideContentCount = slideContents.length;

      slideContents.forEach(slideContents=>{
        
        // 모임 마감되면 어두운 필터 적용
        addEndfilter(slideContents);
        
        // 마우스오버하면 모임 이미지 확대 효과
        const thumnailImg = slideContents.querySelector('.thumnail'); // 컨텐츠
        
        slideContents.addEventListener('mouseover', function() {
          thumnailImg.style.transform = 'scale(1.05)';
        });
  
        slideContents.addEventListener('mouseout', function() {
          thumnailImg.style.transform = 'scale(1)';
        });

      })
      
      // 컨텐츠가 4개 초과일 때
      if(slideContentCount > 4) {

        const btn = slideContainer.querySelectorAll('.arrowBtn'); // 화살표 버튼

        let currentIdx = 0; // 현재 슬라이드 번호
        let translate = 0; // 슬라이드 위치 값

        const rigthBtn = slideContainer.querySelector('#rigthBtn');
    
        const leftBtn = slideContainer.querySelector('#leftBtn');
        const lastPage = Math.round((slideContentCount / 4) - 1); 
        
        slideContainer.addEventListener('mouseenter', (e) => {

          if(currentIdx >= 0 && currentIdx !== lastPage) {
            addBtnHover(rigthBtn);
          }
          
          if(currentIdx !== 0) {
            addBtnHover(leftBtn);
          } 
        })
        
        slideContainer.addEventListener('mouseleave', () => {
          if(currentIdx === lastPage) {
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
        
        btn.forEach((btn) => {
          
          /* 이벤트 등록 */
          btn.addEventListener('click', moveSlide);
        
          /* 버튼 클릭 이벤트 콜백 함수 */
          function moveSlide(event) {
          
            event.preventDefault();
            
            // 오른쪽 버튼 클릭시
            if(event.target.classList.contains("right")) {
              if (currentIdx !== lastPage) {
                currentIdx += 1;
                translate = 1056 * currentIdx;
                slideList.style.transform = `translateX(-${translate}px)`;
                slideList.style.transition = `all 400ms ease`;
                leftBtn.classList.add('_hover');
              }

              //마지막 슬라이드라면 오른쪽 버튼 안 보이게함
              if(currentIdx === lastPage) {
                event.target.classList.remove('_hover');
              }

            // 왼쪽 버튼 클릭시
            } else if(event.target.classList.contains("left")) {
                if (currentIdx !== 0) {
                  currentIdx -= 1;
                  translate = 1056 * -currentIdx;
                  slideList.style.transform = `translateX(${translate}px)`;
                  rigthBtn.classList.add('_hover');
                }

                //첫번째 슬라이드라면 왼쪽 버튼 안 보이게함
                if(currentIdx === 0) {
                  event.target.classList.remove('_hover');
                }
              }
          }
          
        }) // END btn.forEach

      } else if(slideContentCount == 0) {
				// const parent = slideContainer.parentNode.parentNode;
				// parent.style.display = 'none';

        // if(sessionStorage.getItem('isNaver') == 'true') { 
        //   const region = document.querySelector('div[data-type="Region"]');
        //   region.style.display = 'block';
        // }

      } // END  if(slideContentCount > 4)
    }) // END slideList.forEach

  }) // END slideContainer.forEach  
}

/**
* 240130 장한원
* 마감 여부에 따른 썸네일 이미지 필터 적용
*/
function addEndfilter(element) {
  const thumnailContainer = element.querySelector('.thumnailContainer');
  const endValue = thumnailContainer.querySelector('.thumnail');
  let getValue = endValue.getAttribute('data-end');

  if(getValue == 'Y') {
    thumnailContainer.classList.add('end');
  }
}

/**
 * 240203 장한원
 * 로그인 유무에 따른 container display 설정
 */
function controlContainer() {
  const userNumb = sessionStorage.getItem('USER_NUMB');
  const $taste = document.querySelector('div[data-type="Taste"]');
  const $region = document.querySelector('div[data-type="Region"]');

  $taste.style.display = 'none';
  $region.style.display = 'none';

  const recomandRegionList = document.querySelector('div[data-id="regionList"]');
  recomandRegionList.style.display = 'none';

  if(userNumb != null) {

    const regionList = $region.querySelector('.slideList');
    const tasteList = $taste.querySelector('.slideList');
    const regionCount = regionList.childElementCount;
    const tasteCount = tasteList.childElementCount;

    if(regionCount != 0) {
      $region.style.display = 'block';
    }
    
    if(tasteCount != 0) {
      $taste.style.display = 'block';
    }
  }
}
