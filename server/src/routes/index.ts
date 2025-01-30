import { Router } from 'express';
const router = Router();
// MM - creating a new instance of an express router, so we can define routes

import apiRoutes from './api/index.js';
// MM - we are importing routes from api/index which will have our endpoints specified to fetch / get our weather data.
import htmlRoutes from './htmlRoutes.js';
// MM - we are importing our htmlRoutes which will have the route to serve our index.html file

router.use('/api', apiRoutes);
// MM - middleware -- any routes starting with /api will be handled by API routes
router.use('/', htmlRoutes);
// MM - middleware, any routes following / will be handled by html Routes

export default router;
// MM - exports for later use
