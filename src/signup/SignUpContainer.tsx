import React, { Component } from 'react';
import { Mutation } from 'react-apollo';

import SignUpForm from '../lib/forms/SignUpForm';
import { SignUpMutation, SIGN_UP } from '../lib/mutations/signUpMutation';

class SignUpContainer extends Component {
  render() {
    return (
      <Mutation<SignUpMutation> mutation={SIGN_UP}>
        {(signUp, { data, loading, error }) => {
          return (
            <SignUpForm onSubmit={(e, data) => {
              signUp({ variables: { email: data.email, password: data.password } });
            }}/>
          )}
        }
      </Mutation>
    );
  }
}

export default SignUpContainer;