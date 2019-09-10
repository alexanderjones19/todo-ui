import React from 'react';
import Router from 'next/router';
import { useMutation } from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import Layout from './_layout';
import SignInForm from '../src/forms/SignInForm';
import SignUpForm, { SignUpFormData } from '../src/forms/SignUpForm';
import { SIGN_IN, SignInMutation, SignInMutationVariables } from '../src/mutations/signInMutation';
import { SIGN_UP, SignUpMutation, SignUpMutationVariables } from '../src/mutations/signUpMutation';
import useAuthGuard from '../src/hooks/data/useAuthGuard';
import useLoadingState from '../src/hooks/useLoadingState';
import useErrorState from '../src/hooks/useErrorState';

const useStyles = makeStyles({
  container: {
    marginTop: '25px'
  }
});

const IndexPage = () => {
  const classes = useStyles({});
  const { userLoading } = useAuthGuard('/todo', null);
  const {
    trackLoading,
    isLoading
  } = useLoadingState();
  const {
    trackError,
    getError
  } = useErrorState();

  const [
    signIn,
    {
      error: signInError,
      loading: signInLoading
    }
  ] = useMutation<SignInMutation, SignInMutationVariables>(
    SIGN_IN,
    {
      onCompleted: () => Router.push('/todo')
    }
  );

  const [
    signUp,
    {
      error: signUpError,
      loading: signUpLoading 
    }
  ] = useMutation<SignUpMutation, SignUpMutationVariables>(SIGN_UP);

  if (userLoading) {
    return null;
  }

  async function onSignUp(data: SignUpFormData) {
    await signUp({ 
      variables: { 
        email: data.email, 
        password: data.password 
      }
    });
    return await signIn({
      variables: {
        email: data.email,
        password: data.password
      }
    });
  }

  return (
    <Layout>
      <Container className={classes.container} maxWidth="sm">
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
              loading={signUpLoading || isLoading('signUp')}
              error={
                signUpError && signUpError.message ||
                (getError('signUp') && getError('signUp') as string)
              }
              onSubmit={(data) => {
                trackError(
                  trackLoading(onSignUp(data), 'signUp'),
                  'signUp',
                  'Something went wrong, please try again later'
                );
              }}
            />
          </CardContent>
        </Card>
      </Container>
      <Container className={classes.container} maxWidth="sm">
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
              loading={signInLoading && !isLoading('signUp')}
              error={(signInError && !getError('signUp')) && signInError.message }
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
    </Layout>
  );
}

export default IndexPage;