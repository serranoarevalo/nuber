import React from "react";
import { graphql } from "react-apollo";
import HomePresenter from "./HomePresenter";
import { ME } from "./HomeQueries";

interface IState {
  isMenuOpen: boolean;
  verifiedPhoneNumber: boolean;
}

class HomeContainer extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isMenuOpen: false,
      verifiedPhoneNumber: true
    };
  }
  componentWillReceiveProps(nextProps) {
    const { data } = nextProps;
    if (data) {
      const { me: { user: { verifiedPhoneNumber = false } = {} } = {} } = data;
      this.setState({
        verifiedPhoneNumber
      });
    }
  }
  render() {
    const { isMenuOpen, verifiedPhoneNumber } = this.state;
    return (
      <HomePresenter
        isMenuOpen={isMenuOpen}
        openMenu={this.openMenu}
        closeMenu={this.closeMenu}
        verifiedPhoneNumber={verifiedPhoneNumber}
        redirectToVerify={this.redirectToVerify}
      />
    );
  }

  private redirectToVerify = () => {
    const { history } = this.props;
    history.push("/add-phone");
  };

  private openMenu = () => {
    this.setState({
      isMenuOpen: true
    });
  };
  private closeMenu = () => {
    this.setState({
      isMenuOpen: false
    });
  };
}

export default graphql(ME)(HomeContainer);
