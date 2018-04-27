import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import helmet from "helmet";
import schema from "./schema";
import entities from "./entities";

class App {
  public app: GraphQLServer;

  constructor() {
    this.app = new GraphQLServer({
      schema,
      context: req => {
        return {
          req: req.request,
          entities
        };
      }
    });
    this.middlewares();
  }
  private middlewares = (): void => {
    this.app.express.use(logger("dev"));
    this.app.express.use(helmet());
  };
}

export default new App().app;
