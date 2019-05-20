import React, { Component } from 'react';
import { Authenticator, ForgotPassword } from 'aws-amplify-react'; // or 'aws-amplify-react-native';
import Amplify from 'aws-amplify';
import { ApolloProvider } from 'react-apollo';

import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme';

import CustomSignUp from './lib/components/CustomSignUp';
import CustomSignIn from './lib/components/CustomSignIn';
import TodoContainer from './todo/TodoContainer';
import AwsConfig from './aws.config';
import client from './api-client';
import './App.css';

Amplify.configure(AwsConfig);

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client as any}>
        <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Authenticator hideDefault={true}>
          <CustomSignIn override={'SignIn'}/>
          <CustomSignUp override={'SignUp'}/>
          <ForgotPassword/>
          <TodoContainer />
        </Authenticator>
        </MuiThemeProvider>
      </ApolloProvider>
    );
  }
}

export default App;