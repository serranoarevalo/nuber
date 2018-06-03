import React from "react";
import { Query } from "react-apollo";
import SettingsPresenter from "./SettingsPresenter";
import { ME } from "./SettingsQuery";

class SettingsContainer extends React.Component {
  render() {
    return (
      <Query query={ME}>
        {({ loading, error, data }) => (
          <SettingsPresenter loading={loading} data={data} />
        )}
      </Query>
    );
  }
}

export default SettingsContainer;
