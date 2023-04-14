const KEY = "6355456a56736f6a37317159797156";
const TYPE = "json";
const link = `http://openapi.seoul.go.kr:8088/${KEY}/${TYPE}/tbPartcptn/1/5/`;
let apis;
let addressArr = [];
let imageArr = [
  "https://familynet.or.kr/upload/editor/04738a3b-791f-490e-b891-5c90c25fe22a.png",
  "https://lh4.googleusercontent.com/F0vtI090bgGFMipDpTZV8h_pRi0CDrqHoMD9PJwdW_48VujI7HzBICkO5eqmneA0izTpHMDP1lSu7j--1I9fj6WzEGUAGKa2KT1KnCZzzyVoNzC3FF6hjnHRMpJREoYgGw=w891",
  "https://youth.seoul.go.kr/site/main/file/image/uu/38acfe22524b4bd4b818ae4554d4e766",
  "https://youth.seoul.go.kr/site/main/file/thumbnail/uu/173ba26e32874d7b9ec1ca4ea29fddc3",
  "data:image/png;base64,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",
];
// 비동기로 호출하자
fetch(link)
  .then((response) => response.json())
  .then((json) => console.log(json));

// AJAX로 link 호출하자(Asynchronous JavaScript And XML)
let getProgrammAPI = (link) => {
  // XMLHttpRequest 만들자
  let xhr = new XMLHttpRequest();

  // callback
  xhr.onreadystatechange = () => {
    if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
      //리퀘스트가 다 끝나서 응답이 왔다면
      console.log("성공!");
      let json = JSON.parse(xhr.response);
      let getData = json["tbPartcptn"]["row"];
      apis = show(getData); // json 파싱함수 호출
      // addressArr = getAddress(getData);
      console.log(addressArr);
    } else {
      //실패
    }
  };

  // 요청을 보낼 방식, link, 비동기여부 설정하자
  xhr.open("GET", link, true);

  // 요청 전송
  xhr.send();
};

function show(jsonString) {
  // let json = JSON.parse(jsonString);
  // let jsonString = json["tbPartcptn"]["row"];
  // jsonData 순서대로 가져오기
  for (let i = 0; i < jsonString.length; i++) {
    let getSeoulArea = jsonString[i]["ATDRC_NM"];
    let getProgramName = jsonString[i]["PARTCPTN_SJ"];
    let startDate = jsonString[i]["RCEPT_DE1"];
    let endDate = jsonString[i]["RCEPT_DE2"];
    let applyLink = jsonString[i]["RCEPT_MTH_LINK"];
    let tag = jsonString[i]["SE_NM"];

    const date = `${startDate}~${endDate}`.replaceAll("-", ".");

    //아이템 생성
    let flex_content = document.getElementsByClassName("flex-content")[0];
    let flex_item = document.createElement("flex-item");
    flex_item.innerHTML = `<div class="program-img" style="background-image:url(${imageArr[i]});"></div>
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
  return jsonString;
}

function getAddress(jsonString) {
  // 프로그램 하는 위치 getter
  // let json = JSON.parse(jsonString);
  // let jsonString = json["tbPartcptn"]["row"];
  let address = [];
  for (let i = 0; i < jsonString.length; i++)
    address.push(jsonString[i]["PLACE_ADRES1"]);
  return address;
}

let promise = new Promise((resolve, reject) => {
  getProgrammAPI(link); // apis 호출
  resolve();
});

promise.then(
  setTimeout(function () {
    var mapContainer = document.getElementById("map"), // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 9, // 지도의 확대 레벨
      };

    // 지도를 생성합니다
    var map = new kakao.maps.Map(mapContainer, mapOption);

    // 주소-좌표 변환 객체를 생성합니다
    var geocoder = new kakao.maps.services.Geocoder();
    for (let i = 0; i < apis.length; i++) {
      // 주소로 좌표를 검색합니다
      geocoder.addressSearch(
        `${apis[i]["PLACE_ADRES1"]}`,
        function (result, status) {
          // 정상적으로 검색이 완료됐으면
          if (status === kakao.maps.services.Status.OK) {
            var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

            // 결과값으로 받은 위치를 마커로 표시합니다
            // 결과값으로 받은 위치를 마커로 표시합니다
            var marker = new kakao.maps.Marker({
              map: map,
              position: coords,
            });

            // 인포윈도우로 장소에 대한 설명을 표시합니다
            var infowindow = new kakao.maps.InfoWindow({
              content: `<div style="width:150px;text-align:center;padding:10px 0;font-size:8px;">${apis[i]["PARTCPTN_SJ"]}</div>`,
            });
            infowindow.open(map, marker);

            // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
            map.setCenter(coords);
          }
        }
      );
    }
  }, 1500)
);

function getImageUrl() {}
