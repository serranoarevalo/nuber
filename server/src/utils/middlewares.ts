import { Resolver } from "../types/resolvers";

export const authMiddleware = async (
  resolver: Resolver,
  parent: any,
  args: any,
  context: any,
  info: any
) => {
  if (!context.req.user) {
    throw new Error("No JWT token provided. I refuse to proceed");
  }
  const resolved = await resolver(parent, args, context, info);
  return resolved;
};

export const makeMiddleware = (
  middlewareFunc: any,
  resolverFunc: Resolver
): Resolver => (parent: any, args: any, context: any, info: any) =>
  middlewareFunc(resolverFunc, parent, args, context, info);
