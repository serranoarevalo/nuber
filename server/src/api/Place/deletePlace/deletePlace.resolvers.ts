import { Resolvers } from "../../../types/resolvers";
import { makeMiddleware, authMiddleware } from "../../../utils/middlewares";
import User from "../../../entities/User";
import { DeletePlaceResponse } from "../../../types/graph";
import Place from "../../../entities/Place";

const resolvers: Resolvers = {
  Mutation: {
    deletePlace: makeMiddleware(
      authMiddleware,
      async (
        _,
        { placeId }: { placeId: number },
        { req }
      ): Promise<DeletePlaceResponse> => {
        const { user }: { user: User } = req;
        const place: Place = await Place.findOne({ id: placeId, user });
        if (place) {
          await place.remove();
          return {
            ok: true,
            error: null
          };
        } else {
          return {
            ok: false,
            error: "Place not found"
          };
        }
      }
    )
  }
};
export default resolvers;
