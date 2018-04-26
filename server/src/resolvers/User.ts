import bcrypt from "bcrypt";
import Mailgun from "mailgun-js";
import { MAILGUN_API_KEY } from "../keys";

export default {
  Query: {
    users: (parent, args, { entities: { User } }) => User.find(),
    user: (parent, { id }, { entities: { User } }) => User.findOne(id)
  },
  Mutation: {
    registerUserWithEmail: async (
      parent,
      args,
      { entities: { User, EmailConfirmation } }
    ) => {
      const newUser = await User.create(args).save();
      if (newUser) {
        const emailConfirmation = await EmailConfirmation.create({
          user: newUser
        }).save();
        const mailgun = new Mailgun({
          apiKey: MAILGUN_API_KEY,
          domain: "sandbox6dc95a40763144f59f34911bf0fb8eaf.mailgun.org"
        });
        const emailData = {
          from: "itnico.las.me@gmail.com",
          to: "itnico.las.me@gmail.com",
          subject: "Please confirm your email",
          html: `Hello please confirm your email by: <a href="http://nuber.co/verify/${
            emailConfirmation.key
          }">clicking here</a>`
        };
        const message = await mailgun.messages().send(emailData);
        return newUser;
      }
    },
    updateUser: async (
      parent,
      args,
      { entities: { User } }
    ): Promise<boolean> => {
      const updateData = args;
      if (args.password) {
        const hashedPassword: string = await bcrypt.hash(args.password, 12);
        updateData.password = hashedPassword;
      }
      try {
        await User.update(args.id, args);
        return true;
      } catch (error) {
        return false;
      }
    }
  }
};
