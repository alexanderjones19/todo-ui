import React from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';


import ToggleContainer from '../src/modules/toggle/ToggleContainer';
import ToggleButton from '../src/modules/toggle/ToggleButton';
import FormComponent from 'src/components/FormComponent';
import SignInContainer from '../src/modules/auth/SignInContainer';
import SignInForm from '../src/forms/SignInForm';
// import SignUpContainer from '../src/modules/auth/SignUpContainer';
// import SignUpForm from '../src/forms/SignUpForm';
import { GET_BUTTON_TOGGLE } from '../src/queries/buttonToggle';
import { TOGGLE_BUTTON } from '../src/mutations/toggleButtonMutation';

const IndexPage = () => {
  const { loading, data } = useQuery(GET_BUTTON_TOGGLE);
  const [toggleButton, { error }] = useMutation(TOGGLE_BUTTON);
  return (
    <React.Fragment>
      {/* <ToggleContainer> */}
        {/* {({buttonToggleQuery, toggleButton}) => ( */}
          <ToggleButton buttonToggle={data.buttonToggle} toggleButton={toggleButton} />
        {/* )} */}
      {/* </ToggleContainer> */}
      {/* <SignInContainer>
        {({signIn}) => (
          <SignInForm onSubmit={(event, formData) => signIn({ variables: { email: formData.email, password: formData.password } })} />
        )}
      </SignInContainer> */}
      {/* <SignUpContainer>
        {({signUp}) => (
          <SignUpForm onSubmit={(event, formData) => signUp({ variables: { email: formData.email, password: formData.password } })} />
        )}
      </SignUpContainer> */}
    </React.Fragment>
  );
}

export default IndexPage;