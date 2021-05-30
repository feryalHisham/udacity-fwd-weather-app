/**
 * projectData acts as the API endpoint. 
 */
projectData = [];

/**
 * Server will run using the port 3000
 */
const port = 3000;

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

// Dependencies
const bodyParser = require('body-parser')
const cors = require('cors');

/* BodyParser Middleware*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const server = app.listen(port, listening);

/**
 * Callback function for running the server
 */
function listening(){
console.log(`running on localhost: ${port}`);
};

// GET Route
app.get('/getWeather', sendWeather);

/**
 * GET callback function that returns the `projectData` object as response to client.
 * @param {*} request from client
 * @param {*} response to client
 */
function sendWeather (request, response) {
  response.send(projectData);
};

// POST Route
app.post('/addWeather', addNewWeatherEntry);

/**
 * POST callback function that recieves data from client and add it as a new entry to `projectData` object
 * @param {*} request from client
 * @param {*} response to client
 */
function addNewWeatherEntry(request, response) {
    const weather = {temperature: request.body.temperature, date: request.body.date, userResponse: request.body.userResponse };
    projectData.push(weather);
    response.send(projectData);
}
