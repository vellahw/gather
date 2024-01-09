//   const categoryContainer = document.getElementById('categoryContainer');
  
//   //새로 생성되는 카테고리 li
//   let categoryItem = document.createElement('li');
//   categoryItem.className = 'categoryItem';
//   categoryItem.style = 'color:red;';
  
//   //새로 생성되는 카테고리 a 태그 
//   let categoryLink = document.createElement('a');
//   categoryLink.className = 'categoryLink';
//   categoryLink.textContent = '전체';
//   // newDeleteFileInputBtn.dataset.fileName = fileName;
  
//   let categoryList = document.createElement('ul');
//   categoryList.className = 'categoryList';
//   categoryList.appendChild(categoryItem);
//   categoryList.appendChild(categoryLink);
  
//   //추가해주기
//   categoryContainer.appendChild(categoryList);

/*
admin : Hwai
날씨에 따른 게더
*/
navigator.geolocation.getCurrentPosition(function(pos) {

  console.log(pos);
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

	    alert("날씨코드: " + weather + "\n" +
	          "현재온도: " + temp  + "\n" +
	          "도시이름: " + city)

	    if(temp <30){//30도 이하일 때
	
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
	          
	      } else if(temp <30 && weather == '01'){//오늘 같이 더운날
	              alert("오늘 같이 더운날");
                weatherType = "hot";
	      }
	      
	      alert(weatherType);

        $.ajax({
          url : "/getWeather.com",
          data: JSON.stringify({ weatherType: weatherType }),
          type : "post",
          contentType: "application/json", 
          success : function(data) {
              alert("성공!!!!!");
              console.log(data);
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
