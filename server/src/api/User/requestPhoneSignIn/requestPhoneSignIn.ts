import { Resolvers } from "../../../types/resolvers";
import User from "../../../entities/User";
import Confirmation from "../../../entities/Confirmation";
import { sendVerificationText } from "../../../utils/sendSMS";
import { RequestPhoneSignInResponse } from "../../../types/graph";

interface IArgs {
  phoneNumber: string;
}

const resolvers: Resolvers = {
  Mutation: {
    requestPhoneSignIn: async (
      _,
      { phoneNumber }: IArgs
    ): Promise<RequestPhoneSignInResponse> => {
      const user: User = await User.findOne({
        phoneNumber,
        verifiedPhoneNumber: true
      });
      if (user) {
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
      } else {
        return {
          ok: false,
          error: "There is no user registered with that phone number"
        };
      }
    }
  }
};

export default resolvers;
