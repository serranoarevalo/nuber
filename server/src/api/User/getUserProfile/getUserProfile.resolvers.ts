import User from "../../../entities/User";
import { GetUserProfileResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { authMiddleware, makeMiddleware } from "../../../utils/middlewares";

interface IArgs {
  id: number;
}

const resolvers: Resolvers = {
  Query: {
    getUserProfile: makeMiddleware(
      authMiddleware,
      async (_, { id }: IArgs): Promise<GetUserProfileResponse> => {
        const user: User | undefined = await User.findOne(id);
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
