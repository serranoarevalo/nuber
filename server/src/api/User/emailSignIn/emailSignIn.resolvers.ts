import { createJWT } from "../../../utils/createJWT";
import { Resolvers, Resolver } from "../../../types/resolvers";
import User from "../../../entities/User";

const resolvers: Resolvers = {
  Mutation: {
    emailSignIn: async (
      parent,
      { email, password }: { email: string; password: string },
      { entities: { User }, req }
    ): Promise<object> => {
      const user: User = await User.findOne({ email, loginType: "email" });
      if (!user) {
        return {
          ok: false,
          error: "No user with that email"
        };
      }
      const validPassword = await user.comparePassword(password, user.password);
      if (!validPassword) {
        return {
          ok: false,
          error: "Wrong password"
        };
      }
      const token = createJWT(user.id);
      return {
        ok: true,
        token
      };
    }
  }
};

export default resolvers;
