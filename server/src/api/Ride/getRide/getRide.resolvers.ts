import { Resolvers } from "../../../types/resolvers";
import { makeMiddleware, authMiddleware } from "../../../utils/middlewares";
import Ride from "../../../entities/Ride";
import User from "../../../entities/User";
import { getConnection } from "typeorm";
import { GetRideResponse } from "../../../types/graph";

interface IArgs {
  rideId: number;
}

const resolvers: Resolvers = {
  Query: {
    getRide: makeMiddleware(
      authMiddleware,
      async (_, args: IArgs, { req }): Promise<GetRideResponse> => {
        const { user }: { user: User } = req;
        const ride = await getConnection()
          .getRepository(Ride)
          .createQueryBuilder("ride")
          .loadAllRelationIds()
          .where(
            "ride.id = :rideId AND ride.passenger = :userId OR ride.driver = :driverId",
            {
              userId: user.id,
              driverId: user.id,
              rideId: args.rideId
            }
          )
          .getOne();
        if (ride) {
          return {
            ok: true,
            ride,
            error: null
          };
        } else {
          return {
            ok: false,
            ride: null,
            error: "Couldn't find ride"
          };
        }
      }
    )
  }
};

export default resolvers;
