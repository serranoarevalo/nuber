import { ResolverFn } from "graphql-tools/dist/stitching/makeRemoteExecutableSchema";
import { IResolverObject } from "graphql-yoga/dist/src/types";
import { Resolver, WrapperResolver } from "../types/resolvers";

const createWrapper = wrapperResolver => {
  wrapperResolver.wrap = (resolverToWrap): WrapperResolver => {
    const wrappedResolver = async (parent, args, context, info) => {
      await wrapperResolver(parent, args, context, info);
      return resolverToWrap(parent, args, context, info);
    };
    return createWrapper(wrappedResolver);
  };
  return wrapperResolver;
};

export const authenticatedResolver = createWrapper((parent, args, { req }) => {
  if (!req.user) {
    throw new Error("No JWT token provided. I refuse to proceed");
  }
});
