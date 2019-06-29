import React from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';

import ToggleButton from '../src/modules/toggle/ToggleButton';
import SignInForm from '../src/forms/SignInForm';
import SignUpForm from '../src/forms/SignUpForm';
import { GET_BUTTON_TOGGLE } from '../src/queries/buttonToggle';
import { TOGGLE_BUTTON } from '../src/mutations/toggleButtonMutation';
import { SIGN_IN, SignInMutation, SignInMutationVariables } from '../src/mutations/signInMutation';
import { SIGN_UP, SignUpMutation, SignUpMutationVariables } from '../src/mutations/signUpMutation';

const IndexPage = () => {
  const { loading, data } = useQuery(GET_BUTTON_TOGGLE);
  const [toggleButton, { error: toggleError }] = useMutation(TOGGLE_BUTTON);
  const [signIn, { error: signInError }] = useMutation<SignInMutation, SignInMutationVariables>(SIGN_IN);
  const [signUp, { error: signUpError }] = useMutation<SignUpMutation, SignUpMutationVariables>(SIGN_UP);
  return (
    <React.Fragment>
      <ToggleButton buttonToggle={data.buttonToggle} toggleButton={toggleButton} />
      <SignInForm onSubmit={(data) => {signIn({ variables: { email: data.email, password: data.password }})}} />
      <SignUpForm onSubmit={(data) => {signUp({ variables: { email: data.email, password: data.password }})}} />
    </React.Fragment>
  );
}

export default IndexPage;