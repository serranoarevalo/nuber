
import { sendConfirmationEmail } from "../utils/sendEmail";
import { createJWT } from "../utils/createJWT";

import { authenticatedResolver } from "../utils/wrappedResolvers";
import { sendVerificationText } from "../utils/sendSMS";

export default {
  Mutation {
    requestPhoneVerification: authenticatedResolver.wrap(
      async (
        parent,
        { phoneNumber }: { phoneNumber: string },
        { entities: { User, Confirmation }, req }
      ) => {
        const { user } = req;
        user.phoneNumber = phoneNumber;
        user.save();
        const confirmation = await Confirmation.create({
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
    ),
    verifyPhone: authenticatedResolver.wrap(
      async (
        parent,
        { key }: { key: string },
        { entities: { User, Confirmation }, req }
      ): Promise<object> => {
        const { user } = req;
        const confirmation = await Confirmation.findOne({
          key,
          user,
          type: "phone"
        });
        if (confirmation) {
          user.verifiedPhoneNumber = true;
          user.save();
          await confirmation.remove();
          return {
            ok: true
          };
        } else {
          return {
            ok: false,
            error: {
              message: "Verification token is not valid or has expired."
            }
          };
        }
      }
    )
  }
};
