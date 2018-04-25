import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import helmet from "helmet";
import schema from "./schema";

const resolvers = {
  Query: {
    users: (_: any, { name }: any) => `Hello ${name || "World"}`
  }
};

class App {
  public app: GraphQLServer;

  constructor() {
    this.app = new GraphQLServer({ schema });
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
