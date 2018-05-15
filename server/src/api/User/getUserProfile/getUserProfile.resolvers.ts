import { makeMiddleware, authMiddleware } from "../../../utils/middlewares";
import { Resolvers } from "../../../types/resolvers";
import User from "../../../entities/User";
import { GetUserProfileResponse } from "../../../types/graph";

interface IArgs {
  id: number;
}

const resolvers: Resolvers = {
  Query: {
    getUserProfile: makeMiddleware(
      authMiddleware,
      async (_, { id }: IArgs): Promise<GetUserProfileResponse> => {
        const user: User = await User.findOne(id);
        if (user) {
          return {
            ok: true,
            user,
            error: null
          };
        } else {
          return {
            ok: false,
            error: `Could not find a user with the id ${id}`,
            user: null
          };
        }
      }
    )
  }
};

export default resolvers;
