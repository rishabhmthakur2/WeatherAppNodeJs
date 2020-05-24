const request = require('request');

const forecast = (coordinates, callback) => {
    const weatherURL = `http://api.weatherstack.com/current?access_key=a6ed704eecabd38d1b57b856f4084132&query=${coordinates.latitude},${coordinates.longitude}&units=m`;

    request({url: weatherURL, json: true}, (error, response)=> {
        if(error){
            callback(error);
        }
        else if(response.body.error){
            callback(response.body.error);
        }
        else{
            callback(undefined, `${response.body.current.weather_descriptions[0]}. It is ${response.body.current.temperature} degrees but it feels like ${response.body.current.feelslike} degrees`);
        }
    });
};

module.exports = forecast;