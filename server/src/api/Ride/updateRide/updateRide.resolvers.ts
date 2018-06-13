import { Resolvers } from "../../../types/resolvers";
import { makeMiddleware, authMiddleware } from "../../../utils/middlewares";
import { UpdateRideResponse } from "../../../types/graph";
import User from "../../../entities/User";
import Ride from "../../../entities/Ride";
import { getConnection } from "typeorm";

interface IArgs {
  rideId: number;
  status: string;
  driverRating: number;
  passengerRating: number;
}

const resolvers: Resolvers = {
  Mutation: {
    updateRide: makeMiddleware(
      authMiddleware,
      async (_, args: IArgs, { req }): Promise<UpdateRideResponse> => {
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
        console.log(ride);
        if (ride) {
          try {
            await Ride.update(args.rideId, args);
            return {
              ok: true,
              error: null
            };
          } catch (error) {
            return {
              ok: false,
              error: "Couldn't update ride"
            };
          }
        } else {
          return {
            ok: false,
            error: "Ride not found"
          };
        }
      }
    )
  }
};
export default resolvers;
