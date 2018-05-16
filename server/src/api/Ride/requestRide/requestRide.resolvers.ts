import { Resolvers } from "../../../types/resolvers";
import { makeMiddleware, authMiddleware } from "../../../utils/middlewares";
import User from "../../../entities/User";
import Ride from "../../../entities/Ride";
import { RequestRideResponse } from "../../../types/graph";

interface IArgs {
  pickUpLocation: string;
  pickUpCoords: string;
  dropOffLocation: string;
  paymentMethod: string;
  price: number;
}

const resolvers: Resolvers = {
  Mutation: {
    requestRide: makeMiddleware(
      authMiddleware,
      async (
        _,
        {
          pickUpLocation,
          pickUpCoords,
          dropOffLocation,
          paymentMethod,
          price
        }: IArgs,
        { req }
      ): Promise<RequestRideResponse> => {
        const { user }: { user: User } = req;
        const ride: Ride = await Ride.create({
          passenger: user,
          pickUpLocation,
          pickUpCoords,
          dropOffLocation,
          paymentMethod,
          price
        }).save();
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
            error: "Could not request a ride right now, please try later."
          };
        }
      }
    )
  }
};
export default resolvers;
