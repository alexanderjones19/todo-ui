import React, { Component } from 'react';
import Amplify, { Auth } from 'aws-amplify';
import { ApolloProvider } from 'react-apollo';

import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme';

import AuthComponent from './lib/components/Auth';
import CustomSignUp from './lib/components/CustomSignUp';
import CustomSignIn from './lib/components/CustomSignIn';
import TodoContainer from './todo/TodoContainer';
import AwsConfig from './aws.config';
import client from './client';
import './App.css';

Amplify.configure(AwsConfig);

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client as any}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <AuthComponent />
          <CustomSignIn />
          <TodoContainer />
          <button onClick={() => Auth.signOut()}>Sign Out</button>
        </MuiThemeProvider>
      </ApolloProvider>
    );
  }
}

export default App;