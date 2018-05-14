import { Resolvers } from "../../../types/resolvers";
import { makeMiddleware, authMiddleware } from "../../../utils/middlewares";
import { RequestPasswordResetResponse, User } from "../../../types/graph";
import Confirmation from "../../../entities/Confirmation";
import { sendResetPasswordEmail } from "../../../utils/sendEmail";

const resolvers: Resolvers = {
  Mutation: {
    requestPasswordReset: makeMiddleware(
      authMiddleware,
      async (_, __, { req }): Promise<RequestPasswordResetResponse> => {
        const { user }: { user: User } = req;
        console.log(user);
        if (user.loginType === "EMAIL") {
          const confirmation: Confirmation = await Confirmation.create({
            user,
            type: "PASSWORD"
          }).save();

          const message = await sendResetPasswordEmail(confirmation.key);
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
