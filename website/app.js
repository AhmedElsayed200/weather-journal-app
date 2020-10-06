/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const key = '4b78500bdc454a8b6bfe246f6350ada7';

// handler function: return width of user's screen 
function width768() {
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    return vw;
}

// Make a GET request to the OpenWeatherMap API
const getWeather = async (baseURL, zipCode, key)=>{
    const res = await fetch(baseURL+zipCode+'&appid='+key+'&units=imperial');
    try {
        const weatherData = await res.json();
        //console.log('getWeather: ', weatherData);
        return weatherData;
    } catch(error) {
        console.log(`ERORR from getWeather function: ${error}`);
    }
}

// Make a POST request to add the API data and user response
const postData = async (url, data)=>{
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    try {
        const postedData = await res.json();
        //console.log('postData: ', postedData);
        return postedData;
    } catch(error) {
        console.log(`ERORR from postData function: ${error}`);
    }
}

// Update UI dynamically
const updateUI = async (url)=>{
    const res = await fetch(url)
    try {
        const finalData = await res.json();
        //console.log(finalData)
        document.getElementById('temp').innerHTML = finalData.Temperature+"&#176";
        document.getElementById('date').innerHTML = finalData.Date;
        document.getElementById('content').innerHTML = finalData.Response;
        document.getElementById('humadity').innerHTML = finalData.Humidity+"<br>"+`<span style="opacity: 0.5">Humadity</span>`;
        document.getElementById('pressure').innerHTML = finalData.Pressure+"<br>"+`<span style="opacity: 0.5">Pressure</span>`;
        document.getElementById('windSpeed').innerHTML = finalData.WindSpeed+"mph"+"<br>"+`<span style="opacity: 0.5">Wind</span>`;
        document.getElementById('windDeg').innerHTML = finalData.WindDeg+"&#176"+"<br>"+`<span style="opacity: 0.5">Wind deg.</span>`;
        document.getElementById('tempMax').innerHTML = finalData.MaximumTemperature+"&#176"+"<br>"+`<span style="opacity: 0.5">High</span>`;
        document.getElementById('tempMin').innerHTML = finalData.MinimumTemperature+"&#176"+"<br>"+`<span style="opacity: 0.5">Low</span>`;
        document.getElementById('weatherDesc').innerHTML = `<span style="opacity: 0.5">${finalData.WeatherDescription}</span>`;
        document.getElementById('country').innerHTML = finalData.Country;
        document.getElementById('weatherImage').src = `http://openweathermap.org/img/wn/${finalData.WeatherIcon}@4x.png`;
    } catch(error) {
        console.log(`ERORR from updateUI function: ${error}`);
    }
}

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// callback function attached to 'generate' button
function generateWeather() {
    if (width768() < 768){
        document.getElementById('secE').style.display = 'none';
    }
    if (width768() > 768 && width768() < 955){
        document.getElementById('weatherImage').style.display = 'none';
    } else {
        document.getElementById('weatherImage').style.display = 'inline-block';
    }
    const zipCode = document.getElementById('zip').value;
    const userResponse = document.getElementById('feelings').value;
    getWeather(baseURL, zipCode, key)
    .then((weatherData)=>{  
        postData('/dataToPost', {
            mainTemp: weatherData.main.temp, 
            date: newDate, 
            response: userResponse, 
            humidity: weatherData.main.humidity,
            pressure: weatherData.main.pressure,
            windSpeed: weatherData.wind.speed,
            windDeg: weatherData.wind.deg,
            maxTemp: weatherData.main.temp_max,
            minTemp: weatherData.main.temp_min,
            weatherDesc: weatherData.weather[0].description,
            country: weatherData.sys.country,
            weatherIcon: weatherData.weather[0].icon,
        })
        updateUI('/all')
    });
    document.getElementsByClassName('line')[0].style.display = 'block';
    document.getElementsByClassName('line')[1].style.display = 'block';
}

// Event listener attached to 'Generate' button 
document.getElementById('generate').addEventListener('click', generateWeather);

// Event listener attached to 'Add' button 
document.getElementById('addInfo').addEventListener('click', ()=>{
    document.getElementById('secE').style.display = 'block';
});