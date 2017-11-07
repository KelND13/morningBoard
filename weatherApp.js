const weather = require('./weather');

//this cleans up the users input so the api can successfully parse the data:
const query = process.argv.slice(2).join("_").replace(' ', '_');
weather.get(query);