import { Resolvers } from "../../../types/resolvers";
import { makeMiddleware, authMiddleware } from "../../../utils/middlewares";

interface args {
  pickUpLocation: string;
  pickUpCoords: string;
  dropOffLocation: string;
  paymentMethod: string;
  price: number;
}

const resolvers: Resolvers = {
  Mutation: {
    requestRide: makeMiddleware(
      authMiddleware,
      async (
        _,
        {
          pickUpLocation,
          pickUpCoords,
          dropOffLocation,
          paymentMethod,
          price
        }: args,
        { req }
      ) => {}
    )
  }
};
export default resolvers;
