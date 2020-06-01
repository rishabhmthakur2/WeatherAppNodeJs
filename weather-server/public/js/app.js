console.log("File loaded");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const locationMessage = document.querySelector("#para-location");
const forecastMessage = document.querySelector("#para-forecast");

locationMessage.textContent = "";
forecastMessage.textContent = "";


weatherForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const location = search.value;
    locationMessage.textContent = "Loading Weather Data";
    forecastMessage.textContent = "";
    fetch(`/weather?location=${location}`).then(
        (response) => {
            response.json().then((data) => {
                if (data.error) {
                    locationMessage.textContent = data.error;
                } else {
                    locationMessage.textContent = data.location;
                    forecastMessage.textContent = data.forecast;
                }
            });
        }
    );
});
