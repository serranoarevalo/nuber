import React from "react";
import { Mutation, Query } from "react-apollo";
import SettingsPresenter from "./SettingsPresenter";
import { ACCOUNT_QUERY, LOG_OUT } from "./SettingsQuery";

class SettingsContainer extends React.Component {
  render() {
    return (
      <Mutation mutation={LOG_OUT}>
        {logUserOut => (
          <Query query={ACCOUNT_QUERY}>
            {({ loading, error, data }) => (
              <SettingsPresenter
                logUserOut={logUserOut}
                loading={loading}
                data={data}
              />
            )}
          </Query>
        )}
      </Mutation>
    );
  }
}

export default SettingsContainer;
