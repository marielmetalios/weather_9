import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
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
  }

  // TODO: Create fetchLocationData method
  // pull in the string from geocode function as query
 private async fetchLocationData(query: string) {
  try {
    const response = await fetch(query);
    const LocationResults = await response.json();
    // const locationData = await this.(locationResults.data);
    // extract 1st from the array
    return LocationResults[0];
  } catch (error) {
  console.log('Error:', error)
  }
 };
  
 // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: Coordinates): Coordinates {
    const newLocationData: Coordinates[] = location.map((location)) => {
      const locationObject: Coordinate = {
        lat = GeolocationCoordinates.lat;
        
      }
    }
  }

  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(): string {
    return `${this.baseURL}/geo/1.0/direct?q=${this.cityName}&limit=1&appid=${this.apiKey}`
  } // now we have URL string for the fetch

  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}/data/2.5/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}`
  } //now we have the URL 

  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData() {}
  // TODO: Create fetchWeatherData method

  private async fetchWeatherData(coordinates: Coordinates) {
    try { 
      const WeatherData = await (fetch(this.buildWeatherQuery(coordinates)))
      const fetchedWeatherData = await WeatherData.json();
    } catch(err){

    }
  }
  
  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any) {

  }

  // TODO: Complete buildForecastArray method
  private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}
  // TODO: Complete getWeatherForCity method
  // call function, put in string from geocode function.
  // gets us array of objects with coordinates (lat / lon)
  async getWeatherForCity(city: string) {
    this.cityName = city
    const WeatherData = await this.fetchLocationData(this.buildGeocodeQuery())
  }
}

export default new WeatherService();
