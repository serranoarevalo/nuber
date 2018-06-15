import { Between, getConnection } from "typeorm";
import Ride from "../../../entities/Ride";
import User from "../../../entities/User";
import { GetRideRequestResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { authMiddleware, makeMiddleware } from "../../../utils/middlewares";

const REQUESTING = "REQUESTING";

const resolvers: Resolvers = {
  Query: {
    getRideRequest: makeMiddleware(
      authMiddleware,
      async (_, __, { req }): Promise<GetRideRequestResponse> => {
        const user: User = req.user;
        if (user.isDriving && !user.isTaken) {
          const { lastLat, lastLng } = user;
          try {
            const ride = await getConnection()
              .getRepository(Ride)
              .findOne(
                {
                  status: REQUESTING,
                  pickUpLat: Between(lastLat - 0.05, lastLat + 0.05),
                  pickUpLng: Between(lastLng - 0.05, lastLng + 0.05)
                },
                {
                  relations: ["passenger"]
                }
              );
            if (ride) {
              return {
                ok: true,
                ride,
                error: null
              };
            } else {
              return {
                ok: true,
                ride: null,
                error: null
              };
            }
          } catch (error) {
            return {
              ok: false,
              error: error.message,
              ride: null
            };
          }
        } else {
          return {
            ok: false,
            error: "Looks like you're already driving",
            ride: null
          };
        }
      }
    )
  }
};

export default resolvers;
