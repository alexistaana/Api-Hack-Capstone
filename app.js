const MEETUP_API_KEY = 'f4d566a3c5e5a34b3a1c374d26674c';
const MEETUP_SEARCH_URL = 'https://api.meetup.com/find/upcoming_events';

const YELP_API_KEY = 'qnf8UYYDXcGop6CzQwBEsHVqTcE9Ry_vAYIam9Pod9BiKz0inl8Mu1kX3ujjoWAv3lWGy5VzWAY9rJXpLTGhpXRbAZuoSlX1GviVDrNSKi3oiZLZcKiZtZxMREfyWnYx';
const YELP_APP_ID = 'aTewMq3vjvNecGeIWd8YCQ';
const YELP_SEARCH_URL = 'https://api.yelp.com/v3/businesses/search';

function getDataFromMeetUp(search, callback){
    const query ={
		key: `${MEETUP_API_KEY}`,
		sign: "true",
		text: `${search}`,
		page: '20',
		// radius: '45',
		
    }

    $.getJSON(MEETUP_SEARCH_URL, query, callback);
}

// function getDataFromYelp(search, callback){
//     const query ={
//         page: '20',
//         radius: '45',
//         key: `${MEETUP_API_KEY}`,
//         text: `${search}`,
//     }

//    $.getJSON(YELP_SEARCH_URL, query, callback);
// }

function watchSubmit(){
	$('#search-form').submit(event => {
		event.preventDefault();
		const target = $(event.currentTarget).find('#input-form');
		const query = target.val();		
		target.val("");
		getDataFromMeetUp(query, displaySearchResults);

		console.log(query);
	})

	
}

function displaySearchResults(data)
{
	const results = data.items.map((item, index) => render(item));

	$('#resultsArea').html(results);
}

function render(result){
	return`
	<p>hai</p>
	<section>
		<p>Name: ${result.events.city}</p>
	</section>
	`;
}


$(watchSubmit);