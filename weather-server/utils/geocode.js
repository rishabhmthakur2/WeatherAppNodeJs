const request = require('request');

const geocode = (address, callback) => {
    const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoicmlzaGFiaG10aGFrdXIiLCJhIjoiY2tha3h6OXcxMDZleTJ6bXYzdXJyeXc3aCJ9.OprminIPNM9nXKMDSyiJOQ&`;

    request({url: geocodeURL, json: true},(error, response)=>{
        if(error){
            callback(error);
        }
        else if(response.body.features.length === 0){
            callback("Location not found. Please try again.");
        }
        else{
            const data = {
                "latitude": response.body.features[0].center[1],
                "longitude": response.body.features[0].center[0],
                "location": response.body.features[0].place_name
            };
            callback(undefined, data);
        }
    });
};

module.exports = geocode;