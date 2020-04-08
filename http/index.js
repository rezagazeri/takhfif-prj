/*global config*/
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

module.exports = class Application {
  constructor() {
    this.setServer();
    this.configDatabase();
    this.configApp();
  }

  //setting server
  setServer() {
    app.listen(config.port, () => {
      console.log('server connect successfully!');
    });
  }

  async configDatabase() {
    try {
      await mongoose.connect(config.DB.url, config.DB.options);
      console.log('database conected success...');
    } catch (err) {
      console.log(err.message);
    }
  }

  configApp() {
    app.use(express.static(path.join(__dirname, 'public'))); //for serve file in public folder
    app.use(
      express.json({
        limit: '10kb'
      })
    );
  }
};