import React, { Component } from 'react';
import { Mutation } from 'react-apollo';

import SignInForm from '../lib/forms/SignInForm';
import { SignInMutation, SIGN_IN } from '../lib/mutations/signInMutation';

class SignInContainer extends Component {
  render() {
    return (
      <Mutation<SignInMutation> mutation={SIGN_IN}>
        {(signIn, { data, loading, error }) => {
          return (
            <SignInForm onSubmit={(e, data) => {
              signIn({ variables: { email: data.email, password: data.password } });
            }}/>
          )}
        }
      </Mutation>
    );
  }
}

export default SignInContainer;