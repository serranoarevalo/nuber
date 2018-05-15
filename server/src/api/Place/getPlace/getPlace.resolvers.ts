import { Resolvers } from "../../../types/resolvers";
import { makeMiddleware, authMiddleware } from "../../../utils/middlewares";
import User from "../../../entities/User";
import { GetPlaceResponse } from "../../../types/graph";
import Place from "../../../entities/Place";

const resolvers: Resolvers = {
  Query: {
    getPlace: makeMiddleware(
      authMiddleware,
      async (
        _,
        { placeId }: { placeId: number },
        { req }
      ): Promise<GetPlaceResponse> => {
        const { user }: { user: User } = req;
        const place: Place = await Place.findOne({ id: placeId, user });
        if (place) {
          return {
            ok: true,
            place,
            error: null
          };
        } else {
          return {
            ok: false,
            place: null,
            error: "Couldn't find place"
          };
        }
      }
    )
  }
};
export default resolvers;
