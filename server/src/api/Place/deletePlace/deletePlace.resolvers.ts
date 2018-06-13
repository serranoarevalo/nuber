import Place from "../../../entities/Place";
import User from "../../../entities/User";
import { DeletePlaceResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { authMiddleware, makeMiddleware } from "../../../utils/middlewares";

interface IArgs {
  placeId: number;
}

const resolvers: Resolvers = {
  Mutation: {
    deletePlace: makeMiddleware(
      authMiddleware,
      async (_, { placeId }: IArgs, { req }): Promise<DeletePlaceResponse> => {
        const { user }: { user: User } = req;
        const place: Place | undefined = await Place.findOne({
          id: placeId,
          user
        });
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
