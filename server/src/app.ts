import { GraphQLServer } from "graphql-yoga";
import { NextFunction, Request, Response } from "express";
import logger from "morgan";
import helmet from "helmet";
import jwt from "jsonwebtoken";
import schema from "./schema";
import entities from "./entities";
import { JWT_SECRET } from "./keys";

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
    this.app.express.use(this.appendUserToReq);
    this.app.express.use(logger("dev"));
    this.app.express.use(helmet());
  };

  private appendUserToReq = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const token = req.get("X-JWT");
    if (token) {
      try {
        const decoded = await jwt.verify(token, JWT_SECRET);
        req.user = decoded["user"];
      } catch (err) {
        console.log(err);
      }
    }
    next();
  };
}

export default new App().app;
