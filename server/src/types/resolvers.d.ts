import { PubSub } from "graphql-yoga";
import User from "../entities/User";
import Confirmation from "../entities/Confirmation";
import { WSAEDESTADDRREQ } from "constants";

export type Resolver = (parent: any, args: any, context: any, info: any) => any;

export interface Resolvers {
  [key: string]: {
    [key: string]: Resolver;
  };
}
