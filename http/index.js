const express = require('express');

const app = express();

module.exports = class Application {
  constructor() {
    this.setServer();
    this.configDatabase();
    this.configApp();
  }
};
