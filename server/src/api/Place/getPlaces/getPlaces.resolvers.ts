import Place from "../../../entities/Place";
import User from "../../../entities/User";
import { GetPlacesResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { authMiddleware, makeMiddleware } from "../../../utils/middlewares";

const resolvers: Resolvers = {
  Query: {
    getPlaces: makeMiddleware(
      authMiddleware,
      async (_, __, { req }): Promise<GetPlacesResponse> => {
        const { user }: { user: User } = req;
        const places: Place[] = await Place.find({ user });
        if (places) {
          return {
            ok: true,
            places,
            error: null
          };
        } else {
          return {
            ok: false,
            places: null,
            error: "Couldn't find places"
          };
        }
      }
    )
  }
};

export default resolvers;
