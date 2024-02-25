/**
   * 240220 장한원
   * 유효성 검사
   */
const formCheck = function(step) {

  const pickedCate = document.querySelector('.picked_child');
  const moimTitle = document.getElementById('moimTitle').value;
  const moimCost = document.getElementById('moimCost').value;
  const moimDate = document.getElementById('moimDate').value;
  const moimTime = document.getElementById('moimTime').value;
  const moimAddress = document.getElementById('moimAddress').value;
  const moimDetailAddress = document.getElementById('moimDetailAddress').value;

  if(step == 'step1') {
    if(!pickedCate) {
      comAlert2(3, '게더의 주제를 골라주세요');
      
      return false;

    } else if(!moimTitle) {
      comAlert3(
          '제목을 입력해주세요'
        , null
        , 'warning'
        , null
        , function(){ comFocus('id', 'moimTitle'); }
      );

      return false;

    } else {
      
      return true;
    }
  } else if(step == 'step2') {
    
    if(!document.querySelector('.cost_act')) {

      comAlert2(3, '참가비 유무를 선택해주세요');

      return false;

    } else if(document.querySelector('button[data-cost="Y"]').classList.contains('cost_act')) {

      if(!moimCost) {

        comAlert3(
          '참가 금액을 입력해주세요'
        , null
        , 'warning'
        , null
        , function(){ comFocus('id', 'moimCost'); }
        );

        return false;

      }

    } else if(!moimDate) {

      comAlert2(3, '모임 날짜를 선택해주세요.');

      return false;


    } else if(!moimTime) {

      comAlert2(3, '모임 시간을 선택해주세요.');

      return false;
    } else if(!document.querySelector('.loca_act')) {
      comAlert2(3, '모임 장소를 선택해주세요');

      return false;

    } else if(document.querySelector('button[data-loca="on"]').classList.contains('loca_act')){

      if(!moimAddress || !moimDetailAddress) {
  
        comAlert3(
          '모임 장소의 주소를 입력해주세요'
        , null
        , 'warning'
        , null
        , function(){ comFocus('id', 'moimAddress'); }
        );
  
        return false;
      }

    }
    

    return true;
  }
}