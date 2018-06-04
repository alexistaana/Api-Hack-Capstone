$(document).ready(function () {
	//CONSTANTS FOR API QUERIES
	const MEETUP_API_KEY = 'f4d566a3c5e5a34b3a1c374d26674c';
	const MEETUP_SEARCH_URL = 'https://api.meetup.com/find/upcoming_events';

	const FOURSQUARE_API_SECRET = 'XVXHKYAKD0EPMJ2MC1XSM0GAPMTIXQG1KQOGSLSPYKZE1H3P';
	const FOURSQUARE_APP_ID = 'YM3HNDZMFJVFKCYLPRZ3RLGDHUREH5WMTREMZOUYBJ4TCQG2';
	const FOURSQUARE_SEARCH_URL = 'https://api.foursquare.com/v2/venues/search';

	const GEOLOCATION_URL = 'http://ip-api.com/json'

	//FOURSQUARE MARKER IMAGE
	const FOOD_LOCATION_IMAGE = 'http://www.clker.com/cliparts/R/g/O/v/U/h/google-maps-marker-for-residencelamontagne-hi.png';

	//DECLARE MAP VARIABLE
	let map;

	//GETS GEOLOCATION OF USER
	function getLocation(callback) {
		$.getJSON(GEOLOCATION_URL, callback);
	}

	// INITIALIZES MAP
	getLocation(function (data) {
		console.log('hai');
		let options = {
			zoom: 10,
			center: { lat: data.lat, lng: data.lon }
		};

		//DECLARE AND INITIALIZE MAP VARIABLE
		map = new google.maps.Map(document.getElementById('map'), options);
	})

	//GETS THE DATA FROM MEETUP API
	function getDataFromMeetUp(search, callback) {

		//CALLS GETLOCATION TO RETRIEVE LOCATION OF USER
		getLocation(function (data) {
			const query = {
				key: MEETUP_API_KEY,
				sign: "true",
				text: `${search}`,
				page: '8',
				lat: `${data.lat}`,
				lon: `${data.lon}`
			}

			const settings = {
				url: MEETUP_SEARCH_URL,
				data: query,
				dataType: 'jsonp',
				type: 'GET',
				success: callback
			}

			$.ajax(settings);
		})
	}

	//GETS DATA FROM FOURSQUARE API
	function getDataFromFoursquare(search, callback) {
		const query = {
			client_id: FOURSQUARE_APP_ID,
			client_secret: FOURSQUARE_API_SECRET,
			ll: `${search}`,
			categoryId: '56aa371be4b08b9a8d57350b,4bf58dd8d48988d16c941735,52e81612bcbc57f1066b7a0c,4bf58dd8d48988d16d941735,52e81612bcbc57f1066b7a00,4bf58dd8d48988d1d0941735,4bf58dd8d48988d147941735,4bf58dd8d48988d148941735,4bf58dd8d48988d16e941735,4bf58dd8d48988d112941735,4bf58dd8d48988d1bf941735',
			v: '20180420',
			radius: '15000'
		}

		const settings = {
			url: FOURSQUARE_SEARCH_URL,
			data: query,
			dataType: 'json',
			type: 'GET',
			success: callback
		}

		$.ajax(settings);
	}

	//WATCHES THE SUBMIT BUTTON
	function watchSubmit() {
		$('#search-form').submit(event => {
			event.preventDefault();
			const target = $(event.currentTarget).find('#input-form-two');
			const query = target.val();
			target.val("");
			getDataFromMeetUp(query, getDataApi);

			$('#searchBox').hide(1500);
			$('#logoHeader').hide(1500);
			$('#resultsArea').show(1500);
		})
	}

	//GETS THE DATA USED FOR THE MARKERS
	function getDataApi(data) {

		const results = data.data.events;
		let idx = 0;

		//WHILE LOOP THAT GOES THROUGH ARRAY
		while (idx < 6) {
			if (results[idx]) {
				if (typeof results[idx].venue !== "undefined") {
					//CALLS FXN TO GET FOURSQUARE DATA
					getDataFromFoursquare(`${results[idx].venue.lat}, ${results[idx].venue.lon}`, foursquareMapOptions);
				}
			}
			idx++;
		}

		//INITIALIZES MEETUP MARKER
		meetupMapOptions(results);
	}

	//INITIALIZES THE MARKERS FROM FOURSQUARE
	function foursquareMapOptions(data) {

		let idx = 0;

		let icon = {
			url: FOOD_LOCATION_IMAGE,
			scaledSize: new google.maps.Size(27, 43)
		}


		//WHILE LOOP THAT GOES THROUGH ARRAY
		while (idx < 3) {
			//ADDS MARKERS
			let foursquareMarker = new google.maps.Marker({
				position: { lat: data.response.venues[idx].location.lat, lng: data.response.venues[idx].location.lng },
				map: map,
				icon: icon,
				animation: google.maps.Animation.DROP
			});

			//INFO OF MARKER
			let infoWindowFourSquare = new google.maps.InfoWindow({
				content: `<h1 style="margin-bottom:5px;">${data.response.venues[idx].name}</h1>
					  <h2 style="margin-top:5px;">${data.response.venues[idx].location.address}, <br> ${data.response.venues[idx].location.city}, ${data.response.venues[idx].location.state} </h2>`

			});

			foursquareMarker.addListener('click', function () {
				infoWindowFourSquare.open(map, foursquareMarker);
			});

			idx++;
		}

	}

	//INITIALIZES THE MARKERS FROM MEETUP
	function meetupMapOptions(result) {

		let idx = 0;

		//WHILE LOOP GOES THROUGH ARRAY
		while (idx < 6) {
			if (result[idx]) {
				if (typeof result[idx].venue !== "undefined") {

					//ADDS MARKER
					let marker = new google.maps.Marker({
						animation: google.maps.Animation.DROP,
						position: { lat: result[idx].venue.lat, lng: result[idx].venue.lon },
						map: map
					});

					//INFO OF MARKER
					let infoWindow = new google.maps.InfoWindow({
						content: `<h1 style="margin-bottom:5px;">${result[idx].name}</h1>
								<h2 style="margin-bottom:5px; margin-top:5px;">${result[idx].venue.address_1}, <br> ${result[idx].venue.city}, ${result[idx].venue.state}</h2>
								<h2 style="margin-top:5px;"><a href="${result[idx].link}" target="_blank">
								MEETUP PAGE</a></h2>`
					});

					marker.addListener('click', function () {
						infoWindow.open(map, marker);
					});
				}
			}
			idx++;
		}
	}


	$(watchSubmit);
});