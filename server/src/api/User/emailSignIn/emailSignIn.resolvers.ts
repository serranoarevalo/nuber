import { createJWT } from "../../../utils/createJWT";
import { Resolvers } from "../../../types/resolvers";
import User from "../../../entities/User";
import { EmailSignInResponse } from "../../../types/graph";

interface IArgs {
  email: string;
  password: string;
}

const resolvers: Resolvers = {
  Mutation: {
    emailSignIn: async (
      _,
      { email, password }: IArgs
    ): Promise<EmailSignInResponse> => {
      const user: User = await User.findOne({ email, loginType: "EMAIL" });
      if (!user) {
        return {
          ok: false,
          error: "Couldn't find a user with that email",
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
          error: "That password is wrong",
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
