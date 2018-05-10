import { authenticatedResolver } from "../../../utils/wrappedResolvers";
import { Resolvers } from "../../../types/resolvers";
import User from "../../../entities/User";
import { makeMiddleware, authMiddleware } from "../../../utils/middlewares";

const resolvers: Resolvers = {
  Query: {
    getUsers: makeMiddleware(authMiddleware, async (_, __, ___) => {
      const users: User[] = await User.find();
      if (users) {
        return {
          ok: true,
          users
        };
      } else {
        return {
          ok: false,
          error: "Could not return all the users"
        };
      }
    })
  }
};

export default resolvers;
