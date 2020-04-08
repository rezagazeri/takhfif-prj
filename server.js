require('app-module-path').addPath(__dirname);
const dotenv = require('dotenv');

dotenv.config({
    path: './config.env',
});

global.config = require('./config');
const App = require('./http');

new App();