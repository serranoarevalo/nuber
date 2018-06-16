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
        const ride: any = await getConnection()
          .createQueryBuilder()
          .select("ride")
          .from(Ride, "ride")
          .loadAllRelationIds()
          .where(`ride.passenger = ${user.id}`)
          .orWhere(`ride.driver = ${user.id}`)
          .andWhere(`ride.id = ${args.rideId}`)
          .getOne();
        console.log(ride);
        if (ride) {
          return {
            ok: true,
            ride,
            isDriver: ride.driver === user.id,
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
