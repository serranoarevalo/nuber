import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import helmet from "helmet";
import schema from "./schema";
import entities from "./entities";

class App {
  public app: GraphQLServer;

  constructor() {
    this.app = new GraphQLServer({ schema, context: { entities } });
    this.config();
  }
  private middlewares = (): void => {
    this.app.express.use(logger("dev"));
    this.app.express.use(helmet());
  };
  private config = (): void => {
    this.middlewares();
  };
}

export default new App().app;
