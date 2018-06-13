import User from "../../../entities/User";
import { GetUsersResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { authMiddleware, makeMiddleware } from "../../../utils/middlewares";

const resolvers: Resolvers = {
  Query: {
    getUsers: makeMiddleware(
      authMiddleware,
      async (_, __, ___): Promise<GetUsersResponse> => {
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
      }
    )
  }
};

export default resolvers;
