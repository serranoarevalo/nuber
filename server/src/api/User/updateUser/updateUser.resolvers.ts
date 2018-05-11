import bcrypt from "bcrypt";
import { Resolvers } from "../../../types/resolvers";
import { makeMiddleware, authMiddleware } from "../../../utils/middlewares";
import User from "../../../entities/User";

const resolvers: Resolvers = {
  Mutation: {
    updateUser: makeMiddleware(
      authMiddleware,
      async (_, args, { req }): Promise<object> => {
        const { user }: { user: User } = req;
        const updateData = args;
        if (args.password) {
          const hashedPassword: string = await bcrypt.hash(args.password, 12);
          updateData.password = hashedPassword;
        }
        try {
          await User.update(user.id, args);
          return {
            ok: true
          };
        } catch (error) {
          return {
            ok: false,
            error: "Couldn't update user"
          };
        }
      }
    )
  }
};

export default resolvers;
