import React, { Component } from 'react';
import Amplify, { Auth } from 'aws-amplify';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme';

import AuthComponent from './lib/components/Auth';
import SignInForm from './lib/forms/SignInForm';
import SignUpForm from './lib/forms/SignUpForm';
import TodoContainer from './todo/TodoContainer';
import AwsConfig from './aws.config';
import client from './client';
import FormData from './lib/models/FormData';
import './App.css';

Amplify.configure(AwsConfig);

class App extends Component {

  testSubmit(event: React.FormEvent<HTMLElement>, data: FormData) {
    event.preventDefault();
    console.log('test submit', event)
    console.log('data', data);
  }

  render() {
    return (
      <ApolloProvider client={client as any}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          {/* <Router> */}
            <AuthComponent />
            <SignInForm onSubmit={this.testSubmit} />
            <SignUpForm onSubmit={this.testSubmit} />
            <TodoContainer />
            <button onClick={() => Auth.signOut()}>Sign Out</button>
            {/* <Route path="/login" component={SignInForm} /> */}
          {/* </Router> */}
        </MuiThemeProvider>
      </ApolloProvider>
    );
  }
}

export default App;