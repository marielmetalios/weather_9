import { Router, type Request, type Response } from 'express';
// MM - created route handlers above w/ TS included for guardrails
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
// MAR NOTES:
router.post('/city',  (req, res) => {
  // TODO: GET weather data from city name


  // TODO: save city to search history


});

// TODO: GET search history
router.get('/history', async (req, res) => {});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req, res) => {});

export default router;
