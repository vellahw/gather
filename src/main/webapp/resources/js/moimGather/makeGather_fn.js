/**
 * 게더 개설 폼 기능을 담당하는 파일
 */

document.addEventListener('DOMContentLoaded', ()=>{
  const categoryList = document.querySelector('.categoryList');
  const step1Btn = document.getElementById('next');
  const step2Btn = document.getElementById('next2');
  const submitBtn = document.getElementById('submit');

  let pickedCateData; // 유저가 선택한 카테고리 값을 담음
  let gatherAddressData;
  let reqData;
  let formData = new FormData(); // 서버로 전송할 폼 객체 생성

  // 자식 카테고리 클릭 이벤트
  categoryList.addEventListener('click', (event)=>{
  	const target = event.target;
  
    if(target.matches('.child')) {
    
    	if(document.querySelector('.picked_child')){
      	document.querySelector('.picked_child').classList.remove('picked_child');
    	}

  	  target.classList.toggle('picked_child');
      pickedCateData = target.getAttribute('data-code2');
    }
  });


  /**
   * 240220 장한원
   * 유효성 검사
   */
  const formCheck = function() {
    if(!pickedCateData) {
      
    }
  }

  /**
   * 240220: 장한원
   * step1 -> step2로 가는 '다음' 버튼
   */
  step1Btn.addEventListener('click', ()=>{
    const gatherTitle = document.getElementById('gatherTitle').value;
    
    step1Data ={
        GATH_TITL : gatherTitle
      , CATE_IDXX : pickedCateData
    };

    console.log('step1Data  ' + JSON.stringify(step1Data));
  });

  /**
   * 240220: 장한원
   * step2 -> step3로 가는 '다음' 버튼
   */
  step2Btn.addEventListener('click', ()=>{
    const gatherDate = document.getElementById('gatherDate').value;
    const gatherTime = document.getElementById('gatherTime').value;
    const minPeople = document.getElementById('minPeople').value;
    const maxPeople = document.getElementById('maxPeople').value;
    const gatherAddress = document.getElementById('gatherAddress').value;
    const gatherDetailAddress = document.getElementById('gatherDetailAddress').value;
    const gatherLati = document.getElementById('gatherLati').value;
    const gatherLong = document.getElementById('gatherLong').value;

    step2Data ={
        MOIM_DATE : gatherDate
      , MOIM_TIME : gatherTime
      , MINN_PEOP : minPeople
      , MAXX_PEOP : maxPeople
    };

    gatherAddressData = {
        MOIM_LATI : gatherLati
      , MOIM_LONG : gatherLong
      , MOIM_ADR1 : gatherAddress
      , MOIM_ADR2 : gatherDetailAddress }; // 게더 주소 데이터 가공
    
    reqData = Object.assign({}, step1Data, step2Data);

    console.log('step2Data  ' + JSON.stringify(step2Data));
    console.log('gatherAddressData  ' + JSON.stringify(gatherAddressData));
    console.log('reqData  ' + JSON.stringify(reqData));
    
  });


  submitBtn.addEventListener('click', ()=>{
    
    formData.append('data', JSON.stringify(reqData)); // 유저가 입력한 폼 값
    formData.append('map', JSON.stringify(gatherAddressData)); 

    console.log('formData  ' + formData);

    fetch("/gather/makeGatherDo.com", {
      method: "POST",
      body: formData
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then((data) => {
      if(data == 'success') {
        alert('성공입니당')

        // comAlert2(5
        //   ,"게더가 만들어졌어요!"
        //   , null
        //   , "방금 만든 게더 보러 가기"
        //   , function(){
        //     location.href = "/gather/login.com"
        //   });
      } else {
        console.log("오류 발생 data: ", data)
      }
    })
    .catch(error => {
      console.error('네트워크 에러 발생:', error);
    });
  })


});
