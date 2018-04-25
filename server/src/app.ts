import express from "express";
import logger from "morgan";
import helmet from "helmet";

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
  }
  private middlewares = (): void => {
    this.app.use(logger("dev"));
    this.app.use(helmet());
  };
  private config = (): void => {
    this.middlewares();
  };
}

export default new App().app;
