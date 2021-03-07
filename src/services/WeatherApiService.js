import config from '../config';

export default class WeatherApiService {
    static async get(cityName) {
        const current = await WeatherApiService.getCurrent(cityName);
        
        const { lat, lon } = current.coord;
        const daily = await WeatherApiService.getDaily(lat, lon);

        return { current, daily };
    }

    static async getCurrent(cityName) {
        const requestURL = WeatherApiService.buildCurrentURL(cityName);
        return fetch(requestURL).then(res => res.json());
    }

    static async getDaily(lat, lon) {
        const requestURL = WeatherApiService.buildDailyURL(lat, lon);
        const { daily } = await fetch(requestURL).then(res => res.json());

        return daily.map(data => WeatherApiService.#convertDailyData(data));
    }

    static #convertDailyData = (data) => {
        return {
            dt: data.dt,
            clouds: data.clouds,
            feels_like: data.feels_like,
            humidity: data.humidity,
            pressure: data.pressure,
            sunrise: data.sunrise,
            sunset: data.sunset,
            temp: data.temp,
            weather: data.weather,
            wind_deg: data.wind_deg,
            wind_speed: data.wind_speed,
        };
    }

    static buildCurrentURL(cityName) {
        const url = new URL(config.currentWeatherPath, config.WEATHER_API_URL);
    
        url.searchParams.append('q', cityName)
        url.searchParams.append('appid', config.WEATHER_API_KEY);
    
        return url;
    };

    static buildDailyURL(lat, lon) {
        const url = new URL(config.dailyWeatherPath, config.WEATHER_API_URL);
    
        url.searchParams.append('lat', lat);
        url.searchParams.append('lon', lon);
        url.searchParams.append('units', 'metric');
        url.searchParams.append('exclude', 'minutely, hourly, current, alerts');
        url.searchParams.append('appid', config.WEATHER_API_KEY);

        return url;
    };
};
