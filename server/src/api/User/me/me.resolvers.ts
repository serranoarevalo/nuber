import { Resolvers } from "../../../types/resolvers";
import { makeMiddleware, authMiddleware } from "../../../utils/middlewares";
import User from "../../../entities/User";
import { MeResponse } from "../../../types/graph";

const resolvers: Resolvers = {
  Query: {
    me: makeMiddleware(authMiddleware, async (_, __, { req }): Promise<
      MeResponse
    > => {
      const user = await User.findOne(req.user.id);
      console.log(user);
      if (user) {
        return {
          ok: true,
          user,
          error: null
        };
      } else {
        return {
          ok: false,
          user: null,
          error: "Didn't find user"
        };
      }
    })
  }
};
export default resolvers;
