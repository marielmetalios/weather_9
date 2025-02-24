
// loading environment variables
import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
// ensure that data location ensures structured fields
// appID = API key...
interface Coordinates {
  // name: string,
  lat: string,
  lon: string,
  // local_names?: string,
  // country?: string,
  // state?: string,
  // units?: string;
  // mode?: string;
  // lang?: string;
}

// geocode:
// name, local_names, lat, lon, country, state


// TODO: Define a class for the Weather object
// likely need instance methods here
// provides blueprint for storing weather information
class Weather {
  city: string;
  date: string;
  icon: string;
  iconDescription: string;
  temp: string;
  humidity: number;
  windSpeed: number;

  constructor(city: string, date: string, icon: string, iconDescription: string, temp: string, humidity: number, windSpeed: number) {
    this.city = city;
    this.date = date;
    this.icon = icon;
    this.iconDescription = iconDescription;
    this.temp = temp;
    this.humidity = humidity;
    this.windSpeed = windSpeed;
  }
}

// TODO: Complete the WeatherService class
// core -- it fetches data from API and processes it.
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  // set from env 
  // cityName holds requested city name
  private baseURL: string;
  private apiKey?: string;
  cityName: string;

  constructor() {
    this.baseURL = process.env.API_BASE_URL || '';
    this.apiKey = process.env.API_KEY || '';
    this.cityName = "";
  }

  // addCity()
  // getWeatherForCity()

  // TODO: Create fetchLocationData method
  // sends request to fetch lat and lon using cityName
  // making API request, parses data and returns first location from the array!
  // pull in the string from geocode function as query
  private async fetchLocationData(query: string) {
    try {
      const response = await fetch(query);
      const LocationResults = await response.json();
      // extract 1st from the array
      return LocationResults[0];
    } catch (error) {
      console.log('Error fetching data', error)
    }
  };


  // const newLocationData: Coordinates[] = location.map((location)) => {
  //   const locationObject: Coordinate = {
  //     lat = GeolocationCoordinates.lat;
  //   }
  // }


  // TODO: Create buildGeocodeQuery method
  // constructs a URL for fetching city coordines
  // query for geolocation data, based on cityName
  private buildGeocodeQuery(): string {
    return `${this.baseURL}/geo/1.0/direct?q=${this.cityName}&limit=1&appid=${this.apiKey}`
  } // now we have URL string for the fetch

  // TODO: Create destructureLocationData method
  //  extract only needed data
  //  returns the data for that location
  private destructureLocationData(locationData: Coordinates): Coordinates {
    return {
      // name: locationData.name,
      lat: locationData.lat,
      lon: locationData.lon,
      // appId: this.apiKey || '',
      // local_names: locationData.local_names,
      // country: locationData.country,
      // state: locationData.state,
    };
  }

  // TODO: Create buildWeatherQuery method
  // build URL to request data for the given lat and lon
  // builds a URL to fetch weather data based on the coordinates!
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}`
  } //now we have the URL 

  // TODO: Create fetchAndDestructureLocationData method
  // calls fetchLocationData to obtain the city coordinates
  private async fetchAndDestructureLocationData() {
    try {
      const locationData = await this.fetchLocationData(this.buildGeocodeQuery())
      if (locationData) {
        return this.destructureLocationData(locationData)
      }
      else {
        return;
      };
    } catch (error) {
      console.error("Error fetching and destructuring location data:", error);
      return null;
    }
  };


  // TODO: Create fetchWeatherData method
  // request detailed weather information
  // passes response in structured format

  private async fetchWeatherData(coordinates: Coordinates | null): Promise<any> {
    if (!coordinates) return null;
  
    try {
      const response = await fetch(this.buildWeatherQuery(coordinates));
      if (!response.ok) {
        throw new Error(`Failed to fetch weather data: ${response.statusText}`);
      }
      return await response.json();
    } catch (err) {
      console.log('Error fetching data:', err);
      return null;
    }
  }


  // TODO: Build parseCurrentWeather method
  // extracts and formats the current weather details

  private parseCurrentWeather(response: any) {
    const weatherData = response.list?.[0]; // Get the first forecast entry
  
    if (!weatherData || !weatherData.dt || isNaN(weatherData.dt)) {
      throw new Error(`Invalid timestamp received: ${weatherData?.dt}`);
    }
  
    return new Weather(
      response.city?.name || "Unknown", // City name is likely under response.city
      new Date(weatherData.dt * 1000).toISOString(),
      weatherData.weather?.[0]?.icon || '',
      weatherData.weather?.[0]?.description || 'No description',
      `${weatherData.main?.temp ?? 'N/A'}°C`,
      weatherData.main?.humidity ?? 0,
      weatherData.wind?.speed ?? 0
    );
  }

  // TODO: Complete buildForecastArray method
  // builds an array of forecast data, temp, data, windspeed

  private async buildForecastArray(currentWeather: Weather, coordinates: Coordinates): Promise<Weather[]> {
    try {
      const response = await fetch(`${this.baseURL}/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
  
      const filteredData = [];
  
      for (let i = 0; i < data.list.length; i += 8) { // Every 8th entry represents a forecast for a day
        const forecastWeather = new Weather(
          this.cityName,  // Use the city name from the class
          new Date(data.list[i].dt * 1000).toLocaleDateString(),
          data.list[i].weather[0].icon,
          data.list[i].weather[0].description,
          `${data.list[i].main.temp}°C`,
          data.list[i].main.humidity,
          data.list[i].wind.speed
        );
  
        filteredData.push(forecastWeather);
      }
  
      return [currentWeather, ...filteredData];  // Include the current weather along with the forecast
    } catch (err) {
      console.error("Error fetching weather data:", err);
      return [];
    }
  }

  // TODO: Complete getWeatherForCity method
  // gets us array of objects with coordinates (lat / lon)
  // this should update cityName, and calls the fetchlocation method FOR the geo-coded query URL
  async getWeatherForCity(city: string) {
    this.cityName = city;
    const locationInfo = await this.fetchAndDestructureLocationData();
  
    if (!locationInfo) {
      console.log(`Issue fetching location info for ${city}`);
      return null;
    }
  
    const weatherData = await this.fetchWeatherData(locationInfo);
    if (!weatherData) {
      return null;
    }
  
    const currentWeather = this.parseCurrentWeather(weatherData);
    const forecastArray = await this.buildForecastArray(currentWeather, locationInfo);
  
    return { currentWeather, forecastArray };
  }
};

export default new WeatherService();
