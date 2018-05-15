import { Resolvers } from "../../../types/resolvers";
import Confirmation from "../../../entities/Confirmation";
import User from "../../../entities/User";
import { ResetPasswordResponse } from "../../../types/graph";

interface IArgs {
  key: string;
  newPassword: string;
}

const resolvers: Resolvers = {
  Mutation: {
    resetPassword: async (
      _,
      { key, newPassword }: IArgs
    ): Promise<ResetPasswordResponse> => {
      const confirmation: Confirmation = await Confirmation.findOne({
        key,
        type: "PASSWORD"
      });
      if (confirmation) {
        const user: User = await User.findOne(confirmation.userId);
        user.password = newPassword;
        user.save();
        await confirmation.remove();
        return {
          ok: true,
          error: null
        };
      } else {
        return {
          ok: false,
          error: "Verification token is not valid or has expired."
        };
      }
    }
  }
};

export default resolvers;
