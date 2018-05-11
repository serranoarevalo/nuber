import { Resolvers } from "../../../types/resolvers";
import User from "../../../entities/User";
import Confirmation from "../../../entities/Confirmation";
import { makeMiddleware, authMiddleware } from "../../../utils/middlewares";

const resolvers: Resolvers = {
  Mutation: {
    verifyEmail: makeMiddleware(
      authMiddleware,
      async (_, { key }: { key: string }, { req }): Promise<object> => {
        const { user }: { user: User } = req;
        const confirmation: Confirmation = await Confirmation.findOne({
          key,
          user,
          type: "email"
        });
        if (confirmation) {
          req.user.verifiedEmail = true;
          req.user.save();
          await confirmation.remove();
          return {
            ok: true
          };
        } else {
          return {
            ok: false,
            error: "Verification token is not valid or has expired."
          };
        }
      }
    )
  }
};

export default resolvers;
