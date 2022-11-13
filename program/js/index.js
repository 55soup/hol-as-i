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
    let seoulArea = getJsonData[0]["ATDRC_NM"]
    let programName = getJsonData[0]["INSTT_NM"]
    console.log(getJsonData)
    console.log(seoulArea)
    console.log(programName)
}