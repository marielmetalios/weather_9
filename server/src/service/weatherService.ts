
// loading environment variables
import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
// appID = API key...
interface Coordinates {
  name: string,
  lat: string,
  lon: string,
  appId: string,
  local_names?: string,
  country?: string,
  state?: string,
  units?: string;
  mode?: string;
  lang?: string;
}

// geocode:
// name, local_names, lat, lon, country, state


// TODO: Define a class for the Weather object
// likely need instance methods here?
class Weather {
  temp: number;
  wind: string;
  humidity: number;
  //OR from site?
  id: number,
  main: string,
  description: string,
  icon: string
}

// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  private baseURL?: string;
  private apiKey?: string;
  cityName: string;

  constructor() {
    this.baseURL = process.env.API_BASE_URL || '';
    this.apiKey = process.env.API_KEY || '';
    this.cityName = "";
  }

  // TODO: Create fetchLocationData method
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
  // constructs a query for geolocation data, based on cityName
  private buildGeocodeQuery(): string {
    return `${this.baseURL}/geo/1.0/direct?q=${this.cityName}&limit=1&appid=${this.apiKey}`
  } // now we have URL string for the fetch

  // TODO: Create buildWeatherQuery method
  // builds a URL to fetch weather data based on the coordinates!
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}`
  } //now we have the URL 

  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData() {}
  // TODO: Create fetchWeatherData method
// not finished here!
  private async fetchWeatherData(coordinates: Coordinates) {
    try { 
      const WeatherData = await (fetch(this.buildWeatherQuery(coordinates)))
      const fetchedWeatherData = await WeatherData.json();
    } catch(err){
      console.log('Error fetching data:', err);
    }
  }
  
  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any) {
    

  }

  // TODO: Complete buildForecastArray method
  private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}
  // TODO: Complete getWeatherForCity method
  // gets us array of objects with coordinates (lat / lon)
  // this should update cityName, and calls the fetchlocation method FOR the geo-coded query URL
  async getWeatherForCity(city: string) {
    this.cityName = city
    const WeatherData = await this.fetchLocationData(this.buildGeocodeQuery())
  } return res.status(200).json(weatherData);
}

export default new WeatherService();
