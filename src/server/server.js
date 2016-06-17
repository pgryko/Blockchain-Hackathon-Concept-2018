import axios from 'axios';

import express from 'express';
import { ENV } from './config/appConfig';
import { connect } from './db';
import passportConfig from './config/passport';
import expressConfig from './controllers/express';
import routesConfig from './controllers/routes';
import dotenv from 'dotenv';
import HTTP from 'http';
import socketio from './controllers/meetingEngine';

// Load environment variables from .env file
// dotenv.load();

const App = require('../client/server');
const app = express();
var server = HTTP.Server(app);


/*
Server with api endpoints
*/

/*
 * Database-specific setup
 * - connect to MongoDB using mongoose
 * - register mongoose Schema
 */
connect();

/*
 * REMOVE if you do not need passport configuration
 */
passportConfig();


/*
 * Bootstrap application settings
 */
expressConfig(app);

/*
 * REMOVE if you do not need any routes
 *
 * Note: Some of these routes have passport and database model dependencies
 */
routesConfig(app);

//Routes for Socketio

socketio(app,server);


/*
 * This is where the magic happens. We take the locals data we have already
 * fetched and seed our stores with data.
 * App is a function that requires store data and url
 * to initialize and return the React-rendered html string
 */
app.get('*', App.default);


server.listen(app.get('port'), function(err) {
  if (err) {
    console.log(err);
    return;
  }
});


