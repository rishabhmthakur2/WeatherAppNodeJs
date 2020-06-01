const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("../utils/geocode.js");
const forecast = require("../utils/forecast");
const app = express();
const port = process.env.PORT || 3000;

// Paths for configuring Express
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars and views directory
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve webpages
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather Page",
        name: "Rishabh",
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Page",
        name: "Rishabh",
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help Page",
        name: "Rishabh",
        message: "This is the help paragraph. Loren ipsum.",
    });
});

app.get('/weather',(req,res)=>{
    if(!req.query.location){
        return res.send({
            error: "Please input a search address in query!"
        });
    }
    geocode(req.query.location, (error, data) => {
        if (error) {
            return res.send({error});
        }
        forecast(data, (error, response) => {
            if (error) {
                res.send({error});
            } else {
                res.send({
                    location: data.location,
                    forecast: response
                });
            }
        });
    });
});

app.get("/help/*", (req, res) => {
    res.render("error", {
        title: "Error Page",
        error: "Help article not found",
    });
});

app.get("*", (req, res) => {
    res.render("error", {
        title: "Error Page",
        error: "404: Page not found",
    });
});

app.listen(port, () => {
    console.log("Server is listening for calls.");
});
