import React, { Component } from 'react';
import gql from 'graphql-tag';

import { Query, Mutation } from 'react-apollo';
import { GET_BUTTON_TOGGLE } from '../../client';

interface AuthProps {
  
}

type GetButtonToggleQuery = {
  buttonToggle: boolean
}

type ToggleButtonMutation = {
  toggleButton: Function
}

const TOGGLE_BUTTON = gql`
  mutation ToggleButton {
    toggleButton @client
  }
`;

class Auth extends Component<AuthProps> {
  render() {
    return (
      <Query<GetButtonToggleQuery> query={GET_BUTTON_TOGGLE}>
        {({ data, client }) => (
          <Mutation<ToggleButtonMutation> mutation={TOGGLE_BUTTON}>
            {(toggleButton) => (
              <button
                onClick={() => toggleButton()}
              >
                Toggle: {data!.buttonToggle.toString()}
              </button>
            )}
          </Mutation>
        )}
      </Query>
    );
  }
}

export default Auth;