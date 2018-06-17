import User from "../../../entities/User";
import { GetChatResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { authMiddleware, makeMiddleware } from "../../../utils/middlewares";

const resolvers: Resolvers = {
  Query: {
    getChat: makeMiddleware(
      authMiddleware,
      async (_, __, { req }): Promise<GetChatResponse> => {
        const user = await User.findOne(req.user.id, {
          relations: ["chatRoom"]
        });
        if (user && user.chatRoom) {
          return {
            ok: true,
            chat: user.chatRoom,
            error: null
          };
        } else {
          return {
            ok: false,
            chat: null,
            error: "Can't find chat room"
          };
        }
      }
    )
  }
};

export default resolvers;
