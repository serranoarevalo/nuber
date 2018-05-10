import { authenticatedResolver } from "../../../utils/wrappedResolvers";

module.exports = {
  Query: {
    getUserProfile: authenticatedResolver.wrap(
      async (parent, { id }: { id: number }, { entities: { User } }) => {
        const user = await User.findOne(id);
        if (user) {
          return {
            ok: true,
            user
          };
        } else {
          return {
            ok: false,
            error: `Could not find a user with the id ${id}`
          };
        }
      }
    )
  }
};
