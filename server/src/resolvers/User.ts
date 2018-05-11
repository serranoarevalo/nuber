import bcrypt from "bcrypt";
import { sendConfirmationEmail } from "../utils/sendEmail";
import { createJWT } from "../utils/createJWT";
import request from "request-promise";
import { authenticatedResolver } from "../utils/wrappedResolvers";
import { sendVerificationText } from "../utils/sendSMS";

export default {
  Mutation {
    facebookConnect: async (
      parent,
      { token }: { token: string },
      { entities: { User } }
    ) => {
      // https://developers.facebook.com/tools/explorer/?method=GET
      const fbURL = `https://graph.facebook.com/me?access_token=${token}&fields=id,first_name,last_name,email`;
      const fbRequest = await request(fbURL);
      const { id, first_name, last_name, email } = JSON.parse(fbRequest);
      const existingUser = await User.findOne({ facebookId: id });
      if (existingUser) {
        const token = createJWT(existingUser.id);
        return {
          ok: true,
          token
        };
      } else {
        const user = await User.create({
          facebookId: id,
          firstName: first_name,
          lastName: last_name,
          email: `${id}@facebook.com`,
          verifiedEmail: true,
          loginType: "facebook"
        }).save();
        const token = createJWT(user.id);
        return {
          ok: true,
          token
        };
      }
    },
    loginWithEmail: async (
      paret,
      { email, password }: { email: string; password: string },
      { entities: { User } }
    ) => {
      
    },
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
