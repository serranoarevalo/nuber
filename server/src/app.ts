import express from "express";
import logger from "morgan";
import helmet from "helmet";
import Knex from "knex";
import knexConfig from "../knexfile";

class App {
  constructor() {
    const knex = Knex(knexConfig.development);
    knex.migrate.latest();
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
