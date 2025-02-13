import { Router, type Request, type Response } from 'express';
// MM - created route handlers above w/ TS included for guardrails
const router = Router();

import WeatherService from '../../service/weatherService.js';
import historyService from '../../service/historyService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/',  (req: Request, res: Response) => {
  // TODO: GET weather data from city name
  try {
    const cityName = req.body.cityName; 
    const cityCode = WeatherService.getWeatherForCity(cityName);
    WeatherService.addCity(cityCode);
    historyService.addToHistory(cityName);
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
router.get('/history', async (req: Request, res: Response) => {
  try {
    const searchHistory = await historyService.getSearchHistory()
    res.status(200).json(searchHistory);
  } catch (error) {
  console.error(error);
  return res.status(500).json(error);
}
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await historyService.deleteFromHistory(id);
    res.status(200).json( { message: `Entry ${id} removed`});
  } catch(error) {
    console.error(error)
    return res.status(500).json(error)
  }
});

export default router;
