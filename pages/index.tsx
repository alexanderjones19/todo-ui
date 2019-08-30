import React, { useEffect } from 'react';
import Router from 'next/router';
import { useMutation, useQuery } from '@apollo/react-hooks';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import Layout from './_layout';
import SignInForm from '../src/forms/SignInForm';
import SignUpForm from '../src/forms/SignUpForm';
import { GET_CURRENT_USER } from '../src/queries/getCurrentUser';
import { SIGN_IN, SignInMutation, SignInMutationVariables } from '../src/mutations/signInMutation';
import { SIGN_UP, SignUpMutation, SignUpMutationVariables } from '../src/mutations/signUpMutation';

const IndexPage = () => {
  
  const { 
    loading: userLoading,
    data: userData,
    error: userError,
    refetch: refetchUser
  } = useQuery(GET_CURRENT_USER);

  const [
    signIn,
    {
      error: signInError,
      loading: signInLoading
    }
  ] = useMutation<SignInMutation, SignInMutationVariables>(SIGN_IN, {
    onCompleted: () => Router.push('/todo')
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

  const checkForCurrentUser = () => {
    if (userError && !userLoading) {
      // unauthenticated
    } else if (userData.currentUser && !userLoading) {
      Router.push('/todo');
    }
  }

  const refetchCurrentUser = async () => {
    await refetchUser();
  }

  useEffect(() => {
    // checkForCurrentUser();
    refetchCurrentUser();
  }, []);

  useEffect(checkForCurrentUser, [userData]);

  return (
    <Layout>
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
    </Layout>
  );
}

export default IndexPage;