import { makeMiddleware, authMiddleware } from "../../../utils/middlewares";
import { sendVerificationText } from "../../../utils/sendSMS";
import Confirmation from "../../../entities/Confirmation";
import User from "../../../entities/User";
import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers = {
  Mutation: {
    addPhone: makeMiddleware(
      authMiddleware,
      async (
        _,
        { phoneNumber }: { phoneNumber: string },
        { req }
      ): Promise<object> => {
        const { user }: { user: User } = req;
        user.phoneNumber = phoneNumber;
        user.save();
        const confirmation: Confirmation = await Confirmation.create({
          user,
          type: "phone"
        }).save();
        const message = await sendVerificationText(
          phoneNumber,
          confirmation.key
        );
        return {
          ok: true
        };
      }
    )
  }
};
export default resolvers;
