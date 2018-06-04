import React from "react";
import { Query } from "react-apollo";
import { withRouter } from "react-router-dom";
import MenuPresenter from "./MenuPresenter";
import { ME } from "./MenuQueries";

class MenuContainer extends React.Component<any, any> {
  render() {
    return (
      <Query query={ME}>
        {({ loading, error, data }) => (
          <MenuPresenter loading={loading} data={data} />
        )}
      </Query>
    );
  }
}

export default withRouter(MenuContainer);
