import { withFilter } from "graphql-yoga";
import User from "../../../entities/User";

const resolvers = {
  Subscription: {
    newMessage: {
      subscribe: withFilter(
        (_, __, { pubsub }) => pubsub.asyncIterator("newChatMessage"),
        (payload, __, { rawReq }) => {
          const user: User = rawReq.connection.context.currentUser;
          const message = payload.newMessage;

          const { chatId: userChat } = user;

          const { chatId: messageChat } = message;

          return userChat === messageChat;
        }
      )
    }
  }
};

export default resolvers;
