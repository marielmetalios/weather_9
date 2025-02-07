import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: string,
  lon: string,
  appId: string,
  units?: string;
  mode?: string;
  lang?: string;
}

// mar do we need geocoding?
interface Geocode {
  q: string,
  appid: string,
  limit?: string
}

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
  private apiKey?: string,
  cityName: string;

  constructor() {
    this.baseURL = process.env.API_BASE_URL || '';
    this.apiKey = process.env.API_KEY || '';
  }

  // TODO: Create fetchLocationData method
  // private async fetchLocationData(query: string) {}
 private async fetchLocationData(cityName: string) {
  try {
    const response = await fetch(
      `${this.baseURL}/${cityName}&api_key=${this.apiKey}`
    );
    const locationResults = await response.json();
    const locationData = await this.(locationResults.data);
    return locationData;
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
  // private buildGeocodeQuery(): string {}
  // TODO: Create buildWeatherQuery method
  // private buildWeatherQuery(coordinates: Coordinates): string {}
  // TODO: Create fetchAndDestructureLocationData method
  // private async fetchAndDestructureLocationData() {}
  // TODO: Create fetchWeatherData method
  // private async fetchWeatherData(coordinates: Coordinates) {}
  // TODO: Build parseCurrentWeather method
  // private parseCurrentWeather(response: any) {}
  // TODO: Complete buildForecastArray method
  // private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}
  // TODO: Complete getWeatherForCity method
  // async getWeatherForCity(city: string) {}
}

export default new WeatherService();
