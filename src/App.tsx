import React, { Component } from 'react';
import Amplify, { Auth } from 'aws-amplify';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme';

import AuthComponent from './lib/components/Auth';
import SignInContainer from './signin/SignInContainer';
import SignUpContainer from './signup/SignUpContainer';
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
          {/* <Router> */}
            <AuthComponent />
            <SignInContainer />
            <SignUpContainer />
            <TodoContainer />
            <button onClick={() => Auth.signOut()}>Sign Out</button>
          {/* </Router> */}
        </MuiThemeProvider>
      </ApolloProvider>
    );
  }
}

export default App;