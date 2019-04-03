import React, { Component } from 'react';
import logo from './logo.svg';
import { Authenticator, withAuthenticator, SignIn, ForgotPassword, SignUp } from 'aws-amplify-react'; // or 'aws-amplify-react-native';
import Amplify from 'aws-amplify';

import CustomSignIn from './lib/components/CustomSignIn';
import TodoContainer from './todo/TodoContainer';
import AwsConfig from './aws.config';
import './App.css';

Amplify.configure(AwsConfig);

const signUpConfig = {
  signUpFields: [
    {
      label: 'Email',
      key: 'email',
      required: true,
      displayOrder: 1,
      type: 'email'
    },
    {
      label: 'Password',
      key: 'password',
      required: true,
      displayOrder: 2,
      type: 'password'
    }
  ],
  hiddenDefaults: ['username', 'phone_number']
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <Authenticator hideDefault={true} signUpConfig={signUpConfig}>
          <CustomSignIn override={'SignIn'}/>
          <SignUp/>
          <ForgotPassword/>
          <TodoContainer>

          </TodoContainer>
          {/* <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header> */}
        </Authenticator>
      </div>
    );
  }
}

export default App;
// export default withAuthenticator(App, { signUpConfig });
