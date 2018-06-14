import { Between, getConnection } from "typeorm";
import Ride from "../../../entities/Ride";
import User from "../../../entities/User";
import { RequestRideResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { authMiddleware, makeMiddleware } from "../../../utils/middlewares";

interface IArgs {
  pickUpLocation: string;
  dropOffLocation: string;
  pickUpLat: number;
  pickUpLng: number;
  dropOffLat: number;
  dropOffLng: number;
}

const resolvers: Resolvers = {
  Mutation: {
    requestRide: makeMiddleware(
      authMiddleware,
      async (_, args: IArgs, { req }): Promise<RequestRideResponse> => {
        const { user }: { user: User } = req;
        const { lastLat, lastLng } = user;
        const {
          pickUpLocation,
          dropOffLocation,
          pickUpLat,
          pickUpLng,
          dropOffLat,
          dropOffLng
        } = args;
        try {
          const driver: User = await getConnection()
            .getRepository(User)
            .findOneOrFail({
              isDriving: true,
              isTaken: false,
              lastLat: Between(lastLat - 0.05, lastLat + 0.05),
              lastLng: Between(lastLng - 0.05, lastLng + 0.05)
            });
          const ride: Ride = await Ride.create({
            passenger: user,
            driver,
            pickUpLocation,
            pickUpCoords: {
              lat: pickUpLat,
              lng: pickUpLng
            },
            dropOffLocation,
            dropOffCoords: {
              lat: dropOffLat,
              lng: dropOffLng
            }
          }); // .save();
          /* driver.isTaken = true;
          driver.save(); */
          console.log(ride);
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
        } catch (error) {
          return {
            ok: false,
            ride: null,
            error: "No drivers are available"
          };
        }
      }
    )
  }
};
export default resolvers;
