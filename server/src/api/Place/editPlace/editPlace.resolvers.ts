import { Resolvers } from "../../../types/resolvers";
import { makeMiddleware, authMiddleware } from "../../../utils/middlewares";
import Place from "../../../entities/Place";
import User from "../../../entities/User";
import { EditPlaceResponse } from "../../../types/graph";

interface IArgs {
  placeId: number;
  name: string;
  latlong: string;
  address: string;
  fav: boolean;
}

const resolvers: Resolvers = {
  Mutation: {
    editPlace: makeMiddleware(
      authMiddleware,
      async (_, args: IArgs, { req }): Promise<EditPlaceResponse> => {
        const { user }: { user: User } = req;
        try {
          await Place.update({ user, id: args.placeId }, args);
          return {
            ok: true,
            error: null
          };
        } catch (error) {
          return {
            ok: false,
            error: "Couldn't update place"
          };
        }
      }
    )
  }
};

export default resolvers;
