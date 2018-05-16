import { Resolvers } from "../../../types/resolvers";
import { makeMiddleware, authMiddleware } from "../../../utils/middlewares";
import { User, GetRideHistoryResponse } from "../../../types/graph";
import Ride from "../../../entities/Ride";
import { getConnection } from "typeorm";

const resolvers: Resolvers = {
  Query: {
    getRideHistory: makeMiddleware(
      authMiddleware,
      async (_, __, { req }): Promise<GetRideHistoryResponse> => {
        const { user }: { user: User } = req;
        const rides = await getConnection()
          .getRepository(Ride)
          .createQueryBuilder("ride")
          .loadAllRelationIds()
          .where("ride.passenger = :userId OR ride.driver = :driverId", {
            userId: user.id,
            driverId: user.id
          })
          .getMany();
        if (rides) {
          return {
            ok: true,
            rides,
            error: null
          };
        } else {
          return {
            ok: false,
            rides: null,
            error: "Could not find rides"
          };
        }
      }
    )
  }
};
export default resolvers;
