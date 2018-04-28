import { ResolverFn } from "graphql-tools/dist/stitching/makeRemoteExecutableSchema";

const createWrapper = wrapperResolver => {
  wrapperResolver.wrap = resolverToWrap => {
    const wrappedResolver = async (parent, args, context, info) => {
      await wrapperResolver(parent, args, context, info);
      return resolverToWrap(parent, args, context, info);
    };
    return createWrapper(wrappedResolver);
  };
  return wrapperResolver;
};

export const authorizedResolver = createWrapper((parent, args, { req }) => {
  if (!req.user) {
    throw new Error("No JWT token provided. I refuse to proceed");
  }
});
