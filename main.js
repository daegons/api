var map = new kakao.maps.Map(document.getElementById('map'), { // 지도를 표시할 div
	center: new kakao.maps.LatLng(36.423946, 127.944388), // 지도의 중심좌표 
	level: 13 // 지도의 확대 레벨 
});


var clusterer = new kakao.maps.MarkerClusterer({
	map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체 
	averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정 
	minLevel: 6 // 클러스터 할 최소 지도 레벨 
});
//---------------------------
var imageSrc = "https://img.icons8.com/nolan/2x/marker.png", // 마커이미지의 주소입니다
				imageSize = new kakao.maps.Size(40, 40); // 마커이미지의 크기입니다

			var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
// 인포윈도우를 표시하는 클로저를 만드는 함수입니다 
function makeOverListener(map, marker, infowindow) {
	infowindow.close();
	return function () {
		infowindow.open(map, marker);
	};
}

// 인포윈도우를 닫는 클로저를 만드는 함수입니다 
function makeOutListener(infowindow) {
	return function () {
		infowindow.close();
	};
}
//---------------------------
// 데이터를 가져오기 위해 jQuery를 사용합니다
// 데이터를 가져와 마커를 생성하고 클러스터러 객체에 넘겨줍니다

$.get("./info.json", function (data) {
	// 데이터에서 좌표 값을 가지고 마커를 표시합니다
	// 마커 클러스터러로 관리할 마커 객체는 생성할 때 지도 객체를 설정하지 않습니다
	var markers = $(data.positions).map(function (i, position) {
		var maks = new kakao.maps.Marker({
			map: map,
			position: new kakao.maps.LatLng(position.x, position.y),
			image: markerImage //마커 이미지
		});

		var infowindow = new kakao.maps.InfoWindow({
			content: content,
			removable: true  //닫기 기능
		});
		var title = position.name
		kakao.maps.event.addListener(maks, 'click', makeOverListener(map, maks, infowindow));
		return maks;
	});
	//----------------------------------------------------------------------------------------------------------
	
	
	
	// 클러스터러에 마커들을 추가합니다
	clusterer.addMarkers(markers);
});



var content = `<div class="overlaybox">` +
`    <div class="boxtitle">금주 영화순위</div>` +
`    <div class="first">` +
`        <div class="triangle text">1</div>` +
`        <div class="movietitle text">asdadsas</div>` +
`    </div>` +
`    <ul>` +
`        <li class="up">` +
`            <span class="number">2</span>` +
`            <span class="title">명량</span>` +
`            <span class="arrow up"></span>` +
`            <span class="count">2</span>` +
`        </li>` +
`        <li>` +
`            <span class="number">3</span>` +
`            <span class="title">해적(바다로 간 산적)</span>` +
`            <span class="arrow up"></span>` +
`            <span class="count">6</span>` +
`        </li>` +
`        <li>` +
`            <span class="number">4</span>` +
`            <span class="title">해무</span>` +
`            <span class="arrow up"></span>` +
`            <span class="count">3</span>` +
`        </li>` +
`        <li>` +
`            <span class="number">5</span>` +
`            <span class="title">안녕, 헤이즐</span>` +
`            <span class="arrow down"></span>` +
`            <span class="count">1</span>` +
`        </li>` +
`    </ul>` +
`</div>`;








