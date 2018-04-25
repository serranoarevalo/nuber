import express from "express";
import logger from "morgan";
import helmet from "helmet";
import bodyParser from "body-parser";
import { graphqlExpress, graphiqlExpress } from "apollo-server-express";

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }
  private middlewares = (): void => {
    this.app.use(logger("dev"));
    this.app.use(helmet());
  };
  private config = (): void => {
    this.middlewares();
  };
  private routes = (): void => {
    this.app.use("/graphql", bodyParser.json(), graphqlExpress({ schema: "" }));
    this.app.get("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));
  };
}

export default new App().app;
