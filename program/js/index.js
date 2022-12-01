const KEY = "6355456a56736f6a37317159797156";
const TYPE = "json"
const link = `http://openapi.seoul.go.kr:8088/${KEY}/${TYPE}/tbPartcptn/1/5/`;

 // 비동기로 호출하자
 fetch(link).then((response) => response.json()).then((json) => console.log(json));

 // AJAX로 link 호출하자(Asynchronous JavaScript And XML)
let getMenuByAPI = (link)=>{
    // XMLHttpRequest 만들자
    let xhr = new XMLHttpRequest();
    
    // callback
    xhr.onreadystatechange = () => {
        if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
            //리퀘스트가 다 끝나서 응답이 왔다면
            console.log("성공!");
            // console.log(xhr.response);
            show(xhr.response); // json 파싱함수 호출
        }else{
            //실패
        }
    }

    // 요청을 보낼 방식, link, 비동기여부 설정하자
    xhr.open("GET", link, true);

    // 요청 전송
    xhr.send();
}

getMenuByAPI(link)

const show = (jsonString) => {
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