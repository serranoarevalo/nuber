import User from "../entities/User";
import Confirmation from "../entities/Confirmation";

interface Context {
  [req: string]: {
    user: User;
  };
}

export type Resolver = (
  parent: any,
  args: any,
  context: Context,
  info: any
) => any;

export interface Resolvers {
  [key: string]: {
    [key: string]: Resolver;
  };
}
