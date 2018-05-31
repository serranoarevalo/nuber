import { sendConfirmationEmail } from "../../../utils/sendEmail";
import { Resolvers } from "../../../types/resolvers";
import User from "../../../entities/User";
import Confirmation from "../../../entities/Confirmation";
import { EmailSignUpResponse } from "../../../types/graph";
import { createJWT } from "../../../utils/createJWT";

interface IArgs {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  age: number;
  phoneNumber: string;
}

const resolvers: Resolvers = {
  Mutation: {
    emailSignUp: async (_, args: IArgs, __): Promise<EmailSignUpResponse> => {
      const existingUser: User = await User.findOne({ email: args.email });
      if (existingUser) {
        return {
          ok: false,
          token: null,
          error: "User already exists, try to sign in."
        };
      }
      const phoneConfirmation: Confirmation = await Confirmation.findOne({
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
      const newUser: User = await User.create(args).save();
      const emailConfirmation: Confirmation = await Confirmation.create({
        user: newUser
      }).save();
      const message = await sendConfirmationEmail(emailConfirmation.key);
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
