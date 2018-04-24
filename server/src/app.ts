import express from "express";
import logger from "morgan";
import helmet from "helmet";

class App {
  constructor() {
    this.app = express();
    this.config();
  }
  public app: express.Application;
  public config = (): void => {
    this.app.use(logger("dev"));
    this.app.use(helmet());
  };
}

export default new App().app;
