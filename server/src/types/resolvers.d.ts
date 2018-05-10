import User from "../entities/User";
import Confirmation from "../entities/Confirmation";

export type Resolver = (
  parent: any,
  args: any,
  context: {
    entities: {
      User: any; //User;
      Confirmation: any; //Confirmation;
    };
    req: Express.Request;
  },
  info: any
) => any;

export interface Resolvers {
  [key: string]: {
    [key: string]: Resolver;
  };
}
