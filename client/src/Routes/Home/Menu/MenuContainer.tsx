import React from "react";
import { Query } from "react-apollo";
import MenuPresenter from "./MenuPresenter";
import { ME } from "./MenuQueries";

class MenuContainer extends React.Component {
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

export default MenuContainer;
