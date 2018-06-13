import Confirmation from "../../../entities/Confirmation";
import User from "../../../entities/User";
import { VerifyPhoneResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { authMiddleware, makeMiddleware } from "../../../utils/middlewares";

interface IArgs {
  key: string;
}

const resolvers: Resolvers = {
  Mutation: {
    verifyPhone: makeMiddleware(
      authMiddleware,
      async (_, { key }: IArgs, { req }): Promise<VerifyPhoneResponse> => {
        const { user }: { user: User } = req;
        const confirmation:
          | Confirmation
          | undefined = await Confirmation.findOne({
          key,
          user,
          type: "PHONE"
        });
        if (confirmation) {
          user.verifiedPhoneNumber = true;
          user.save();
          // await confirmation.remove();
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
