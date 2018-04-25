import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import helmet from "helmet";

const typeDefs = `
  type Query {
    hello(name: String): String!
  }
`;

const resolvers = {
  Query: {
    hello: (_: any, { name }: any) => `Hello ${name || "World"}`
  }
};

class App {
  public app: GraphQLServer;

  constructor() {
    this.app = new GraphQLServer({ typeDefs, resolvers });
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
