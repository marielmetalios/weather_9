import fs from 'node:fs/promises';
import { v4 as uuidv4 } from 'uuid';
uuidv4();

// TODO: Define a City class with name and id properties
class City {
  name: string;
  id: string;

  // constructor will initialize when a new instance is made!
  constructor(name: string, id: string) {
    this.name = name;
    this.id = id;
  }
}

// need to getFromHistory and deleteFromHistory

// TODO: Complete the HistoryService class
class HistoryService {
  // addToHistory()
  // getSearchHistory();
  // deleteFromHistory();

  // TODO: Define a read method that reads from the searchHistory.json file
  // need async! and return it in a UTF-8 string.
  private async read(): Promise<string> {
    return await fs.readFile('db/db.json', { encoding: 'utf8' });
  }

  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  // we have an array of city objects. Write them to searchHistory.json
  private async write(cities: City[]): Promise<void> {
    return await fs.writeFile('db/db.json', JSON.stringify(cities, null, '\t'));
  }

  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities(): Promise<City[]> {
    return await this.read().then((data) => {
      let parsedCity: City[] = [];

      try {
        parsedCity = JSON.parse(data);
      } catch (err) {
        parsedCity = [];
      }
      return parsedCity;
    });
  }

  // TODO: Define an addCity method that adds a city to the searchHistory.json file
  async addCity(city: string): Promise<City> {
    if (!city) {
      throw new Error('City is blank'); // Prevent blank input
    }

    let newCity = new City(city, uuidv4()); // Generate a new city with a unique ID

    // now we need to add new city to json
    return await this.getCities()
      .then((cities) => {
        // Check if the city already exists before adding it
        if (cities.find((c) => c.name === city)) {
          return newCity;
        }
        return [...cities, newCity];
      })
      .then((updatedCities) => this.write(updatedCities[])) // add to db.json
      .then(() => newCity); // return the new city!
  }

  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  // async removeCity(id: string) {}
}

export default new HistoryService();
