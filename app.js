//const apiKey = 'PtxhxPaBqIRpDWZqFeaCQbGPXU2MGcJf'; //bhaiya
const apiKey = 'NCrsgECLTRk57YQOQs7CZFERGvwa6RFT';  //aman
const apiUrl = 'https://api.tomorrow.io/v4/weather/forecast';
const weatherContainer = document.querySelector('.weather-container');
const cityInput = document.querySelector('#city');
const submitButton = document.querySelector('#submit');
const locationName = document.querySelector('#location-name');
const locationCoordinates = document.querySelector('#location-coordinates');
const currentWeather = document.querySelector('#current-weather');
const temperature = document.querySelector('#temperature');
const condition = document.querySelector('#condition');
const humidity = document.querySelector('#humidity');
const windSpeed = document.querySelector('#wind-speed');
const forecastList = document.querySelector('#forecast-list');
const cardsContainer = document.querySelector(".container");

submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();
    if (city) {
        // Clear previous forecast items
        forecastList.innerHTML = '';

        fetch(`${apiUrl}?location=${city}&apikey=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                console.log('API response:', data); // Log the entire response to inspect its structure

                if (data.timelines && data.timelines.hourly && data.timelines.daily) {
                    const hourlyData = data.timelines.hourly;
                    const dailyData = data.timelines.daily;

                    locationName.textContent = city;
                    locationCoordinates.textContent = `(${data.location.lat}, ${data.location.lon})`;

                    // Display current weather (first hourly data)
                    // const current = hourlyData[0];
                    // temperature.textContent = `Temperature: ${current.values.temperature}°C`;
                    // condition.textContent = `Condition: ${current.values.weatherCode}`;
                    // humidity.textContent = `Humidity: ${current.values.humidity}%`;
                    // windSpeed.textContent = `Wind Speed: ${current.values.windSpeed} Kmph`;
                    //
                    // // Display hourly forecast for the next 24 hours
                    // hourlyData.slice(1, 25).forEach((hour, index) => {
                    //     const forecastItem = document.createElement('li');
                    //     forecastItem.classList.add('forecast-card');
                    //     forecastItem.innerHTML = `
                    //         <span>${index + 1} hour</span>
                    //         <p>Temperature: ${hour.values.temperature}°C</p>
                    //         <p>Condition: ${hour.values.weatherCode}</p>
                    //         <p>Humidity: ${hour.values.humidity}%</p>
                    //         <p>Wind Speed: ${hour.values.windSpeed} Kmph</p>
                    //     `;
                    //     forecastList.appendChild(forecastItem);
                    // });

                    // Display daily forecast for the next 5 days
                    dailyData.slice(0, 5).forEach((day, index) => {
                        const forecastItem = document.createElement('li');
                        forecastItem.classList.add('card');
                        forecastItem.innerHTML = `
                        <div class="card">
                  <img class="background" src="./assets/clouds.jpg" alt="">
          
                  <div class="card-content">
                    <span class="ezbody">${index + 1} day</span>
                        <p class="ezbody">Temperature: ${day.values.temperatureMax}°C / ${day.values.temperatureMin}°C</p>
                        <p class="ezbody">Condition: ${day.values.weatherCodeMax}</p>
                        <p class="ezbody">Humidity: ${day.values.humidityAvg}%</p>
                        <p class="ezbody">Wind Speed: ${day.values.windSpeedMax} Kmph</p>
                  </div>
                  <div class="backdrop"></div>
                </div>
                        `;
                        
                        forecastList.appendChild(forecastItem);
                    });
                } else {
                    console.error('Error: Hourly or daily data is not available in the response.');
                    locationName.textContent = 'No data available';
                    locationCoordinates.textContent = '';
                    temperature.textContent = '';
                    condition.textContent = '';
                    humidity.textContent = '';
                    windSpeed.textContent = '';
                }
            })
            .catch(error => console.error('Fetch error:', error));
    } else {
        console.log('Please enter a city');
        // Clear previous forecast items if no city is entered
        forecastList.innerHTML = '';
        locationName.textContent = '';
        locationCoordinates.textContent = '';
        temperature.textContent = '';
        condition.textContent = '';
        humidity.textContent = '';
        windSpeed.textContent = '';
    }
});