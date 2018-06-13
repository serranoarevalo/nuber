import { Resolvers } from "../../../types/resolvers";
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
      const existingConfirmation:
        | Confirmation
        | undefined = await Confirmation.findOne({
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
      try {
        await sendVerificationText(phoneNumber, confirmation.key);
        confirmation.sent = true;
        confirmation.save();
        return {
          ok: true,
          error: null
        };
      } catch (error) {
        return {
          ok: false,
          error: error.message
        };
      }
    }
  }
};

export default resolvers;
