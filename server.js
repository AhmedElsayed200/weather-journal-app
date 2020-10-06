// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser');
const cors = require('cors');

// Configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Spin up the server
const port = 8000;
app.listen(port, ()=>{
    console.log(`server is running on port ${port}`);
});

// GET route: returns the projectData
app.get('/all', returning);
function returning(req, res) {
    res.send(projectData);
}

// POST route: save incoming data to projectData
app.post('/dataToPost', posting);
function posting(req, res) {
    projectData.Temperature = req.body.mainTemp;
    projectData.Date = req.body.date;
    projectData.Response = req.body.response;
    projectData.Humidity = req.body.humidity;
    projectData.Pressure = req.body.pressure;
    projectData.WindSpeed = req.body.windSpeed;
    projectData.WindDeg = req.body.windDeg;
    projectData.MaximumTemperature = req.body.maxTemp;
    projectData.MinimumTemperature = req.body.minTemp;
    projectData.WeatherDescription = req.body.weatherDesc;
    projectData.Country = req.body.country;
    projectData.WeatherIcon = req.body.weatherIcon;
    res.send(projectData);
    console.log(`All data saved in our server: `);
    console.log(projectData);
}