import PropTypes from "prop-types";
import React from "react";
import { withRouter } from "react-router-dom";
import HeaderPresenter from "./HeaderPresenter";

interface IProps {
  backTo: string;
  title: string;
  history?: any | undefined;
  goBack?: boolean | undefined;
}

interface IState {
  scrollHeight: number;
}

class HeaderContainer extends React.Component<IProps, IState> {
  static propTypes = {
    backTo: PropTypes.string,
    title: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      scrollHeight: 0
    };
  }
  public componentDidMount() {
    const shouldScroll = document.querySelector(".shouldScroll");
    if (shouldScroll) {
      shouldScroll.addEventListener("scroll", this.handleScroll);
    }
  }

  render() {
    const { scrollHeight } = this.state;
    const { title, backTo, goBack } = this.props;
    return (
      <HeaderPresenter
        scrollHeight={scrollHeight}
        title={title}
        backTo={backTo}
        goBackFn={this.goBack}
        goBack={goBack}
      />
    );
  }
  private handleScroll = event => {
    const { target } = event;
    this.setState({
      scrollHeight: target.scrollTop
    });
  };
  private goBack = () => {
    const { history } = this.props;
    history.back();
  };
}

export default withRouter(HeaderContainer) as typeof HeaderContainer;
