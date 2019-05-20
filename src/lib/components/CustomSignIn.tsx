import React, { Component } from "react";
import { SignIn } from "aws-amplify-react";
import { Auth } from 'aws-amplify';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { WithStyles, createStyles, withStyles } from '@material-ui/core/';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
// import classes from "*.module.scss";

const styles = (theme: Theme) => createStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.default,
  }
});

type CustomSignInProps = {
  // handleInputChange?: Function | undefined,
  // changeState?: Function | undefined,
  override: string
};

class CustomSignIn extends Component<any> {
// export default class CustomSignIn extends SignIn<CustomSignInProps> {
  _validAuthStates = ['signIn', 'signedOut', 'signedUp'];
  inputs: {[key: string]: string}= {};
  constructor(props: any) {
    super(props);
    // this._validAuthStates = ['signIn', 'signedOut', 'signedUp'];
  }

  async signIn(event: any) {
    // console.log(event);
    // console.log(this.inputs);
    // avoid submitting the form
    event.preventDefault();
    let email = this.inputs['email'];
    let password = this.inputs['password'];
    const user = await Auth.signIn({
        username: email,
        password
    });
    // console.log(user);
    return;
    
    // const { username='', password } = this.inputs;
  }

  onInputChange(event: any) {
    // console.log(event.target);
    // console.log(event.target.name)
    // console.log(event)
    this.inputs[event.target.name] = event.target.value;
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <form>
          <div>
            {/* <label
              htmlFor='email'
            >
              Email
            </label> */}
            <TextField
              id='email'
              label="Email"
              key='email'
              name='email'
              onChange={this.onInputChange.bind(this)}
              type='email'
              placeholder='Email'
              variant="filled"
            />
          </div>
          <div>
            {/* <label
              htmlFor='password'
            >
              Password
            </label> */}
            <TextField
              id='password'
              label="Password"
              key='password'
              name='password'
              onChange={this.onInputChange.bind(this)}
              type='password'
              placeholder='******************'
              variant="filled"
            />
            <p>
              Forgot your password?{" "}
              <a
                onClick={() => this.props.onStateChange('forgotPassword',{})}
              >
                Reset Password
              </a>
            </p>
          </div>
          <div>
            <Button
              type='submit'
              onClick={(event) => this.signIn(event)}
            >
              Login
            </Button>
            <p>
              No Account?{" "}
              <a
                onClick={() => this.props.onStateChange('signUp',{})}
              >
                Create Account
              </a>
            </p>
          </div>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(CustomSignIn as any);