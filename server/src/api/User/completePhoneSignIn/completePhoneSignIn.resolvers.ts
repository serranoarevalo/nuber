import { Resolvers } from "../../../types/resolvers";
import Confirmation from "../../../entities/Confirmation";
import { CompletePhoneSignInResponse } from "../../../types/graph";
import User from "../../../entities/User";
import { createJWT } from "../../../utils/createJWT";

interface IArgs {
  key: string;
  phone: string;
}

const resolvers: Resolvers = {
  Mutation: {
    completePhoneSignIn: async (
      _,
      { key, phone }: IArgs
    ): Promise<CompletePhoneSignInResponse> => {
      const confirmation: Confirmation = await Confirmation.findOne({
        key,
        payload: phone,
        type: "PHONE"
      });
      if (confirmation) {
        confirmation.verified = true;
        confirmation.save();
        const user: User = confirmation.user;
        if (user) {
          const token: string = createJWT(user.id);
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
          error: "Verification key is not valid or has expired."
        };
      }
    }
  }
};
export default resolvers;
