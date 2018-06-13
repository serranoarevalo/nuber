import Place from "../../../entities/Place";
import User from "../../../entities/User";
import { AddPlaceResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { authMiddleware, makeMiddleware } from "../../../utils/middlewares";

interface IArgs {
  address: string;
  name: string;
  lat: number;
  lng: number;
  fav: boolean;
}

const resolvers: Resolvers = {
  Mutation: {
    addPlace: makeMiddleware(
      authMiddleware,
      async (_, args: IArgs, { req }): Promise<AddPlaceResponse> => {
        const { user }: { user: User } = req;
        const newPlace: Place = await Place.create({ ...args, user }).save();
        if (newPlace) {
          return {
            ok: true,
            place: newPlace,
            error: null
          };
        } else {
          return {
            ok: false,
            error: "Could not create message",
            place: null
          };
        }
      }
    )
  }
};

export default resolvers;
