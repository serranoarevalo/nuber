import bcrypt from "bcrypt";
import { Resolvers } from "../../../types/resolvers";
import { makeMiddleware, authMiddleware } from "../../../utils/middlewares";
import User from "../../../entities/User";
import { UpdateUserResponse } from "../../../types/graph";

interface IArgs {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  age: number;
  phoneNumber: string;
  profilePhoto: string;
}

const resolvers: Resolvers = {
  Mutation: {
    updateUser: makeMiddleware(
      authMiddleware,
      async (_, args: IArgs, { req }): Promise<UpdateUserResponse> => {
        const { user }: { user: User } = req;
        const updateData = args;
        if (args.password) {
          const hashedPassword: string = await bcrypt.hash(args.password, 12);
          updateData.password = hashedPassword;
        }
        try {
          await User.update(user.id, args);
          return {
            ok: true,
            error: null
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
