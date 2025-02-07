import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Router } from 'express';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = Router();

// TODO: Define route to serve index.html
// mm edits below: get  linking with / 
// dirname tells us where the file is located
// then we actually send the HTML file to the client so the front end can load and user can see page
router.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '../../../client/dist/index.html'));
});


export default router;
