import { createJWT } from "../../../utils/createJWT";
import { Resolvers } from "../../../types/resolvers";
import User from "../../../entities/User";

const resolvers: Resolvers = {
  Mutation: {
    emailSignIn: async (
      _,
      { email, password }: { email: string; password: string }
    ): Promise<object> => {
      const user: User = await User.findOne({ email, loginType: "email" });
      if (!user) {
        return {
          ok: false,
          error: "No user with that email"
        };
      }
      const validPassword: boolean = await user.comparePassword(
        password,
        user.password
      );
      if (!validPassword) {
        return {
          ok: false,
          error: "Wrong password"
        };
      }
      const token: string = createJWT(user.id);
      return {
        ok: true,
        token
      };
    }
  }
};

export default resolvers;
