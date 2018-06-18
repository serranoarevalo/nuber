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
            {({ data }) => {
              if (data && data.getPlaces) {
                const {
                  getPlaces: { places = {} } = {},
                  me: { user = {} } = {}
                } = data;

                return (
                  <SettingsPresenter
                    logUserOut={logUserOut}
                    loading={false}
                    data={{ places, user }}
                  />
                );
              }
              return (
                <SettingsPresenter
                  logUserOut={logUserOut}
                  loading={true}
                  data={null}
                />
              );
            }}
          </Query>
        )}
      </Mutation>
    );
  }
}

export default SettingsContainer;
