export default {
  Query: {
    users: (parent, args, { entities: { User } }) => User.find()
  },
  Mutation: {
    createUser: (parent, args, { entities: { User } }) =>
      User.create(args).save(),
    updateUser: async (parent, args, { entities: { User } }) => {
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
