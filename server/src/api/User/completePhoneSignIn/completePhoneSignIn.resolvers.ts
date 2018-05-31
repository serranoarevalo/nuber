import { Resolvers } from "../../../types/resolvers";
import Confirmation from "../../../entities/Confirmation";
import { CompletePhoneSignInResponse } from "../../../types/graph";
import User from "../../../entities/User";
import { createJWT } from "../../../utils/createJWT";

interface IArgs {
  key: string;
}

const resolvers: Resolvers = {
  Mutation: {
    completePhoneSignIn: async (
      _,
      { key }: IArgs
    ): Promise<CompletePhoneSignInResponse> => {
      const confirmation: Confirmation = await Confirmation.findOne(
        {
          key,
          type: "PHONE"
        },
        {
          relations: ["user"]
        }
      );
      if (confirmation) {
        const user: User = confirmation.user;
        if (user) {
          const token: string = createJWT(user.id);
          await confirmation.remove();
          return {
            ok: true,
            token,
            error: null
          };
        } else {
          return {
            ok: true,
            token: null,
            error: null
          };
        }
      } else {
        return {
          ok: false,
          token: null,
          error: "Login token is not valid or has expired."
        };
      }
    }
  }
};
export default resolvers;
