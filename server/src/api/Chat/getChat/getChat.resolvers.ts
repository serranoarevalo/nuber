import Chat from "../../../entities/Chat";
import { GetChatResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { authMiddleware, makeMiddleware } from "../../../utils/middlewares";

interface IArgs {
  rideId: number;
}

const resolvers: Resolvers = {
  Query: {
    getChat: makeMiddleware(
      authMiddleware,
      async (_, args: IArgs, { req }): Promise<GetChatResponse> => {
        const chat = await Chat.findOne(
          {
            rideId: args.rideId
          },
          { relations: ["participants", "messages"], loadEagerRelations: true }
        );
        if (chat) {
          return {
            ok: true,
            chat,
            error: null
          };
        }
        return {
          ok: false,
          chat: null,
          error: "Can't find chat room"
        };
      }
    )
  }
};

export default resolvers;
