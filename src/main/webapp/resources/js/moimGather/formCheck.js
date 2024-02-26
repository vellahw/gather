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
  const needCostBtn = document.querySelector('button[data-cost="Y"]');
  const offlineBtn = document.querySelector('button[data-loca="off"]');
  const minPeople = document.getElementById('minPeople').value;
  const maxPeople = document.getElementById('maxPeople').value;
  const peopleNoLimitBtn = document.getElementById('peopleNoLimit');
  
  const summernote = document.getElementById('summernote').value;

  if(step == 'step1') {
    if(!pickedCate) {
      comAlert2(3, '게더의 주제를 골라주세요');
      
      return false;

    } else if(!moimTitle) {
      comAlert3(
          '제목을 입력해주세요'
        , null
        , 'warning'
        , function(){ comFocus('id', 'moimTitle'); }
      );

      return false;

    } else {
      
      return true;
    }
  
  // 두 번째 스탭
  } else if(step == 'step2') {
    
    if(!document.querySelector('.cost_act')) {

      comAlert2(3, '참가비 유무를 선택해주세요');

      return false;

    } else if(needCostBtn.classList.contains('cost_act') && !moimCost) {

      comAlert3(
        '참가 금액을 입력해주세요'
        , null
        , 'warning'
        , function(){ comFocus('id', 'moimCost'); }
      );

       return false;

    } else if(!moimDate) {

      comAlert3(
        '모임 날짜를 선택해주세요'
        , null
        , 'warning'
        , function(){ comFocus('id', 'moimDate'); }
      );

      return false;

    } else if(!moimTime) {

      comAlert3(
        '모임 시간을 선택해주세요'
        , null
        , 'warning'
        , function(){ comFocus('id', 'moimTime'); }
      );

      return false;

    } else if(!document.querySelector('.loca_act')) {

      comAlert2(3, '모임 장소를 선택해주세요');

      return false;

    } else if(offlineBtn.classList.contains('loca_act') && !moimAddress){
  
      comAlert3(
          '모임 장소의 주소를 입력해주세요'
        , null
        , 'warning'
        , function(){ comFocus('id', 'moimAddress'); }
      );
  
      return false;
      
    } else {
      
      return true;
    }

  // 세 번째 스탭
  } else if(step == 'step3') {

    if(!document.querySelector('.appr_act')) {

      comAlert2(3, '참여 승인제 여부를 선택해주세요.');

      return false;

    } else if(!peopleNoLimitBtn.classList.contains('picked_noLimit')) {
      if(!minPeople) {

        comAlert3(
          '모임 최소 인원수를 입력해주세요'
          , null
          , 'warning'
          , function(){ comFocus('id', 'minPeople'); }
        );
  
        return false;
  
      } else if(!maxPeople) {
  
        comAlert3(
          '모임 최대 인원수를 입력해주세요'
          , null
          , 'warning'
          , function(){ comFocus('id', 'maxPeople'); }
        );
  
        return false;
  
      }
    } else if(!document.querySelector('.gender_act')) {

      comAlert2(3, '모임 참여 성별을 선택해주세요.');

      return false;

    } else {
      return true;
    }

  } else if(step == 'step4') {
    if(!summernote) {
      comAlert3(
        '모임 소개글을 작성해주세요'
        , null
        , 'warning'
        , null
      );

      return false;

    } else {
      return true;
    }
  }

  return true;
}