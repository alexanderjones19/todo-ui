import React, { Component, Fragment } from 'react';
import logo from './logo.svg';
import { Authenticator, withAuthenticator, SignIn, ForgotPassword, SignUp } from 'aws-amplify-react'; // or 'aws-amplify-react-native';
import Amplify from 'aws-amplify';

import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme';

import CustomSignUp from './lib/components/CustomSignUp';
import CustomSignIn from './lib/components/CustomSignIn';
import TodoContainer from './todo/TodoContainer';
import AwsConfig from './aws.config';
import './App.css';

Amplify.configure(AwsConfig);

// const signUpConfig = {
//   header: 'test header',
//   signUpFields: [
//     {
//       label: 'Username',
//       key: 'username',
//       required: false,
//       displayOrder: 3,
//       type: 'text'
//     },
//     {
//       label: 'Email',
//       key: 'email',
//       required: true,
//       displayOrder: 1,
//       type: 'email'
//     },
//     {
//       label: 'Password',
//       key: 'password',
//       required: true,
//       displayOrder: 2,
//       type: 'password'
//     }
//   ],
//   hiddenDefaults: ['username', 'phone_number']
// };

class App extends Component {
  render() {
    return (
      <Fragment>
        <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Authenticator hideDefault={true}>
          <CustomSignIn override={'SignIn'}/>
          <CustomSignUp override={'SignUp'}/>
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
        </MuiThemeProvider>
      </Fragment>
    );
  }
}

export default App;
// export default withAuthenticator(App, { signUpConfig });
