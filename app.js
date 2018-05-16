const MEETUP_API_KEY = 'f4d566a3c5e5a34b3a1c374d26674c';
const MEETUP_SEARCH_URL = 'https://api.meetup.com/find/upcoming_events';

const YELP_API_KEY = 'qnf8UYYDXcGop6CzQwBEsHVqTcE9Ry_vAYIam9Pod9BiKz0inl8Mu1kX3ujjoWAv3lWGy5VzWAY9rJXpLTGhpXRbAZuoSlX1GviVDrNSKi3oiZLZcKiZtZxMREfyWnYx';
const YELP_APP_ID = 'aTewMq3vjvNecGeIWd8YCQ';
const YELP_SEARCH_URL = 'https://api.yelp.com/v3/businesses/search';


const GOOGLE_MAP_API_KEY = 'AIzaSyDQDYRHABdT_J5mNVNfuG0txLjxWhIjLpo';

function getDataFromMeetUp(search, callback){
    const query ={
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

// function getDataFromYelp(search, callback){
//     const query ={
//         page: '20',
//         radius: '45',
//         key: `${YELP_API_KEY}`,
//         id: `YELP_APP_ID`,
//         text: `${search}`,
//         limit: '4'
// 	}

// 	const settings = {
// 		url: YELP_SEARCH_URL,
// 		data: query,
// 		dataType: 'jsonp',
// 		type: 'GET',
// 		success: callback
// 	}

// 	$.ajax(settings);
// }

function watchSubmit(){
	$('#search-form').submit(event => {
		event.preventDefault();
		const target = $(event.currentTarget).find('#input-form');
		const query = target.val();		
		target.val("");
		getDataFromMeetUp(query, displaySearchResults);

		// console.log(query);
	})
}

function displaySearchResults(data)
{
	// console.log(data.data)
	// const results = data.data.events.map((item, index) => render(item));

	// console.log(data.data.events["0"].venue.lat);

	// var index = 0;

	// while(index < 5){
	// 	if(data.data.events[index].venue != undefined){
	// 		console.log(data.data.events[index].venue.lat);
	// 	}
	// 	index++;
	// }


	const results = data.data.events.map((item, index) => initMap(item));

	initMap(results);

	// $('#resultsArea').html(results);
}



//INITIALIZES GOOGLE MAP
function initMap(result) 
{
	// console.log(result.venue);
	// MAP
	var options = {
		zoom:8,
		center: {lat: 33.4269444,lng: -117.6111111},
	};
	var map = new google.maps.Map(document.getElementById('map'), options);

	// var markerTest = new google.maps.Marker({
	// 	position: {lat: 33.4269444,lng: -117.6111111},
	// 	map:map
	// });

	if(result.venue != undefined)
	{
		let latMeetup = result.venue.lat;
		let lonMeetup = result.venue.lon;

		console.log(latMeetup);
		console.log(lonMeetup);
	}

	if(latMeetup != undefined){
		var marker = new google.maps.Marker({
			position: {lat: 'latMeetup', lng: 'lonMeetup'},
			map:map
			});
	}
	
}

//LOADS THE JS FOR THE GOOGLE MAP
function loadScript(){
	var script = documentCreateElement('script');
	script.type = 'text/javascript';
	script.src = 'https://maps.googleapis.com/maps/api/js?=3.exp&' + 'callback=initMap';
	document.body.appendChild(script);
}


// $(initMap);

$(watchSubmit);