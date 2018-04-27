import bcrypt from "bcrypt";
import { sendConfirmationEmail } from "../utils/sendEmail";
import request from "request-promise";

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
      const emailConfirmation = await EmailConfirmation.create({
        user: newUser
      }).save();
      const message = await sendConfirmationEmail(emailConfirmation.key);
      emailConfirmation.sent = true;
      emailConfirmation.save();
      return newUser;
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
    },
    confirmUserEmail: async (
      parent,
      { id, key }: { id: number; key: string },
      { entities: { User, EmailConfirmation } }
    ): Promise<boolean> => {
      const user = await User.findOne(id);
      const confirmation = await EmailConfirmation.findOne({ key, user });
      if (confirmation) {
        user.verifiedEmail = true;
        user.save();
        return true;
      } else {
        return false;
      }
    },
    facebookConnect: async (
      parent,
      { token }: { token: string },
      { entities: { User } }
    ) => {
      // https://developers.facebook.com/tools/explorer/?method=GET
      const fbURL = `https://graph.facebook.com/me?access_token=${token}&fields=id,first_name,last_name,email`;
      const fbRequest = await request(fbURL);
      const { id, first_name, last_name, email } = JSON.parse(fbRequest);
      return User.create({
        facebookId: id,
        firstName: first_name,
        lastName: last_name,
        email: `${id}@facebook.com`,
        verifiedEmail: true,
        loginType: "facebook"
      }).save();
    }
  }
};
