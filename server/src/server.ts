import dotenv from 'dotenv';
import express from 'express';
dotenv.config();

// Import the routes
import routes from './routes/index.js';

const app = express();
const PORT = process.env.PORT || 3001;
console.log(`This is a new server`)

// TODO: Serve static files of entire client dist folder
// MM added below:
app.use(express.static('../client/dist'));

// TODO: Implement middleware for parsing JSON and urlencoded form data
//MM notes:
// MM added below: the `express.json()` middleware attaches incoming json data from requests to the `req.body` property.`express.urlencoded()` middleware works similarly, but for form encoded data.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// TODO: Implement middleware to connect the routes
app.use(routes);

// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
