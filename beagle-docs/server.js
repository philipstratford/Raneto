#!/usr/bin/env node

'use strict';

// This example mounts 2 raneto instances with different configurations in the same server

// Modules
const debug = require('debug')('raneto');
var path = require('path');

// Here is where we load Raneto.
// When you are in your own project repository,
// Raneto should be installed via NPM and loaded as:
// var raneto = require('raneto');
//
// For development purposes, we load it this way in this example:
const raneto = require('../app/index.js');

// Load our base configuration file.
const config = require('./config.default.js');

const express = require('express');

// Create two subapps with different configurations
const appEndUser = raneto(Object.assign({}, config, {base_url: '/end-user', content_dir: path.join(__dirname, 'end-user-docs')}));
const appTechnical = raneto(Object.assign({}, config, {base_url: '/technical', content_dir: path.join(__dirname, 'technical-docs'), site_title: 'Beagle Technical Documentation'}));

// Create the main app
const mainApp = express();
mainApp.use('/end-user', appEndUser);
mainApp.use('/technical', appTechnical);

// Load the HTTP Server
const server = mainApp.listen(3000, function () {
  debug('Express HTTP server listening on port ' + server.address().port);
});

// Now navigate to http://localhost:3000/en and http://localhost:3000/es
