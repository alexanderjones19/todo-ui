import React from 'react';
import Router from 'next/router';
import { useMutation } from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import Layout from './_layout';
import SignInForm from '../src/forms/SignInForm';
import SignUpForm from '../src/forms/SignUpForm';
import { SIGN_IN, SignInMutation, SignInMutationVariables } from '../src/mutations/signInMutation';
import { SIGN_UP, SignUpMutation, SignUpMutationVariables } from '../src/mutations/signUpMutation';
import useAuthGuard from '../src/hooks/data/useAuthGuard';

const useStyles = makeStyles({
  container: {
    marginTop: '25px'
  }
});

const IndexPage = () => {
  const classes = useStyles();
  const { userLoading } = useAuthGuard('/todo', null);

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
              loading={signUpLoading}
              onSubmit={(data) => {signUp({ 
                variables: { 
                  email: data.email, 
                  password: data.password 
                },
                async update(cache) {
                  await signIn({
                    variables: {
                      email: data.email,
                      password: data.password
                    }
                  })
                }
              })}}
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
              loading={signInLoading}
              error={signInError && signInError.message}
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