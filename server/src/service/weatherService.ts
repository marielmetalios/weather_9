
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
  // appId: string,
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
  // temp: number;
  // wind: string;
  // humidity: number;

  constructor(
    city: string,
    date: string,
    icon: string,
    iconDescription: string,
    temp: string,
    humidity: number,
    windSpeed: number
  ){

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

  // TODO: Create destructureLocationData method
  //  extract only needed data
  //  returns the data for that location
  private destructureLocationData(locationData: Coordinates): Coordinates {
    return {
      name: locationData.name,
      lat: locationData.lat,
      lon: locationData.lon,
      appId: this.apiKey || '',
      local_names: locationData.local_names,
      country: locationData.country,
      state: locationData.state,
    };
  }
  // const newLocationData: Coordinates[] = location.map((location)) => {
  //   const locationObject: Coordinate = {
  //     lat = GeolocationCoordinates.lat;
  //   }
  // }
}

  // TODO: Create buildGeocodeQuery method
  // constructs a URL for fetching city coordines
  // query for geolocation data, based on cityName
  private buildGeocodeQuery(): string {
  return `${this.baseURL}/geo/1.0/direct?q=${this.cityName}&limit=1&appid=${this.apiKey}`
} // now we have URL string for the fetch

  // TODO: Create buildWeatherQuery method
  // build URL to request data for the given lat and lon
  // builds a URL to fetch weather data based on the coordinates!
  private buildWeatherQuery(coordinates: Coordinates): string {
  return `${this.baseURL}/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}`
} //now we have the URL 

  // TODO: Create fetchAndDestructureLocationData method
  // calls fetchLocationData to obtain the city coordinates
  private async fetchAndDestructureLocationData() { }

  // TODO: Create fetchWeatherData method
// request detailed weather information
// passes response in structured format

  private async fetchWeatherData(coordinates: Coordinates) {
  try {
    const WeatherData = await (fetch(this.buildWeatherQuery(coordinates)))
    const fetchedWeatherData = await WeatherData.json();
  } catch (err) {
    console.log('Error fetching data:', err);
  }
}

  // TODO: Build parseCurrentWeather method
  // extracts and formats the current weather details

  private parseCurrentWeather(response: any) {


}

  // TODO: Complete buildForecastArray method
// builds an array of forecast data, temp, data, windspeed

  private buildForecastArray(currentWeather: Weather, weatherData: any[]) { }


  // TODO: Complete getWeatherForCity method
  // gets us array of objects with coordinates (lat / lon)
  // this should update cityName, and calls the fetchlocation method FOR the geo-coded query URL
  async getWeatherForCity(city: string) {
  this.cityName = city
  const WeatherData = await this.fetchLocationData(this.buildGeocodeQuery())
} return res.status(200).json(weatherData);
}

export default new WeatherService();
