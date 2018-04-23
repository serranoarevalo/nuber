import express from "express";

class App {
  constructor() {
    this.app = express();
  }
  public app: express.Application;
}

export default new App().app;
