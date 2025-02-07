import { Router } from 'express';
const router = Router();
require('dotenv').config()
console.log(`Hello ${process.env.HELLO}`);

import weatherRoutes from './weatherRoutes.js';

router.use('/weather', weatherRoutes);

export default router;
