import { getConnection } from "typeorm";
import Ride from "../../../entities/Ride";
import { GetRideHistoryResponse, User } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { authMiddleware, makeMiddleware } from "../../../utils/middlewares";

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
