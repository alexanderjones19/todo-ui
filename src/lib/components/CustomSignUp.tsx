import React, { Component } from "react";
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

interface CustomSignUpProps extends WithStyles<typeof styles> {

};

class CustomSignUp extends Component<CustomSignUpProps> {
  inputs: {[key: string]: string}= {};
  
  async signUp() {
    let email = this.inputs['email'];
    let password = this.inputs['password'];
    const user = await Auth.signUp({
      username: email,
      password
    });
  }

  onInputChange(event: any) {
    this.inputs[event.target.name] = event.target.value;
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <form>
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
              onClick={() => this.signUp()}
            >
              Sign Up
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(CustomSignUp);