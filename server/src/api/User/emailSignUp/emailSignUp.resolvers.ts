import Confirmation from "../../../entities/Confirmation";
import User from "../../../entities/User";
import { EmailSignUpResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { createJWT } from "../../../utils/createJWT";
import { sendConfirmationEmail } from "../../../utils/sendEmail";

interface IArgs {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  age: number;
  phoneNumber: string;
  profilePhoto: string;
}

const resolvers: Resolvers = {
  Mutation: {
    emailSignUp: async (_, args: IArgs, __): Promise<EmailSignUpResponse> => {
      const existingUser: User | undefined = await User.findOne({
        email: args.email
      });
      if (existingUser) {
        return {
          ok: false,
          token: null,
          error: "User already exists, try to sign in."
        };
      }
      const phoneConfirmation:
        | Confirmation
        | undefined = await Confirmation.findOne({
        payload: args.phoneNumber,
        verified: true
      });
      if (!phoneConfirmation) {
        return {
          ok: false,
          token: null,
          error: "Phone Number isn't verified"
        };
      }
      const newUser: User = await User.create({
        ...args,
        verifiedPhoneNumber: true
      }).save();
      const emailConfirmation: Confirmation = await Confirmation.create({
        user: newUser
      }).save();
      await sendConfirmationEmail(emailConfirmation.key);
      emailConfirmation.sent = true;
      emailConfirmation.save();
      const token: string = createJWT(newUser.id);
      return {
        ok: true,
        token,
        error: null
      };
    }
  }
};

export default resolvers;
