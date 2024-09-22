document.getElementById('cityInput').addEventListener('input', function() {
    // Mock weather data for demonstration
    const weatherData = {
        temp_c: 28,
        humidity: 70,
        wind_kph: 15,
        wind_dir: 'NW'
    };
    displayWeather(weatherData);
});

document.getElementById('cropSelect').addEventListener('change', function() {
    const selectedCrop = this.value;
    const weatherInfo = JSON.parse(localStorage.getItem('weatherInfo'));
    const recommendation = getRecommendation(weatherInfo, selectedCrop);
    document.getElementById('recommendation').innerText = recommendation;
});

function displayWeather(weather) {
    localStorage.setItem('weatherInfo', JSON.stringify(weather)); // Store weather info
    document.getElementById('weatherInfo').innerHTML = `
        Temperature: ${weather.temp_c}°C<br>
        Humidity: ${weather.humidity}%<br>
        Wind Speed: ${weather.wind_kph} km/h<br>
        Wind Direction: ${weather.wind_dir}
    `;
}

function getRecommendation(weather, selectedCrop) {
    if (!weather || !selectedCrop) return 'Please select a crop.';
    
    let advice = '';
    const { temp_c, humidity, wind_kph, wind_dir } = weather;

    if (temp_c > 30) {
        advice += "High temperature detected. Ensure adequate irrigation. ";
    } else if (temp_c < 15) {
        advice += "Low temperature detected. Protect crops from frost if applicable. ";
    }

    if (humidity > 80) {
        advice += "High humidity may increase disease risk. Monitor crops closely. ";
    } else if (humidity < 30) {
        advice += "Low humidity detected. Increase irrigation if needed. ";
    }

    if (wind_kph > 20) {
        advice += `Strong winds from ${wind_dir}. Protect crops from wind damage. `;
    }

    switch (selectedCrop) {
        case 'Rice':
            advice += "Maintain standing water in paddy fields.";
            break;
        case 'Wheat':
            advice += "Ensure proper drainage to prevent waterlogging.";
            break;
        case 'Cotton':
            advice += "Monitor for pests, especially in humid conditions.";
            break;
    }

    return advice;
}
