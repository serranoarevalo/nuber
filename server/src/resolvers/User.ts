export default {
  Query: {
    users: async (parent, args, { entities: { User } }) => {
      const allUsers = await User.find();
      return allUsers;
    }
  },
  Mutation: {
    createUser: async (parent, args, { entities: { User } }) => {
      const { email, firstName, lastName, password, age } = args;
      const user = new User();
      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email;
      user.password = password;
      user.age = age;
      await user.save();
      return user;
    }
  }
};
