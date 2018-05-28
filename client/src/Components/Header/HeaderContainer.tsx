import React from "react";
import HeaderPresenter from "./HeaderPresenter";

interface IProps {
  backTo: string;
  title: string;
}

interface IState {
  scrollHeight: number;
}

class HeaderContainer extends React.Component<IProps, IState> {
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
    const { title, backTo } = this.props;
    return (
      <HeaderPresenter
        scrollHeight={scrollHeight}
        title={title}
        backTo={backTo}
      />
    );
  }
  private handleScroll = event => {
    const { target } = event;
    console.log(target.scrollTop);
    this.setState({
      scrollHeight: target.scrollTop
    });
  };
}

export default HeaderContainer;
