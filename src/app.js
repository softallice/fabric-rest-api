const path = require('path');
const favicon = require('serve-favicon');
const compress = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('./logger');

const dotenv= require('dotenv');
dotenv.config();

const feathers = require('@feathersjs/feathers');
const configuration = require('@feathersjs/configuration');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');


const middleware = require('./middleware');
const services = require('./services');
const appHooks = require('./app.hooks');
const channels = require('./channels');

const authentication = require('./authentication');

const mongoose = require('./mongoose');

const hfConnect = require('./hfConnect');

const app = express(feathers());

const swagger = require('feathers-swagger');
const sequelizeToJsonSchemas = require('./sequelize-to-json-schemas');

// Load app configuration
app.configure(configuration());

// Set up for feathers-swagger
// https://github.com/feathersjs-ecosystem/feathers-swagger#example-with-ui
app.configure(swagger({
  openApiVersion: 3,
  docsPath: '/docs',
  uiIndex: path.join(__dirname, '../public/docs/swagger-ui.html'),
  specs: {
    info: {
      title: 'fabric-rest-api service - API docs',
      description: 'An API test built with Node.js, FeathersJS and more,' +
                   ' for The s991045@gmail.com.',
      version: '1.0.0'
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer'
        }
      }
    },
    security: [{
      BearerAuth: []
    }]
  }
}));


// Enable security, CORS, compression, favicon and body parsing
const whitelist = [app.get('client_url')] || [process.env.client_url] ;
console.log('whitelist : ', whitelist);
const corsOptions = {
  origin: (origin, callback) => {
    // if (whitelist.indexOf(origin) !== -1) { 
    if (!origin || whitelist.indexOf(origin) !== -1) { //test
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS: ' + origin));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(helmet({
  contentSecurityPolicy: false
}));
app.options('*', cors(corsOptions));
app.use(cors(corsOptions));
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));
// Host the public folder
app.use('/', express.static(app.get('public')));

// Expose the `node_modules` to the public directory
app.use(
  '/third-party-code',
  express.static(path.join(__dirname, '/../node_modules'))
);

// Set up Plugins and providers
app.configure(express.rest());
app.configure(socketio());

app.configure(mongoose);

app.configure(sequelizeToJsonSchemas);

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
app.configure(authentication);
// Set up our services (see `services/index.js`)
app.configure(services);
// Set up event channels (see channels.js)
app.configure(channels);

// Set up hyperledger network connect (see hfConnect.js)
app.configure(hfConnect);



// Configure a middleware for 404s and the error handler
app.use(express.notFound());
app.use(express.errorHandler({ logger }));

app.hooks(appHooks);

module.exports = app;
