import cors from "cors";
import { NextFunction, Response } from "express";
import { GraphQLServer, PubSub } from "graphql-yoga";
import helmet from "helmet";
import logger from "morgan";
import schema from "./schema";
import getUserFromToken from "./utils/getUserFromToken";

class App {
  public app: GraphQLServer;
  public pubSub: any;
  constructor() {
    this.pubSub = new PubSub();
    this.pubSub.ee.setMaxListeners(99);
    this.app = new GraphQLServer({
      schema,
      context: req => {
        return {
          rawReq: req,
          req: req.request,
          pubsub: this.pubSub
        };
      }
    });
    this.middlewares();
  }
  private middlewares = (): void => {
    this.app.express.use(cors());
    this.app.express.use(this.appendUserToReq);
    this.app.express.use(logger("dev"));
    this.app.express.use(helmet());
  };

  private appendUserToReq = async (
    req: any,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const token = req.get("X-JWT");
    if (token) {
      const user = await getUserFromToken(token);
      if (user) {
        req.user = user;
      }
    }
    next();
  };
}

export default new App().app;
