import gql from "graphql-tag";

export const GET_CHAT = gql`
  query getChat($rideId: Int!) {
    getChat(rideId: $rideId) {
      ok
      error
      chat {
        messages {
          id
          message
          userId
        }
      }
    }
  }
`;

export const NEW_MESSAGE_SUBSCRIPTION = gql`
  subscription newMessage {
    newMessage {
      id
      message
      userId
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation sendMessage($message: String!) {
    sendMessage(message: $message) {
      ok
      error
    }
  }
`;
