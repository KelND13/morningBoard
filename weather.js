const https = require('https');
//points to the api key stored in a separate json file:
const api = require('./api.json');

function printWeather(weather) {
	const message = `The current temperature in ${weather.location.city} is ${weather.current_observation.temp_f} degrees.`;
	console.log(message);

}

function get(query) {

	const request = 
	https.get(`https://api.wunderground.com/api/${api.key}/geolookup/conditions/q/${query}.json`, 
	response => {

		let body = "";

		//read the data:
		response.on('data', chunk => {
			body += chunk;
		});
		response.on('end', () => {
			//print the data:
			const weather = JSON.parse(body);
			printWeather(weather);
		});
	});
}

module.exports.get = get;