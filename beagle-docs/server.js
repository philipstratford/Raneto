#!/usr/bin/env node

'use strict';

// This example mounts 2 raneto instances with different configurations in the same server

// Modules
const debug = require('debug')('raneto');

// Here is where we load Raneto.
// When you are in your own project repository,
// Raneto should be installed via NPM and loaded as:
// var raneto = require('raneto');
//
// For development purposes, we load it this way in this example:
const raneto = require('../app/index.js');

// Load our base configuration file.
const endUserConfig = require('./config.end-user.js');
const technicalConfig = require('./config.technical.js');

const express = require('express');

// Create two subapps with different configurations
const appEndUser = raneto(endUserConfig);
const appTechnical = raneto(technicalConfig);

// Create the main app
const mainApp = express();
mainApp.use('/end-user', appEndUser);
mainApp.use('/technical', appTechnical);

// Load the HTTP Server
const server = mainApp.listen(3000, function () {
  debug('Express HTTP server listening on port ' + server.address().port);
});
