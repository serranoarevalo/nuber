import { authenticatedResolver } from "../../utils/wrappedResolvers";

module.exports = {
  Query: {
    getUsers: authenticatedResolver.wrap(
      async (parent, args, { entities: { User } }) => {
        const users = await User.find();
        if (users) {
          return {
            ok: true,
            users
          };
        } else {
          return {
            ok: false,
            error: "Could not find all the users"
          };
        }
      }
    )
  }
};
