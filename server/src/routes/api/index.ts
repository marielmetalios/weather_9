import { Router } from 'express';
const router = Router();
// mar added:
// run this in CLI -- npm install dotenv --save
// need to uncomment the below?
// require('dotenv').config()
// console.log(`Hello ${process.env.HELLO}`);

import weatherRoutes from './weatherRoutes.js';

router.use('/weather', weatherRoutes);

export default router;
