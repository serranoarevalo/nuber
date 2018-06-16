import { getConnection } from "typeorm";
import Ride from "../../../entities/Ride";
import User from "../../../entities/User";
import { GetRideResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { authMiddleware, makeMiddleware } from "../../../utils/middlewares";

interface IArgs {
  rideId: number;
}

const resolvers: Resolvers = {
  Query: {
    getRide: makeMiddleware(
      authMiddleware,
      async (_, args: IArgs, { req }): Promise<GetRideResponse> => {
        const { user }: { user: User } = req;
        const ride: Ride | undefined = await getConnection()
          .createQueryBuilder()
          .select("ride")
          .from(Ride, "ride")
          .leftJoinAndSelect("ride.passenger", "passenger")
          .leftJoinAndSelect("ride.driver", "driver")
          .where(
            `ride.passenger.id = ${user.id} AND NOT ride.status='CANCELED'`
          )
          .orWhere(`ride.driver.id = ${user.id}`)
          .andWhere(`ride.id = ${args.rideId}`)
          .getOne();
        if (ride) {
          return {
            ok: true,
            ride,
            isDriver: ride.driver.id === user.id,
            error: null
          };
        } else {
          return {
            ok: false,
            ride: null,
            isDriver: false,
            error: "Couldn't find ride"
          };
        }
      }
    )
  }
};

export default resolvers;
