import User from "../entities/User";
import Confirmation from "../entities/Confirmation";

export type Resolver = (
  parent: any,
  args: any,
  context: {
    req: Express.Request;
  },
  info: any
) => any;

export interface Resolvers {
  [key: string]: {
    [key: string]: Resolver;
  };
}

export interface WrapperResolver extends Resolver {
  wrap: Function;
}
