import bcrypt from "bcrypt";

export default {
  Query: {
    users: (parent, args, { entities: { User } }) => User.find()
  },
  Mutation: {
    createUser: (parent, args, { entities: { User } }) =>
      User.create(args).save(),
    updateUser: async (parent, args, { entities: { User } }) => {
      const updateData = args;
      if (args.password) {
        const hashedPassword = await bcrypt.hash(args.password, 12);
        updateData.password = hashedPassword;
      }
      try {
        await User.update(args.id, args);
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  }
};
