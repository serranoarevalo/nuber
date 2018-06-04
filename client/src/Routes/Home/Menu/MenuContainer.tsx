import React from "react";
import { Query } from "react-apollo";
import { withRouter } from "react-router-dom";
import MenuPresenter from "./MenuPresenter";
import { ME } from "./MenuQueries";

class MenuContainer extends React.Component<any, any> {
  render() {
    return (
      <Query query={ME}>
        {({ loading, error, data }) => {
          if (data.me) {
            this.checkPhone(data);
          }
          return <MenuPresenter loading={loading} data={data} />;
        }}
      </Query>
    );
  }
  private checkPhone = data => {
    const {
      me: { user }
    } = data;
    const { history } = this.props;
    if (!user.verifiedPhoneNumber) {
      history.push("/add-phone");
    }
  };
}

export default withRouter(MenuContainer);
