import { Router } from 'express';
const router = Router();
require('dotenv').config()
console.log(`Hello ${process.env.HELLO}`);

import weatherRoutes from './weatherRoutes.js';

// prefix for /api -- so this /api/weather
router.use('/weather', weatherRoutes);

export default router;
