fetch("info.json")
	.then((response) => response.json())
	.then((jsonData) => {
		const data = jsonData.records;
		console.log(data);

		for (let i = 0; i < data.length; i++) {
			let title = data[i].name;
			let addr = data[i].address;
			let lat = data[i].lat;
			let lng = data[i].lng;
			console.log(`---------------------------------`);
			// console.log(title, addr, lat, lng);

			var imageSrc = "https://img.icons8.com/nolan/2x/marker.png", // 마커이미지의 주소입니다
				imageSize = new kakao.maps.Size(40, 40); // 마커이미지의 크기입니다

			var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

			var position = new kakao.maps.LatLng(lat, lng); //관광지들 위치 변수저장

			var marker = new kakao.maps.Marker({
				//Marker
				map: map, // 마커를 표시할 지도
				position: position, // 마커의 위치
				image: markerImage, //마커 이미지
			});

			// 마커에 표시할 인포윈도우를 생성합니다
			var infowindow = new kakao.maps.InfoWindow({
				content: `<a href="https://search.naver.com/"><div style='width:100%;background:red;display: inline-block;'>${title}</div></a>`, // 인포윈도우에 표시할 내용
				removable: true,
			});

			// for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
			kakao.maps.event.addListener(
				marker,
				"click",
				makeOverListener(map, marker, infowindow),
			);
			kakao.maps.event.addListener(marker, " ", makeOutListener(infowindow));
			// 인포윈도우를 표시하는 클로저를 만드는 함수입니다
			function makeOverListener(map, marker, infowindow) {
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
		}
	});
//------------------지도 생성 ------------------------------

var mapContainer = document.getElementById("map"), // 지도를 표시할 div
	mapOption = {
		center: new kakao.maps.LatLng(36.423946, 127.944388), // 지도의 중심좌표
		level: 12, // 지도의 확대 레벨
	};

// 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
var map = new kakao.maps.Map(mapContainer, mapOption);
