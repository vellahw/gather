/*
230110 Hwai
날씨에 따른 모임추천
*/
document.addEventListener("DOMContentLoaded", function(){

    var USER_NUMB = sessionStorage.getItem('USER_NUMB');
    
    var city = {

        'Seoul'             : 'A',
        'Gyeongg-do'        : 'B',
        'Incheon'           : 'C',
        'Gangwon-do'        : 'D',
        'Chungcheongbuk-do' : 'E',
        'Chungcheongnam-do' : 'F',
        'Gongju'            : 'G',
        'Daejeon'           : 'H',
        'Gwangju'           : 'I',
        'Jeollabuk-do'      : 'J',
        'Gyeongsangbuk-do'  : 'K',
        'Daegu'             : 'L',
        'Jeju'              : 'M',
        'Jeollanam-do'      : 'N',
        'Ulsan'             : 'O',
        'Gyeongsangnam-do'  : 'P',
        'Busan'             : 'Q'
    };
    
    navigator.geolocation.getCurrentPosition(function(pos) {

        
        var today = new Date();   
        var hours = ('0' + today.getHours()).slice(-2);
    
        var moimType = comWhereIam().moimType;
        
        var latitude= pos.coords.latitude;
        var longitude = pos.coords.longitude;
        var apiURI = "http://api.openweathermap.org/data/2.5/weather?"
        + "lat="+ latitude + "&lon=" + longitude
        + "&lang=kr&appid=12984781cde1466744c656c07b5a583c&units=metric";
        
        $.ajax({  //(날씨)openweathermapApi ajax 시작부분
            
            url : apiURI,
            dataType : "json",
            type : "GET",
            async : "false",
            success : function(data) {

                const weatherTitleArea = document.getElementById('weatherTitle');
                //const tempArea = weatherTitleArea.querySelector('.tempArea');

                
                var weatherType = "";
                var cityName = data.name;
                var cityCode = city[cityName];
                var weather = (data.weather[0].icon).substr(0, 2); //날씨코드
                var temp = Number((data.main.temp).toFixed(1));
                console.log(typeof(temp));
                console.log("온도"+temp+"\n날씨"+weather);
                
                //tempArea.innerHTML = temp;

                if(temp > 0 && temp < 27){  //날씨data 결과에 따른 title
            
                    if(weather == '01' || weather == '02'){ 
                        
                        weatherType = "sunny";
                        var weatherImg = "";
                        var dayNightKr = "";

                        if( hours >= "07" && hours <= "20"){

                            weatherImg = '<img src="/resources/img/icon/weather/sunny.png" class="areaTitleIcon"/>'
                            dayNightKr = "날";

                        } else {

                            weatherImg = '<img src="/resources/img/icon/weather/moon.png" class="areaTitleIcon"/>' 
                            dayNightKr = "밤";
                        }

                        weatherTitleArea.innerHTML = '기분 좋은 맑은 ' + dayNightKr                 
                                                + weatherImg
                                                + ' 이런 ' + comWhereIam().moimTypeKr +" 어때요?"

                    }else if(weather == '03' || weather == '04' || weather == '50'){
                        
                        weatherType = "cloudy";
                        weatherTitleArea.innerHTML = '구름 많은 흐린 날 '                 
                                                    + '<img src="/resources/img/icon/weather/cloudy.png" class="areaTitleIcon"/>' 
                                                    + ' 이런 ' + comWhereIam().moimTypeKr +" 어때요?"

                    }else if(weather == '09' || weather == '10'){
                        
                        weatherType = "rainy";
                        weatherTitleArea.innerHTML = '비 오는 날 '                 
                                                    + '<img src="/resources/img/icon/weather/rainy.png" class="areaTitleIcon"/>' 
                                                    + ' 이런 ' + comWhereIam().moimTypeKr +" 어때요?"


                    }else if(weather == '11'){ 
                        
                        weatherType = "thunder";
                        weatherTitleArea.innerHTML = '천둥 번개 치는 날 '                 
                                                    + '<img src="/resources/img/icon/weather/thunder.png" class="areaTitleIcon"/>' 
                                                    + ' 이런 ' + comWhereIam().moimTypeKr +" 어때요?"


                    }else if(weather == '13'){
                        
                        weatherType = "snowy";
                        weatherTitleArea.innerHTML = '눈 오는 날 '                 
                                                    + '<img src="/resources/img/icon/weather/snow.png" class="areaTitleIcon"/>' 
                                                    + ' 이런 ' + comWhereIam().moimTypeKr +" 어때요?"

                    }
                    
                } else if(temp >= 27 && weather == '01'){
                        
                    weatherType = "hot";
                    weatherTitleArea.innerHTML = '오늘 같이 더운 날 '                 
                                            + '<img src="/resources/img/icon/weather/sunny.png" class="areaTitleIcon"/>' 
                                            + ' 이런 ' + comWhereIam().moimTypeKr +" 어때요?"

                } else if(temp <= 0 ){
                        
                    weatherType = "cold";
                    weatherTitleArea.innerHTML = '오늘 같이 추운 날 '                 
                                            + '<img src="/resources/img/icon/weather/cold.png" class="areaTitleIcon"/>' 
                                            + ' 이런 ' + comWhereIam().moimTypeKr +" 어때요?"
                }


            $.ajax({ //날씨 정보전달

                url : "/getWeatherMoim.com",
                data: JSON.stringify({ weatherType: weatherType ,
                                       moimType: moimType }),
                type : "post",
                dataType: "json",
                contentType: "application/json",
                success : function(data) {
                               
                   var data = data.data; 
                    
                   const weatherList = document.getElementById('weatherList');
                   const fragment = document.createDocumentFragment();  // DocumentFragment 생성
                   
                   if(moimType == "gt") {
                       for (let i = 0; i < data.length; i++) {
                           let wmoim = data[i];

                           // DocumentFragment에 각 반복에서 생성된 노드를 추가
                           const slideContents = document.createElement('div');
                           slideContents.className = 'slideContents';
                           slideContents.innerHTML = `<div class="eachWrap">
                                <div class="thumnailContainer" onclick="goDetail('${wmoim.MOIM_IDXX}')">
                                  <img src="${wmoim.MOIM_IMAG}" class="thumnail" alt="썸네일">
                                </div>
                                <div class="infoContainer">
                                  <h3 class="title" onclick="goDetail('${wmoim.MOIM_IDXX}')">${wmoim.MOIM_TITL}</h3>
                                    <div class="hashtagContainer">
                                        <button type="button" class="hashtag">#전시회</button>
                                        <button type="button" class="hashtag">#같이가요</button>
                                    </div>
                                    <div class="locationDateContainer">
                                        <div class="locationContainer">
                                            <div class="tooltip">
                                                <img src="/resources/img/icon/locationIcon.png" class="locationIcon" alt="장소 아이콘">
                                                <span class="location">${wmoim.REGI_NAME}</span>
                                                <div class="tooltiptext">${wmoim.PREGI_NAME}</div>
                                            </div>
                                        </div>
                                        <span class="dateContainer">${wmoim.SMAL_DATE}</span>
                                    </div>
                                    <div class="userContainer">
                                        <div class="userProfileWrap">
                                            <div class="profileImgWrap">
                                                <img src="${wmoim.USER_IMAG}" class="profileImg" alt="프로필사진">
                                            </div>
                                            <span class="nickname">${wmoim.USER_NICK}</span>
                                        </div>
                                        <div class="heartWrap">
										  <input type="hidden" data-like-id="${wmoim.MOIM_IDXX}" value="${wmoim.LIKE_YSNO}" id="heartYN"/>
                                          <div class="heartContainer">
                                            <input type="checkbox" id="${wmoim.MOIM_IDXX}" onchange="handleCheckboxChange(this)">
                                            <label for="${wmoim.MOIM_IDXX}"></label>
                                            <input id="realCount" type="hidden" data-realCount-id="${wmoim.MOIM_IDXX}" value="${wmoim.LIKE_COUNT}" >
                                            <span id="showCount" class="heartCount main" data-ShowCount-id="${wmoim.MOIM_IDXX}"></span>
								          </div>
								        </div>
                                    </div>
                                  </div>
                                </div>`;
                        
                            fragment.appendChild(slideContents);
                        }
                        
                        // 한 번에 삽입
                        weatherList.appendChild(fragment);
                        contentsSlider();
                        likeYsnoUpdate();

                        }
                },
                error: function(res, req) {
                    console.log("error : " + res, req);
                }

            })

            if(USER_NUMB == null){

                $.ajax({ //현재 위치정보 전달

                    url : "/getCurrentRegionMoim.com",
                    data: JSON.stringify({ cityCode : cityCode,
                                           moimType: moimType }),
                    type : "post",
                    dataType: "json",
                    contentType: "application/json",
                    success : function(data) {
                    
                        var data = data.data; 

                        const regionTitleArea = document.getElementById('regionTitle');

                        regionTitleArea.innerHTML = '근처에 있는 '+ comWhereIam().moimTypeKr +'에요!'
                    
                        const regionList = document.getElementById('regionList');
                        const fragment = document.createDocumentFragment(); 
                        
                        if(moimType == "gt") {
                            
                            for (let i = 0; i < data.length; i++) {
                                let rmoim = data[i];
                            
                                const slideContents = document.createElement('div');
                                slideContents.className = 'slideContents';
                                slideContents.innerHTML = `<div class="eachWrap">
                                    <div class="thumnailContainer" onclick="goDetail('${rmoim.MOIM_IDXX}')">
                                        <img src="${rmoim.MOIM_IMAG}" class="thumnail" alt="썸네일">
                                    </div>
                                    <div class="infoContainer">
                                        <h3 class="title" onclick="goDetail('${rmoim.MOIM_IDXX}')">${rmoim.MOIM_TITL}</h3>
                                        <div class="hashtagContainer">
                                            <button type="button" class="hashtag">#전시회</button>
                                            <button type="button" class="hashtag">#같이가요</button>
                                        </div>
                                        <div class="locationDateContainer">
                                            <div class="locationContainer">
                                                <div class="tooltip">
                                                    <img src="/resources/img/icon/locationIcon.png" class="locationIcon" alt="장소 아이콘">
                                                    <span class="location">${rmoim.REGI_NAME}</span>
                                                    <div class="tooltiptext">${rmoim.PREGI_NAME}</div>
                                                </div>
                                            </div>
                                            <span class="dateContainer">${rmoim.SMAL_DATE}</span>
                                        </div>
                                        <div class="userContainer">
                                            <div class="userProfileWrap">
                                                <div class="profileImgWrap">
                                                    <img src="${rmoim.USER_IMAG}" class="profileImg" alt="프로필사진">
                                                </div>
                                                <span class="nickname">${rmoim.USER_NICK}</span>
                                            </div>
                                            <div class="heartWrap">
                                              <input type="hidden" data-like-id="${rmoim.MOIM_IDXX}" value="${rmoim.LIKE_YSNO}" id="heartYN"/>
                                              <div class="heartContainer">
										        <input type="checkbox" id="${rmoim.MOIM_IDXX}" onchange="handleCheckboxChange(this)">
										        <label for="${rmoim.MOIM_IDXX}"></label>
										        <input id="realCount" type="hidden" data-realCount-id="${rmoim.MOIM_IDXX}" value="${rmoim.LIKE_COUNT}" >
                                                <span id="showCount"class="heartCount main" data-ShowCount-id="${rmoim.MOIM_IDXX}"></span>
								              </div>
								            </div>
                                        </div>
                                    </div>
                                    </div>`;
                            
                                fragment.appendChild(slideContents);
                            }
                        
                        // 한 번에 삽입
                        regionList.appendChild(fragment);
                        contentsSlider();
                        likeYsnoUpdate();
                        }
                    },
                    error: function(res, req) {
                        console.log("error : " + res, req);
                    }

                })
            }
            
            },//(날씨)openweathermapApi ajax success

        error:function(res, req) {
        console.log("error : " + res, req);

        }})
        
    })
    
});