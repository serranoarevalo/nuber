import { getConnection } from "typeorm";
import Ride from "../../../entities/Ride";
import User from "../../../entities/User";
import { UpdateRideResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { authMiddleware, makeMiddleware } from "../../../utils/middlewares";

interface IArgs {
  rideId: number;
  status: string;
  driverRating: number;
  passengerRating: number;
  driverId: number;
}

const resolvers: Resolvers = {
  Mutation: {
    updateRide: makeMiddleware(
      authMiddleware,
      async (_, args: IArgs, { req, pubsub }): Promise<UpdateRideResponse> => {
        const { user }: { user: User } = req;
        const ride = await getConnection()
          .getRepository(Ride)
          .createQueryBuilder("ride")
          .loadAllRelationIds()
          .where(
            "ride.id = :rideId AND ride.passenger = :userId OR ride.driver = :driverId AND NOT ride.status = 'FINISHED' OR NOT ride.status = 'CANCELED'",
            {
              userId: user.id,
              driverId: user.id,
              rideId: args.rideId
            }
          )
          .getOne();
        const {
          status,
          driverRating,
          passengerRating,
          rideId,
          driverId
        } = args;
        const updateData: any = { status, driverRating, passengerRating };
        if (driverId) {
          const driver: User | undefined = await User.findOne(driverId);
          if (driver) {
            updateData.driver = driver;
          }
        }
        if (ride) {
          try {
            await Ride.update(rideId, updateData);
            const updatedRide: Ride | undefined = await Ride.findOne(rideId, {
              relations: ["driver", "passenger"]
            });
            if (updatedRide) {
              pubsub.publish("rideUpdate", { rideUpdate: updatedRide });
              return {
                ok: true,
                ride: updatedRide,
                error: null
              };
            }
            return {
              ok: false,
              ride: null,
              error: "Couldn't update ride"
            };
          } catch (error) {
            return {
              ok: false,
              ride: null,
              error: "Couldn't update ride"
            };
          }
        } else {
          return {
            ok: false,
            ride: null,
            error: "Ride not found"
          };
        }
      }
    )
  }
};
export default resolvers;
