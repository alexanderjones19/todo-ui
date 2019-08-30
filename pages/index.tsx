import React from 'react';
import Router from 'next/router';
import { useMutation, useQuery } from '@apollo/react-hooks';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import SignInForm from '../src/forms/SignInForm';
import SignUpForm from '../src/forms/SignUpForm';
import { GET_CURRENT_USER } from '../src/queries/getCurrentUser';
import { TOGGLE_BUTTON } from '../src/mutations/toggleButtonMutation';
import { SIGN_IN, SignInMutation, SignInMutationVariables } from '../src/mutations/signInMutation';
import { SIGN_UP, SignUpMutation, SignUpMutationVariables } from '../src/mutations/signUpMutation';

const IndexPage = () => {
  const { 
    loading: userLoading,
    data: userData,
    error: userError
  } = useQuery(GET_CURRENT_USER);

  const [
    signIn,
    {
      error: signInError,
      loading: signInLoading
    }
  ] = useMutation<SignInMutation, SignInMutationVariables>(SIGN_IN, {
    onCompleted: () => { console.log("sign in success"); Router.push('/todo') }
  });

  const [
    signUp,
    {
      error: signUpError,
      loading: signUpLoading 
    }
  ] = useMutation<SignUpMutation, SignUpMutationVariables>(SIGN_UP, {
    onCompleted: () => Router.push('/todo')
  });

  if (userError && !userLoading) {
    console.log('unauthenticated');
  } else if (userData && !userLoading) {
    console.log("userData", userData);
    console.log('authenticated');
    Router.push('/todo');
  }

  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      height="100%"
    >
      <Container maxWidth="sm">
        <Card>
          <CardContent>
            <Typography 
              variant="h4"
              align="center"
              gutterBottom
            >
              Sign Up
            </Typography>
            <SignUpForm
              loading={signUpLoading}
              onSubmit={(data) => {signUp({ 
                variables: { 
                  email: data.email, 
                  password: data.password 
                }
              })}}
            />
          </CardContent>
        </Card>
      </Container>
      <Container maxWidth="sm">
        <Card>
          <CardContent>
            <Typography 
              variant="h4"
              align="center"
              gutterBottom
            >
              Sign In
            </Typography>
            <SignInForm
              loading={signInLoading}
              onSubmit={(data) => {signIn({ 
                variables: { 
                  email: data.email, 
                  password: data.password 
                }
              })}}
            />
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default IndexPage;