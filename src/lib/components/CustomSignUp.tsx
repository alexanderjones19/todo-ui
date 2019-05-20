import React, { Component } from "react";
import { SignUp } from "aws-amplify-react";
import { Auth } from 'aws-amplify';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { WithStyles, createStyles, withStyles } from '@material-ui/core/';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

const styles = (theme: Theme) => createStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.default,
  }
});

type CustomSignUpProps = {
  // handleInputChange?: Function | undefined,
  // changeState?: Function | undefined,
  override: string
};

class CustomSignUp extends Component<any> {
  _validAuthStates = ['signIn', 'signedOut', 'signedUp'];
  inputs: {[key: string]: string}= {};
  constructor(props: any) {
    super(props);
  }

  async signUp(event: any) {
    // console.log(event);
    // console.log(this.inputs);
    event.preventDefault();
    let email = this.inputs['email'];
    let password = this.inputs['password'];
    const user = await Auth.signUp({
      username: email,
      // email,
      password
    });
    // console.log(user);
    return;
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
          {/* <div>
            <label
              htmlFor='email'
            >
              Email
            </label>
            <input
              id='email'
              key='email'
              name='email'
              onChange={this.props.handleInputChange}
              type='email'
              placeholder='Email'
            />
          </div> */}
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
          {/* <div>
            <label
              htmlFor='password'
            >
              Password
            </label>
            <input
              id='password'
              key='password'
              name='password'
              onChange={this.props.handleInputChange}
              type='password'
              placeholder='******************'
            />
          </div> */}
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
          <div>
            <Button
              type='submit'
              onClick={(event) => this.signUp(event)}
            >
              Sign Up
            </Button>
            <p>
              Already Have An Account?{" "}
              <a
                onClick={() => this.props.onStateChange('signIn',{})}
              >
                Sign In
              </a>
            </p>
          </div>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(CustomSignUp as any);