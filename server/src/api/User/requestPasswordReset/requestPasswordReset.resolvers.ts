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
        const confirmation: Confirmation = await Confirmation.create({
          user,
          type: "password"
        }).save();
        const message = await sendResetPasswordEmail(confirmation.key);
        return {
          ok: true,
          error: null
        };
      }
    )
  }
};
export default resolvers;
