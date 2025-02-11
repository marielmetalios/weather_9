import { Router, type Request, type Response } from 'express';
// MM - created route handlers above w/ TS included for guardrails
const router = Router();

import WeatherService from '../../service/weatherService.js';
import historyService from '../../service/historyService.js';

// TODO: POST Request with city name to retrieve weather data
// MAR NOTES:
router.post('/', async (_req, res) => {
  // TODO: GET weather data from city name
  try {
    const cityName = _req.body.cityName; 
    const cityCode = await WeatherService.getWeatherForCity(cityName);
    
    await WeatherService.addCity(cityCode);
    await historyService.addToHistory(cityName);
    res.json(cityName)
    console.log(`${cityName} Saved.`)

  } catch (error) {
  console.log(error);
  res.status(500).json(error);
  }
}
);
  // TODO: save city to search history



// TODO: GET search history
router.get('/history', async (req, res) => {
  try {
    const searchHistory = await historyService.getSearchHistory()
    res.json(200).json(searchHistory);
  } catch (error)
  console.error(error);
  res.status(500).json(error);

});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await historyService.deleteFromHistory(id);

    res.status(200).json( { message: `Entry ${id} removed`});
  }
  
});

export default router;
