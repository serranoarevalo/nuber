import { makeMiddleware, authMiddleware } from "../../../utils/middlewares";
import { sendVerificationText } from "../../../utils/sendSMS";
import User from "../../../entities/User";
import { Resolvers } from "../../../types/resolvers";
import { AddPhoneResponse } from "../../../types/graph";
import Confirmation from "../../../entities/Confirmation";

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
        const message = await sendVerificationText(
          phoneNumber,
          confirmation.key
        );
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
