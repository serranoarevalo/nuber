import path from "path";
import { fileLoader, mergeTypes, mergeResolvers } from "merge-graphql-schemas";
import { makeExecutableSchema } from "graphql-tools";
import { CANCELLED } from "dns";

const allTypes: String[] = fileLoader(path.join(__dirname, "./types"));
const allResolvers: String[] = fileLoader(path.join(__dirname, "./resolvers"));
const mergedTypes = mergeTypes(allTypes);
const mergedResolvers = mergeResolvers(allResolvers);

const schema = makeExecutableSchema({
  typeDefs: mergedTypes,
  resolvers: mergedResolvers
});

export default schema;
