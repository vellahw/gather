/*
230110 Hwai
날씨에 따른 모임추천
*/
document.addEventListener("DOMContentLoaded", function(){

    navigator.geolocation.getCurrentPosition(function(pos) {

    const weatherTitleArea = document.getElementById('weatherTitle');

    var today = new Date();   
    var hours = ('0' + today.getHours()).slice(-2);
    
    var location = window.location.search;
    var moimType = location.substring(6,8); //현재 모임타입
    var moimTypeKr = ""

    if(moimType == ""){
        
        moimType = 'gt';
        moimTypeKr = '게더'

    } else if(moimType == "cb"){
        
        moimTypeKr = '클럽'

    } else if(moimType == "ch") {
                
        moimTypeKr = '챌린지'

    }

    var latitude= pos.coords.latitude;
    var longitude = pos.coords.longitude;
    var apiURI = "http://api.openweathermap.org/data/2.5/weather?"
                + "lat="+ latitude + "&lon=" + longitude
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
                    var weatherImg = ""

                    if( hours >= "07" && hours <= "20"){

                        weatherImg = '<img src="/resources/img/icon/weather/sunny.png" class="areaTitleIcon"/>'

                    } else {

                        weatherImg = '<img src="/resources/img/icon/weather/moon.png" class="areaTitleIcon"/>' 
                    }

                    weatherTitleArea.innerHTML = '기분 좋은 맑은 날 '                 
                                            + weatherImg
                                            + ' 이런 ' + moimTypeKr +" 어때요?"

                }else if(weather == '03' || weather == '04' || weather == '50'){
                    
                weatherType = "cloudy";
                weatherTitleArea.innerHTML = '구름 많은 흐린 날 '                 
                                            + '<img src="/resources/img/icon/weather/cloudy.png" class="areaTitleIcon"/>' 
                                            + ' 이런 ' + moimTypeKr +" 어때요?"

                }else if(weather == '09' || weather == '10'){
                    
                weatherType = "rainy";
                weatherTitleArea.innerHTML = '비 오는 날 '                 
                                            + '<img src="/resources/img/icon/weather/rainy.png" class="areaTitleIcon"/>' 
                                            + ' 이런 ' + moimTypeKr +" 어때요?"


                }else if(weather == '11'){ 
                    
                weatherType = "thunder";
                weatherTitleArea.innerHTML = '천둥 번개 치는 날 '                 
                                            + '<img src="/resources/img/icon/weather/thunder.png" class="areaTitleIcon"/>' 
                                            + ' 이런 ' + moimTypeKr +" 어때요?"


                }else if(weather == '13'){
                    
                weatherType = "snowy";
                weatherTitleArea.innerHTML = '눈 오는 날 '                 
                                            + '<img src="/resources/img/icon/weather/snow.png" class="areaTitleIcon"/>' 
                                            + ' 이런 ' + moimTypeKr +" 어때요?"

                }
                
            } else if(temp >= 30 && weather == '01'){
                    
                    weatherType = "hot";
                    weatherTitleArea.innerHTML = '오늘 같이 더운 날 '                 
                                            + '<img src="/resources/img/icon/weather/sunny.png" class="areaTitleIcon"/>' 
                                            + ' 이런 ' + moimTypeKr +" 어때요?"

            }
            console.log(moimType);

            $.ajax({
            url : "/getWeatherMoim.com",
            data: JSON.stringify({ weatherType: weatherType ,
                                   moimType: moimType }),
            type : "post",
            dataType: "json",
            contentType: "application/json",
            success : function(data) {
                console.log(data);
                console.log(data.data[0].GATH_IDXX);
                //weatherTitleArea.innerHTML = data.data[0].GATH_IDXX;
            },
            error: function(res, req) {
                console.log("error : " + res, req);
            }
            })
            
            },
        error:function(res, req) {
        console.log("error : " + res, req);
        }})
        
    })
});