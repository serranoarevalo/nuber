import { authenticatedResolver } from "../../../utils/wrappedResolvers";
import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers = {
  Query: {
    getUsers: authenticatedResolver.wrap(
      async (parent, args, { entities: { User } }) => {
        const users = await User.find();
        if (users) {
          return {
            ok: true,
            users
          };
        } else {
          return {
            ok: false,
            error: "Could not find all the users"
          };
        }
      }
    )
  }
};

export default resolvers;
