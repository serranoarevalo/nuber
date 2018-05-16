import { Resolvers } from "../../../types/resolvers";
import { makeMiddleware, authMiddleware } from "../../../utils/middlewares";
import { UpdateRideResponse } from "../../../types/graph";
import User from "../../../entities/User";
import Ride from "../../../entities/Ride";

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
        const ride: Ride = await Ride.findOne(
          { id: args.rideId },
          { loadRelationIds: true }
        );
        if (ride) {
          if (
            Number(ride.passenger) === user.id ||
            Number(ride.driver) === user.id
          ) {
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
              error: "You cant update this ride"
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
