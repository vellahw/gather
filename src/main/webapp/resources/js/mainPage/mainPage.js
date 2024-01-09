 document.addEventListener("DOMContentLoaded", function(){
  /**
   * 240109 장한원
   * 날씨에 따른 추천 타이틀 동적 생성 
   */
  const weatherTitleArea = document.getElementById('weatherTitle');
  weatherTitleArea.innerHTML = "구름 많은 흐린날";

 /**
  * 231224 장한원
  * 동적 슬라이드 버튼 생성
  */
  // const contentsContainer = document.querySelector('.slideList');
  // const hiddenArrowBtn = document.querySelectorAll('.arrowBtn');
 
  // contentsContainer.addEventListener('mouseenter', () => {
  //   for (let i = 0; i < hiddenArrowBtn.length; i++) {
  //     hiddenArrowBtn[i].classList.add('btnHover');
  //   }
  // })
  
  // contentsContainer.addEventListener('mouseleave', () => {
  //   for (let i = 0; i < hiddenArrowBtn.length; i++) {
  //     hiddenArrowBtn[i].classList.remove('btnHover');
  //   }
  // })

  /**
  * 240110 장한원
  * 컨텐츠 슬라이드
  */
  const slideContainer = document.querySelectorAll('.slideContainer');
  const slideContents = document.querySelectorAll('.slideContents');
  const slideWidth = 1056;

  let currentIndex = 0;
  let slideContentCount = slideContents.length;

  slideContainer.forEach(slideContainer => {
    const btn = slideContainer.querySelectorAll('.arrowBtn');
    const slideList = slideContainer.querySelectorAll('.slideList');

    slideList.forEach((slideList)=>{
      btn.forEach(btn => {
        btn.addEventListener('click', ()=>{
          if(btn.classList.contains("left")){
            slideList.style.transition = "all 400ms";
            slideList.style.transform = "translateX("+ -slideWidth +"px)";
          } else {
            slideList.style.transition = "all 400ms";
            slideList.style.transform = "translateX("+ -slideWidth +"px)";
          }
        })
      })
    })
  })




  /*
  admin : Hwai
  날씨에 따른 게더
  */
  navigator.geolocation.getCurrentPosition(function(pos) {

    var latitude= pos.coords.latitude;
    var longitude = pos.coords.longitude;

    var apiURI = "http://api.openweathermap.org/data/2.5/weather?lat="
                + latitude + "&lon=" + longitude
                + "&lang=kr&appid=12984781cde1466744c656c07b5a583c&units=metric";

    $.ajax({
      url : apiURI,
      dataType : "json",
      type : "GET",
      async : "false",
      success : function(data) {
      
      var weatherType = "";
      var city = data.name;
      var weather = (data.weather[0].icon).substr(0, 2);
      var temp = (data.main.temp).toFixed(1);

        if(temp < 30){ //30도 이하일 때
    
              if(weather == '01' || weather == '02'){ //기분 좋은 맑은 날
                  weatherType = "sunny";
              }else if(weather == '03' || weather == '04' || weather == '50'){//구름 많은 흐린 날
                  weatherType = "cloudy";
              }else if(weather == '09' || weather == '10'){//비 오는 날
                  weatherType = "rainy";
              }else if(weather == '11'){ //천둥 번개 치는 날
                  weatherType = "thunder";
              }else if(weather == '13'){//눈 오는 날
                  weatherType = "snowy";
              }
              
          } else if(temp >= 30 && weather == '01'){//오늘 같이 더운날
                  alert("오늘 같이 더운날");
                  weatherType = "hot";
          }
          
          $.ajax({
            url : "/getWeather.com",
            data: JSON.stringify({ weatherType: weatherType }),
            type : "post",
            contentType: "application/json", 
            success : function(data) {
            },
            error: function(res, req) {
              console.log("error : " + res, req);
            }
          })
          
        },
    error:function(res, req) {
    console.log("error : " + res, req);
    }})
    
  });
});