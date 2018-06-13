import Confirmation from "../../../entities/Confirmation";
import User from "../../../entities/User";
import { VerifyEmailResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { authMiddleware, makeMiddleware } from "../../../utils/middlewares";

interface IArgs {
  key: string;
}

const resolvers: Resolvers = {
  Mutation: {
    verifyEmail: makeMiddleware(
      authMiddleware,
      async (_, { key }: IArgs, { req }): Promise<VerifyEmailResponse> => {
        const { user }: { user: User } = req;
        const confirmation:
          | Confirmation
          | undefined = await Confirmation.findOne({
          key,
          user,
          type: "EMAIL"
        });
        if (confirmation) {
          req.user.verifiedEmail = true;
          req.user.save();
          await confirmation.remove();
          return {
            ok: true,
            error: null
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
