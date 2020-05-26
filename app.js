const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const yargs = require("yargs");

const address = process.argv[2];

if (address) {
    geocode(process.argv[2], (error, data) => {
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
} else {
    console.log("Please provide an address");
}
