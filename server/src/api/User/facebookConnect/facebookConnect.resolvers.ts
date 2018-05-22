import request from "request-promise";
import { Resolvers } from "../../../types/resolvers";
import { makeMiddleware, authMiddleware } from "../../../utils/middlewares";
import User from "../../../entities/User";
import { createJWT } from "../../../utils/createJWT";
import { FacebookConnectResolver } from "../../../types/graph";

interface IArgs {
  firstName: string;
  lastName: string;
  email: string;
  userID: string;
}

const resolvers: Resolvers = {
  Mutation: {
    facebookConnect: async (
      _,
      { email, firstName, lastName, userID }: IArgs,
      { req }
    ): Promise<FacebookConnectResolver> => {
      // https://developers.facebook.com/tools/explorer/?method=GET
      //const fbURL = `https://graph.facebook.com/me?access_token=${fbToken}&fields=id,first_name,last_name,email`;
      //const fbRequest = await request(fbURL);
      //const { id, first_name, last_name, email } = JSON.parse(fbRequest);
      const existingUser: User = await User.findOne({
        facebookId: Number(userID)
      });
      if (existingUser) {
        const token: string = createJWT(existingUser.id);
        return {
          ok: true,
          token,
          user: existingUser,
          error: null
        };
      } else {
        const user: User = await User.create({
          facebookId: Number(userID),
          firstName,
          lastName,
          email: email || `${userID}@facebook.com`,
          verifiedEmail: true,
          loginType: "FACEBOOK",
          profilePhoto: `https://graph.facebook.com/${userID}/picture?type=square`
        }).save();
        const token: string = createJWT(user.id);
        return {
          ok: true,
          token,
          user,
          error: null
        };
      }
    }
  }
};

export default resolvers;
