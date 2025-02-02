import { Router } from 'express';
const router = Router();
// mar added:
// already npm installed dotenv 
require('dotenv').config()
console.log(`Hello ${process.env.HELLO}`);

import weatherRoutes from './weatherRoutes.js';

router.use('/weather', weatherRoutes);

export default router;
