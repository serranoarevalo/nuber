import { makeMiddleware, authMiddleware } from "../../../utils/middlewares";
import { Resolvers } from "../../../types/resolvers";
import User from "../../../entities/User";

const resolvers: Resolvers = {
  Query: {
    getUserProfile: makeMiddleware(
      authMiddleware,
      async (_, { id }: { id: number }): Promise<object> => {
        const user: User = await User.findOne(id);
        if (user) {
          return {
            ok: true,
            user
          };
        } else {
          return {
            ok: false,
            error: `Could not find a user with the id ${id}`
          };
        }
      }
    )
  }
};

export default resolvers;
