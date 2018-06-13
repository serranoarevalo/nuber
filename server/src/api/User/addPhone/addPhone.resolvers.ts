import Confirmation from "../../../entities/Confirmation";
import User from "../../../entities/User";
import { AddPhoneResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { authMiddleware, makeMiddleware } from "../../../utils/middlewares";
import { sendVerificationText } from "../../../utils/sendSMS";

interface IArgs {
  phoneNumber: string;
}

const resolvers: Resolvers = {
  Mutation: {
    addPhone: makeMiddleware(
      authMiddleware,
      async (_, { phoneNumber }: IArgs, { req }): Promise<AddPhoneResponse> => {
        const { user }: { user: User } = req;
        user.phoneNumber = phoneNumber;
        user.save();
        const confirmation: Confirmation = await Confirmation.create({
          user,
          type: "PHONE"
        }).save();
        await sendVerificationText(phoneNumber, confirmation.key);
        confirmation.sent = true;
        confirmation.save();
        return {
          ok: true,
          error: null
        };
      }
    )
  }
};
export default resolvers;
