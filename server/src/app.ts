import express from "express";
import logger from "morgan";
import helmet from "helmet";
import Knex from "knex";
import { Model } from "objection";
import knexConfig from "../knexfile";

class App {
  public app: express.Application;

  constructor() {
    this.db();
    this.app = express();
    this.config();
  }
  private middlewares = (): void => {
    this.app.use(logger("dev"));
    this.app.use(helmet());
  };
  private db = (): void => {
    const knex = Knex(knexConfig.development);
    knex.migrate.latest();
    Model.knex(knex);
  };
  private config = (): void => {
    this.middlewares();
  };
}

export default new App().app;
