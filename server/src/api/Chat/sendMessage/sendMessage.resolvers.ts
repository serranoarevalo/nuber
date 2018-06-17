import Chat from "../../../entities/Chat";
import Message from "../../../entities/Message";
import User from "../../../entities/User";
import { SendMessageResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { authMiddleware, makeMiddleware } from "../../../utils/middlewares";

interface IArgs {
  message: string;
}

const resolvers: Resolvers = {
  Mutation: {
    sendMessage: makeMiddleware(
      authMiddleware,
      async (_, args: IArgs, { req }): Promise<SendMessageResponse> => {
        const user: User = req.user;
        const { message } = args;
        const chat = await Chat.findOne(user.chatId);
        if (chat) {
          const newMessage = await Message.create({
            message,
            chat,
            user
          }).save();
          return {
            ok: true,
            error: null,
            message: newMessage
          };
        }
        return {
          ok: false,
          message: null,
          error: "Cant find chat to add message to"
        };
      }
    )
  }
};

export default resolvers;
