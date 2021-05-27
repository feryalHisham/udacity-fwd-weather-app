/* Global Variables */
const weatherApiBaseUrl = 'http://api.openweathermap.org/data/2.5/weather?zip={zip}'
const weatherApiKey = '&appid=73da9a79340b43b9bd793bbed9e1a89a';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

/**
 * Callback function of generate button. It calls the fetchWeather() function
 */
function generateCallBack() {
    fetchWeather(weatherApiBaseUrl, weatherApiKey, document.getElementById('zip').value);
}

/**
 * Calls the openweathermap API passing the zip code of the city required and personal key
 * @param {*} baseUrl the base url of openweathermap API
 * @param {*} key personal key aquired by signing up
 * @param {*} cityZipCode city zip code obtained from user input
 */
const fetchWeather = async (baseUrl, key, cityZipCode) => {

    const weatherResponse = await fetch(baseUrl.replace('{zip}', cityZipCode).concat(key), {mode: 'cors'});
    try {
        const weatherData = await weatherResponse.json();
        console.log(weatherData);
    } catch(error) {
        console.log(error);
    }
}
