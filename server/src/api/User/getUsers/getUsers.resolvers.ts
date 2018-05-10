import { authenticatedResolver } from "../../../utils/wrappedResolvers";
import { Resolvers } from "../../../types/resolvers";
import User from "../../../entities/User";

const resolvers: Resolvers = {
  Query: {
    getUsers: authenticatedResolver.wrap(
      async (parent, args, { entities: { User } }) => {
        const users: User[] = await User.find();
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
