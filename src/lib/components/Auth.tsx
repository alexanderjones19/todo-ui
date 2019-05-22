import React, { Component } from 'react';

import { Query, Mutation } from 'react-apollo';
import { GET_BUTTON_TOGGLE } from '../../client';

interface AuthProps {
  
}

type GetButtonToggleQuery = {
  buttonToggle: boolean
}

class Auth extends Component<AuthProps> {
  render() {
    return (
      <Query<GetButtonToggleQuery> query={GET_BUTTON_TOGGLE}>
        {({ data, client }) => {
          return (
            <button
              onClick={() => client.writeData({ data: { buttonToggle: !data!.buttonToggle } })}
            >
              Toggle: {data!.buttonToggle.toString()}
            </button>
          )
        }}
      </Query>
    );
  }
}

export default Auth;