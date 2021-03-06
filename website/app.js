/**
 * `weatherApiBaseUrl` URL of Open Weather Map querying the weather using the zip code of the city
 */
const weatherApiBaseUrl = 'http://api.openweathermap.org/data/2.5/weather?zip={zip}';

/**
 * `weatherApiKey` my personal API key aquired by signing up
 */
const weatherApiKey = '&appid=73da9a79340b43b9bd793bbed9e1a89a&units=metric';

/**
 * Callback function of generate button. It calls the fetchWeather() function and chain promises to post data to server and update UI.
 */
function generateCallBack() {
    fetchWeather(weatherApiBaseUrl, weatherApiKey, document.getElementById('zip').value)
    .then(weatherData => {
        const userFeelings = document.getElementById('feelings').value;
        const data = {temperature: weatherData.main.temp, date: getDate(), userResponse: userFeelings};
        sendWeatherToServer('/addWeather', data)
        .then(() => {getWeatherFromServer('/getWeather').then(dataFromServer => {
            updateFields(dataFromServer);
        });
    });
    }).catch(error => {
        console.log(error);
    });
}

/**
 * Calls the openweathermap API passing the zip code of the city required and personal key
 * @param {*} baseUrl the base url of openweathermap API
 * @param {*} key personal key aquired by signing up
 * @param {*} cityZipCode city zip code obtained from user input
 */
const fetchWeather = async (baseUrl, key, cityZipCode) => {
    displayError(false);
    const weatherResponse = await fetch(baseUrl.replace('{zip}', cityZipCode).concat(key), {mode: 'cors'});
    try {
        const weatherData = await weatherResponse.json();
        if(!weatherData.main) {
            throw weatherData;
        }
        return weatherData;
    } catch(error) {
        handleError(error.message);
    }
}

/**
 * Calls fetch method to GET weather data from server
 * @param {*} url GET Route in server
 * @returns the data from server
 */
const getWeatherFromServer = async ( url = '') => {

    const response = await fetch(url);

    try {
      const newData = await response.json();
      return newData;
    } catch(error) {
        console.log("error", error);
    }
}

/**
 * Calls fetch method to POST weather data to server
 * @param {*} url POST Route in server
 * @param {*} data send as request body to server
 * @returns 
 */
const sendWeatherToServer = async ( url = '', data = {})=>{
    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),        
  });

    try {
      const newData = await response.json();
      return newData;
    } catch(error) {
        console.log("error", error);
    }
}

/**
 * Updates UI Fields `date`, `temp` and `content` according to the data recieved from server;
 * @param {*} data recieved from server
 */
function updateFields(data) {
    document.getElementById('date').innerHTML = data.date;
    document.getElementById('temp').innerHTML = data.temperature + ' degress Celsius';
    document.getElementById('content').innerHTML = data.userResponse;
}

/**
 * Handles error returned from openweathermap API by setting the innerHTML of the error div and clearing the `Most Recent Entry` section
 * @param {*} error 
 */
function handleError(error) {
    const errorDiv = document.getElementById('errorDiv');
    errorDiv.innerHTML = error;
    displayError(true);
    document.getElementById('date').innerHTML = '';
    document.getElementById('temp').innerHTML = '';
    document.getElementById('content').innerHTML = '';
}

/**
 * Displays the error div
 * @param {*} show 
 */
function  displayError(show) {
    const errorDiv = document.getElementById('errorDiv');
    errorDiv.style.display = show ? 'contents' : 'none';
}

//////////////////////////////// Util functions////////////////////////////

/**
 * Creates a new date instance dynamically with JS
 * @returns current data in format of MM.DD.YYYY
 */
function getDate() {
    let d = new Date();
    let newDate = (d.getMonth() + 1)  +'.'+ d.getDate()+'.'+ d.getFullYear();
    return newDate;
}
