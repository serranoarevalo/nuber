import Chat from "../../../entities/Chat";
import User from "../../../entities/User";
import { GetChatResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { authMiddleware, makeMiddleware } from "../../../utils/middlewares";

const resolvers: Resolvers = {
  Query: {
    getChat: makeMiddleware(
      authMiddleware,
      async (_, __, { req }): Promise<GetChatResponse> => {
        const user: User = req.user;
        if (user.chatRoomId) {
          const chat = await Chat.findOne(user.chatRoomId, {
            relations: ["participants", "messages"]
          });
          console.log(chat);
          if (chat) {
            return {
              ok: true,
              chat,
              error: null
            };
          }
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
