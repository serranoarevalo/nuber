import bcrypt from "bcrypt";
import User from "../../../entities/User";
import { UpdateUserResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { authMiddleware, makeMiddleware } from "../../../utils/middlewares";

interface IArgs {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  age: number;
  phoneNumber: string;
  profilePhoto: string;
  isDriving: boolean;
  lastLat: number;
  lastLng: number;
}

const resolvers: Resolvers = {
  Mutation: {
    updateUser: makeMiddleware(
      authMiddleware,
      async (_, args: IArgs, { req, pubsub }): Promise<UpdateUserResponse> => {
        const { user }: { user: User } = req;
        const updateData = args;
        if (args.password) {
          const hashedPassword: string = await bcrypt.hash(args.password, 12);
          updateData.password = hashedPassword;
        }
        try {
          await User.update(user.id, args);
          const updatedUser: User | undefined = await User.findOne({
            id: user.id
          });
          if (updatedUser) {
            if (user.isDriving) {
              const { lastLat, lastLng } = updatedUser;
              if (lastLat !== null && lastLng !== null) {
                pubsub.publish("driverUpdate", { getDriver: updatedUser });
              }
            }
            return {
              ok: true,
              user: updatedUser,
              error: null
            };
          } else {
            return {
              ok: false,
              user: null,
              error: "Couldn't update user"
            };
          }
        } catch (error) {
          return {
            ok: false,
            user: null,
            error: "Couldn't update user"
          };
        }
      }
    )
  }
};

export default resolvers;
