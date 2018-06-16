import React from "react";
import { MutationFn } from "react-apollo";
import ChatPresenter from "./ChatPresenter";

interface IProps {
  location: any;
  history: any;
  UpdateRideMutation: MutationFn;
}

class ChatContainer extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
    if (!props.location.state) {
      props.history.push("/");
    }
  }
  render() {
    return <ChatPresenter />;
  }
}

export default ChatContainer;
