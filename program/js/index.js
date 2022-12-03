const KEY = "6355456a56736f6a37317159797156";
const TYPE = "json"
const link = `http://openapi.seoul.go.kr:8088/${KEY}/${TYPE}/tbPartcptn/1/5/`;
let addressArr=[];
 // 비동기로 호출하자
 fetch(link).then((response) => response.json()).then((json) => console.log(json));

 // AJAX로 link 호출하자(Asynchronous JavaScript And XML)
let getProgrammAPI = (link)=>{
    // XMLHttpRequest 만들자
    let xhr = new XMLHttpRequest();
    
    // callback
    xhr.onreadystatechange = () => {
        if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
            //리퀘스트가 다 끝나서 응답이 왔다면
            console.log("성공!");
            // console.log(xhr.response);
            show(xhr.response); // json 파싱함수 호출
            addressArr = getAddress(xhr.response);
        }else{
            //실패
        }
    }

    // 요청을 보낼 방식, link, 비동기여부 설정하자
    xhr.open("GET", link, true);

    // 요청 전송
    xhr.send();
}


function show(jsonString) {
    let json = JSON.parse(jsonString);
    let getJsonData = json["tbPartcptn"]["row"]
    console.log(getJsonData)
    // jsonData 순서대로 가져오기
    for (let i = 0; i<getJsonData.length; i++){
        let getSeoulArea = getJsonData[i]["ATDRC_NM"];
        let getProgramName = getJsonData[i]["PARTCPTN_SJ"];
        let startDate = getJsonData[i]["RCEPT_DE1"];
        let endDate = getJsonData[i]["RCEPT_DE2"];
        let applyLink = getJsonData[i]["RCEPT_MTH_LINK"];
        let tag = getJsonData[i]["SE_NM"];

        const date = `${startDate}~${endDate}`.replaceAll("-", ".");

        //아이템 생성
        let flex_content = document.getElementsByClassName("flex-content")[0];
        let flex_item = document.createElement("flex-item");
        flex_item.innerHTML =`<div class="program-img"></div>
                                <div class="flex-item-content">
                                    <p class="program-name">${getProgramName}</p>
                                    <div style="display: flex; margin-bottom: 0.8rem;">
                                        <div class="location" style="display: flex; justify-content: center; align-items: center;">
                                            <img src="../img/map-pin.svg" style="width: 18px; height:18px; margin-right: 5px;" />
                                            <p class="program-address">${getSeoulArea}</p>
                                        </div>
                                            <span class="program-tag">${tag}</span>
                                        </div>
                                    <p class="program-date">${date}</p>
                                </div>`;
        flex_content.appendChild(flex_item);
    }
}

function getAddress(jsonString){
    let json = JSON.parse(jsonString);
    let getJsonData = json["tbPartcptn"]["row"]
    let address=[]
    for (let i = 0; i<getJsonData.length; i++)
        address.push(getJsonData[i]["PLACE_ADRES1"]);
    return address;
}

function initialize() {
    getProgrammAPI(link) // api 호출
    setTimeout(function(){
        var mapOptions = {
            zoom: 11, // 지도를 띄웠을 때의 줌 크기
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var map = new google.maps.Map(document.getElementById("map"), // div의 id과 값이 같아야 함. "map-canvas"
                            mapOptions);

        var size_x = 40; // 마커로 사용할 이미지의 가로 크기
        var size_y = 40; // 마커로 사용할 이미지의 세로 크기

        // 마커로 사용할 이미지 주소
        var image = new google.maps.MarkerImage( '주소를 입력하세요',
                                            new google.maps.Size(size_x, size_y),
                                            '',
                                            '',
                                            new google.maps.Size(size_x, size_y));

        // Geocoding *****************************************************
        for (i of addressArr){
            var address = i; // DB에서 주소 가져와서 검색하거나 왼쪽과 같이 주소를 바로 코딩.
            var marker = null;
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode( { 'address': address}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                map.setCenter(results[0].geometry.location);
                marker = new google.maps.Marker({
                    map: map,
                    icon: image, // 마커로 사용할 이미지(변수)
                    title: "kara", // 마커에 마우스 포인트를 갖다댔을 때 뜨는 타이틀
                    position: results[0].geometry.location
                });
                // var content = "한밭도서관<br/><br/>Tel: 042-580-4114"; // 말풍선 안에 들어갈 내용
                // 마커를 클릭했을 때의 이벤트. 말풍선 뿅~
                // var infowindow = new google.maps.InfoWindow({ content: content});
                google.maps.event.addListener(marker, "click", function() {infowindow.open(map,marker);});
            } else {
                alert("Geocode was not successful for the following reason: " + status);
            }
        });
        }
    },500);
    // Geocoding // *****************************************************
     
}
google.maps.event.addDomListener(window, 'load', initialize);