import { authenticatedResolver } from "../../../utils/wrappedResolvers";
import { Resolvers } from "../../../types/resolvers";
import User from "../../../entities/User";
import Confirmation from "../../../entities/Confirmation";

const resolvers: Resolvers = {
  Mutation: {
    verifyEmail: authenticatedResolver.wrap(
      async (
        parent,
        { key }: { key: string },
        { entities: { User, Confirmation }, req }
      ) => {
        const { user }: { user: User } = req;
        const confirmation: Confirmation = await Confirmation.findOne({
          key,
          user,
          type: "email"
        });
        if (confirmation) {
          user.verifiedEmail = true;
          user.save();
          await confirmation.remove();
          return {
            ok: true
          };
        } else {
          return {
            ok: false,
            error: {
              message: "Verification token is not valid or has expired."
            }
          };
        }
      }
    )
  }
};

export default resolvers;
