import Confirmation from "../../../entities/Confirmation";
import User from "../../../entities/User";
import { RequestPasswordResetResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { authMiddleware, makeMiddleware } from "../../../utils/middlewares";
import { sendResetPasswordEmail } from "../../../utils/sendEmail";

const resolvers: Resolvers = {
  Mutation: {
    requestPasswordReset: makeMiddleware(
      authMiddleware,
      async (_, __, { req }): Promise<RequestPasswordResetResponse> => {
        const { user }: { user: User } = req;
        if (user.loginType === "EMAIL") {
          const confirmation: Confirmation = await Confirmation.create({
            user,
            type: "PASSWORD"
          }).save();
          await sendResetPasswordEmail(confirmation.key);
          confirmation.sent = true;
          confirmation.save();
          return {
            ok: true,
            error: null
          };
        } else {
          return {
            ok: false,
            error: "Couldn't reset password, maybe try login in with Facebook?"
          };
        }
      }
    )
  }
};
export default resolvers;
