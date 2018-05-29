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
      const existingConfirmation: Confirmation = await Confirmation.findOne({
        payload: phoneNumber,
        type: "PHONE"
      });
      if (existingConfirmation) {
        existingConfirmation.remove();
      }
      const confirmation: Confirmation = await Confirmation.create({
        payload: phoneNumber,
        type: "PHONE"
      }).save();
      const verification = await sendVerificationText(
        phoneNumber,
        confirmation.key
      );
      if (verification) {
        confirmation.sent = true;
        confirmation.save();
        return {
          ok: true,
          error: null
        };
      } else {
        return {
          ok: false,
          error: "Couldn't send confirmation SMS"
        };
      }
    }
  }
};

export default resolvers;
