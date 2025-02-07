import { Router, type Request, type Response } from 'express';
// MM - created route handlers above w/ TS included for guardrails
const router = Router();

import WeatherService from '../../service/weatherService.js';
import historyService from '../../service/historyService.js';

// TODO: POST Request with city name to retrieve weather data
// MAR NOTES:
router.post('/:city',  (_req, res) => {
  // TODO: GET weather data from city name
  try {
    const cityName = _req.params.city; 
    const cityCode = await weatherService.convertCityNameToCode(cityName);
    
    await WeatherService.addCity(cityCode);
    res.json(cityName)

  } catch (error) {
  console.log(error);
  res.status(500).json(error);
  }
  // TODO: save city to search history



// TODO: GET search history
router.get('/history', async (req, res) => {
  try {
    const searchHistory = await historyService.searchHistory
    res.json(200)

  } catch (error)
  console.log(error)
  res(500).json(error);

});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req, res) => {
  
});

export default router;
