import React from "react";
import CompleteProfilePresenter from "./CompleteProfilePresenter";

interface IState {
  phone: string;
}

class CompleteProfileContainer extends React.Component<{}, IState> {
  constructor(props) {
    super(props);
    if (!props.location.state) {
      props.history.push("/");
    }
    const {
      location: { state }
    } = props;
    if (state) {
      this.state = {
        phone: state.phone
      };
    } else {
      this.state = {
        phone: ""
      };
    }
  }
  render() {
    return <CompleteProfilePresenter />;
  }
}
export default CompleteProfileContainer;
