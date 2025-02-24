import { Router, type Request, type Response } from 'express';
// MM - created route handlers above w/ TS included for guardrails
const router = Router();

import WeatherService from '../../service/weatherService.js';
import historyService from '../../service/historyService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => {
  try {
    const cityName: string = req.body.cityName;

    if (!cityName) {
      return res.status(400).json({ error: 'City name is required' });
    }

    const weather = await WeatherService.getWeatherForCity(cityName);
    if (!weather) {
      return res.status(404).json({ error: 'Weather data not found' });
    }

    // TODO: save city to search history
    await historyService.addCity(cityName);
    console.log(`${cityName} weather retrieved and saved to history.`);
    
    return res.json(weather); 
  } catch (error) {
    console.error('Error fetching weather:', error);
    return res.status(500).json({ error: 'Internal server error' }); 
  }
});

// TODO: GET search history
router.get('/history', async (_req: Request, res: Response) => {
  try {
    const searchHistory = await historyService.getCities();
    console.log('City history data:', searchHistory)
    return res.status(200).json(searchHistory); 
  } catch (error) {
    console.error('Error retrieving search history:', error);
    return res.status(500).json({ error: 'Failed to retrieve search history' });
  }
});



// * BONUS TODO: DELETE city from search history
// router.delete('/history/:id', async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
// MAR -- YOU NEED TO ADD REMOVE CITY TO HISTORY SERVICE...
//     await historyService.removeCity(id);
//     res.status(200).json({ message: `Entry ${id} removed` });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to delete history entry' });
//   }
// });
export default router;
