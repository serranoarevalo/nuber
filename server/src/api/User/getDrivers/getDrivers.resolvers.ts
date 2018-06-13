import { Between, getConnection } from "typeorm";
import User from "../../../entities/User";
import { Resolvers } from "../../../types/resolvers";
import { authMiddleware, makeMiddleware } from "../../../utils/middlewares";

const resolvers: Resolvers = {
  Query: {
    getDrivers: makeMiddleware(authMiddleware, async (_, __, { req }) => {
      const { user }: { user: User } = req;
      const { lastLat, lastLng } = user;
      const drivers: User[] = await getConnection()
        .getRepository(User)
        .find({
          isDriving: true,
          lastLat: Between(lastLat - 0.05, lastLat + 0.05),
          lastLng: Between(lastLng - 0.05, lastLng + 0.05)
        });
      return {
        drivers
      };
    })
  }
};

export default resolvers;
