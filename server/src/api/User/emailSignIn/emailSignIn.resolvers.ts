import { createJWT } from "../../../utils/createJWT";
import { Resolvers } from "../../../types/resolvers";
import User from "../../../entities/User";
import { EmailSignInResponse } from "../../../types/graph";

const resolvers: Resolvers = {
  Mutation: {
    emailSignIn: async (
      _,
      { email, password }: { email: string; password: string }
    ): Promise<EmailSignInResponse> => {
      const user: User = await User.findOne({ email, loginType: "EMAIL" });
      if (!user) {
        return {
          ok: false,
          error: "No user with that email",
          token: null,
          user: null
        };
      }
      const validPassword: boolean = await user.comparePassword(
        password,
        user.password
      );
      if (!validPassword) {
        return {
          ok: false,
          error: "Wrong password",
          token: null,
          user: null
        };
      }
      const token: string = createJWT(user.id);
      return {
        ok: true,
        token,
        user,
        error: null
      };
    }
  }
};

export default resolvers;
