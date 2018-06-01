import React from "react";
import HomePresenter from "./HomePresenter";

interface IState {
  isMenuOpen: boolean;
}

class HomeContainer extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isMenuOpen: false
    };
  }

  render() {
    const { isMenuOpen } = this.state;
    return (
      <HomePresenter
        isMenuOpen={isMenuOpen}
        openMenu={this.openMenu}
        closeMenu={this.closeMenu}
      />
    );
  }
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

export default HomeContainer;
