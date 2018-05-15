import { sendConfirmationEmail } from "../../../utils/sendEmail";
import { Resolvers } from "../../../types/resolvers";
import User from "../../../entities/User";
import Confirmation from "../../../entities/Confirmation";
import { EmailSignUpResponse } from "../../../types/graph";

interface IArgs {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  age: number;
}

const resolvers: Resolvers = {
  Mutation: {
    emailSignUp: async (_, args: IArgs, __): Promise<EmailSignUpResponse> => {
      const newUser: User = await User.create(args).save();
      const emailConfirmation: Confirmation = await Confirmation.create({
        user: newUser
      }).save();
      const message = await sendConfirmationEmail(emailConfirmation.key);
      emailConfirmation.sent = true;
      emailConfirmation.save();
      return {
        ok: true,
        user: newUser,
        error: null
      };
    }
  }
};

export default resolvers;
