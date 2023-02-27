
fetch("info.json")
.then(response => response.json())
.then(jsonData => {
    const data = jsonData.records;
    var tag = [];
    console.log(data);
    
    for(let i=0; i<data.length; i++) {
            let title = data[i].name;
            let addr = data[i].address;
            let lat = data[i].lat;
            let lng = data[i].lng;
            console.log(`---------------------------------`);
            // console.log(title, addr, lat, lng);

        // var imageSrc = 'https://img.icons8.com/nolan/2x/marker.png', // 마커이미지의 주소입니다    
        var imageSrc = 'https://img.icons8.com/nolan/2x/marker.png', // 마커이미지의 주소입니다    
            imageSize = new kakao.maps.Size(40, 40) // 마커이미지의 크기입니다
            // imageOption = {offset: new kakao.maps.Point(27, 69)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
            // 이미지 옵션 지워줘서 마커 위치 움직이는거 고침

        // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize)
        // markerPosition = new kakao.maps.LatLng(lat, lng); // 마커가 표시될 위치입니다
        var position =  new kakao.maps.LatLng(lat, lng); //관광지들 위치 변수저장
        //마커는 지웠음 클러스터러랑 겹처서 이중 마커 떠서 마커구하는 공식은 지움

        // 마커 클러스터러로 관리할 마커 객체는 생성할 때 지도 객체를 설정하지 않습니다
        var markers = $(jsonData).map(function() {
            return new kakao.maps.Marker({   //Marker
                map: map,
                position : position,
                image: markerImage,
                title: title, //마우스 올리면 관광지명 
                // content: `<div style='background:black;'>${title}</div>` //CustomOverlay할때만 먹힘
            });
        });
        // 클러스터러에 마커들을 추가합니다
        clusterer.addMarkers(markers);

        // markers.setMap(map);

        let gangwon = addr.indexOf('강원도');

        let busan = addr.indexOf('부산광역시');

        let gyeongbuk = addr.indexOf('경상북도');
        let gyeongnam = addr.indexOf('경상남도');

        let jeonbuk = addr.indexOf('전라북도');
        let jeonnam = addr.indexOf('전라남도');

        let seoul = addr.indexOf('서울특별시');

        let chungbuk = addr.indexOf('충청북도');
        let chungnam = addr.indexOf('충청남도');

        let gyeonggi = addr.indexOf('경기도');

        let ulsan = addr.indexOf('울산광역시');

        let daejeon = addr.indexOf('대전광역시');

        let incheon = addr.indexOf('인천광역시');

        let daegu = addr.indexOf('대구광역시');

        let gwangju = addr.indexOf('광주광역시');

        let jeju = addr.indexOf('제주특별자치도');





     
    }

});    








//------------------지도 생성 ------------------------------
var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
mapOption = { 
    center: new kakao.maps.LatLng(36.423946, 127.944388), // 지도의 중심좌표
    level: 12 // 지도의 확대 레벨
};

// 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
var map = new kakao.maps.Map(mapContainer, mapOption); 

// 마커 클러스터러를 생성합니다 
var clusterer = new kakao.maps.MarkerClusterer({
map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체 
averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정 
minLevel: 10 // 클러스터 할 최소 지도 레벨 
});    