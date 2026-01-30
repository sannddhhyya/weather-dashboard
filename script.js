const apiKey = "YOUR_API_KEY"; // 🔑 Replace with your OpenWeatherMap API key
const button = document.getElementById("get-weather");
const select = document.getElementById("city-input");
const resultDiv = document.getElementById("weather-result");

button.addEventListener("click", () => {
    const city = select.value;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},ZA&appid=${apiKey}&units=metric`)
        .then(res => res.json())
        .then(data => {
            if (data.cod === "404") {
                resultDiv.innerHTML = `<p>City not found!</p>`;
                return;
            }

            const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

            // Display weather info
            resultDiv.innerHTML = `
                <h2>${data.name}, ${data.sys.country}</h2>
                <img src="${iconUrl}" class="weather-icon" alt="weather icon">
                <p>Temperature: ${data.main.temp} °C</p>
                <p>Weather: ${data.weather[0].description}</p>
                <p>Humidity: ${data.main.humidity}%</p>
            `;

            // Change background based on weather
            const weatherMain = data.weather[0].main.toLowerCase();
            if (weatherMain.includes("cloud")) {
                document.body.style.background = "linear-gradient(to bottom, #bdc3c7, #2c3e50)";
            } else if (weatherMain.includes("rain") || weatherMain.includes("drizzle")) {
                document.body.style.background = "linear-gradient(to bottom, #4e54c8, #8f94fb)";
            } else if (weatherMain.includes("clear")) {
                document.body.style.background = "linear-gradient(to bottom, #fceabb, #f8b500)";
            } else if (weatherMain.includes("snow")) {
                document.body.style.background = "linear-gradient(to bottom, #e6e9f0, #eef1f5)";
            } else if (weatherMain.includes("thunder")) {
                document.body.style.background = "linear-gradient(to bottom, #434343, #000000)";
            } else {
                document.body.style.background = "linear-gradient(to bottom, #87ceeb, #f0f8ff)";
            }
        })
        .catch(err => {
            console.error(err);
            resultDiv.innerHTML = `<p>Error fetching weather data. Check your API key and internet connection.</p>`;
        });
});
