const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

geocode("Bengaluru", (error, data) => {
    if (error) {
        return console.log(error);
    }
    forecast(data, (error, response) => {
        if (error) {
            console.log(error);
        } else {
            console.log(data.location);
            console.log(response);
        }
    });
});
