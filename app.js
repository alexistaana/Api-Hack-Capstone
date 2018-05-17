const MEETUP_API_KEY = 'f4d566a3c5e5a34b3a1c374d26674c';
const MEETUP_SEARCH_URL = 'https://api.meetup.com/find/upcoming_events';

const YELP_API_KEY = 'qnf8UYYDXcGop6CzQwBEsHVqTcE9Ry_vAYIam9Pod9BiKz0inl8Mu1kX3ujjoWAv3lWGy5VzWAY9rJXpLTGhpXRbAZuoSlX1GviVDrNSKi3oiZLZcKiZtZxMREfyWnYx';
const YELP_APP_ID = 'aTewMq3vjvNecGeIWd8YCQ';
const YELP_SEARCH_URL = 'https://api.yelp.com/v3/businesses/search';


const GOOGLE_MAP_API_KEY = 'AIzaSyDQDYRHABdT_J5mNVNfuG0txLjxWhIjLpo';

function getDataFromMeetUp(search, callback) {
	const query = {
		key: `${MEETUP_API_KEY}`,
		sign: "true",
		text: `${search}`,
		page: '5'
		// radius: '45',	
	}

	const settings = {
		url: MEETUP_SEARCH_URL,
		data: query,
		dataType: 'jsonp',
		type: 'GET',
		success: callback
	}

	$.ajax(settings);
}

function getDataFromYelp(search, callback) {
	const query = {
		radius: '400',
		API_KEY: `${YELP_API_KEY}`,
		id: `${YELP_APP_ID}`,
		term: 'food',
		location: `${search}`,
		limit: '4'
	}

	const settings = {
		url: YELP_SEARCH_URL,
		data: query,
		dataType: 'jsonp',
		type: 'GET',
		success: callback
	}

	$.ajax(settings);
}

function watchSubmit() {
	$('#search-form').submit(event => {
		event.preventDefault();
		const target = $(event.currentTarget).find('#input-form');
		const query = target.val();
		target.val("");
		getDataFromMeetUp(query, displaySearchResultsMeetup);

		// console.log(query);
	})
}

function displaySearchResultsYelp(data) {

	console.log(data);

}


function displaySearchResultsMeetup(data) {

	console.log(data.data);

	const results = data.data.events;

	let idx = 0;

	while (idx < 5) {
		if (typeof results[idx].venue !== "undefined") {
			getDataFromYelp(results[idx].venue.address_1, displaySearchResultsYelp)
		}
		idx++;
	}

	initMap(results);

	// $('#resultsArea').html(results);
}



//INITIALIZES GOOGLE MAP
function initMap(result) {
	// console.log(result.venue);
	// MAP

	let options = {
		zoom: 10,
		center: { lat: 33.4269444, lng: -117.6111111 },
	};

	let map = new google.maps.Map(document.getElementById('map'), options);

	let idx = 0;

	//WHILE LOOP GOES THROUGH ARRAY
	while (idx < 5) {
		if (typeof result[idx].venue !== "undefined") {
			// console.log("Went in!");
			//ADDS MARKER
			let marker = new google.maps.Marker({
				position: { lat: result[idx].venue.lat, lng: result[idx].venue.lon },
				map: map
			});

			let infoWindow = new google.maps.InfoWindow({
				content: `<h1 style="margin-bottom:5px;">${result[idx].name}</h1>
							<h2 style="margin-bottom:5px; margin-top:5px;">${result[idx].venue.address_1}</h2>
							<h2 style="margin-top:5px;"><a href="${result[idx].link}" target="_blank">
							MEETUP PAGE</a></h2>`

			});

			marker.addListener('click', function () {
				infoWindow.open(map, marker);
			});
		}
		idx++;
	}

	// if(result[idx].venue !== undefined && result[idx].venue !== "" && typeof result[idx].venue !== 
	// 'undefined'){
	// 	while(idx < 5)
	// 	{
	// 		// console.log(result[idx].venue.lat);
	// 		var marker  = new google.maps.Marker({
	// 			position: {lat: result[idx].venue.lat ,lng: result[idx].venue.lon},
	// 			map:map
	// 		});
	// 		idx++;
	// 	}
	// }

}

//LOADS THE JS FOR THE GOOGLE MAP
function loadScript() {
	var script = documentCreateElement('script');
	script.type = 'text/javascript';
	script.src = 'https://maps.googleapis.com/maps/api/js?=3.exp&' + 'callback=initMap';
	document.body.appendChild(script);
}

// $(initMap);

$(watchSubmit);