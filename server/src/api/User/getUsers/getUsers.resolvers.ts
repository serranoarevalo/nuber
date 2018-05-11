import { Resolvers } from "../../../types/resolvers";
import User from "../../../entities/User";
import { makeMiddleware, authMiddleware } from "../../../utils/middlewares";
import { GetUsersResponse } from "../../../types/graph";

const resolvers: Resolvers = {
  Query: {
    getUsers: makeMiddleware(authMiddleware, async (_, __, ___): Promise<
      GetUsersResponse
    > => {
      const users: User[] = await User.find();
      if (users) {
        return {
          ok: true,
          users,
          error: null
        };
      } else {
        return {
          ok: false,
          error: "Could not return all the users",
          users: []
        };
      }
    })
  }
};

export default resolvers;
