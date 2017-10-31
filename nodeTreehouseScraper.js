//connect to the api url 
//read the data
//parse the data
// return the data
//require https module:
const https = require('https');

function printError(error) {
	console.error(error.message);
}

function printMessage(username, badgeCount, points) {
	const message = `${username} has ${badgeCount} total badge(s) and ${points} points in JavaScript`;
	console.log(message);
}

function getProfile(username) {

	try {
	const request = https.get(`https://teamtreehouse.com/${username}.json`, response => {
	//console.log(response.statusCode); 
	if (response.statusCode === 200) {
	let body = "";
	response.on('data', data => {
		//console.log('data:', data.toString());
		
		body += data.toString();

	});
		//end the data call (end handler):
	response.on('end', () => {
			//parse all the data:

		//make sure its a valid username:
		try {
			const profile = JSON.parse(body);
			printMessage(username, profile.badges.length, profile.points.JavaScript);
		} catch (error) {
			printError(error);
		}

		//print a useful slice of the data:

	});
	} else {
		const message = `There was an error getting the profile for ${username} (${response.statusCode})`;
		const statusCodeError = new Error(message);
		printError(statusCodeError);
	}
});

	//asyncronous error handling:
	request.on('error', printError);

	//missing https for api:
	} catch (error) {
		printError(error);
	}


}

const users = process.argv.slice(2);

users.forEach(username => {

	getProfile(username);
});

//OR because both have one variable:
//users.forEach(getProfile); 