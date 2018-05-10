import { sendConfirmationEmail } from "../../../utils/sendEmail";
import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers = {
  Mutation: {
    emailSignUp: async (parent, args, { entities: { User, Confirmation } }) => {
      const newUser = await User.create(args).save();
      const emailConfirmation = await Confirmation.create({
        user: newUser
      }).save();
      const message = await sendConfirmationEmail(emailConfirmation.key);
      emailConfirmation.sent = true;
      emailConfirmation.save();
      return {
        ok: true,
        user: newUser
      };
    }
  }
};

export default resolvers;
