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

interface CustomSignInProps extends WithStyles<typeof styles> {
  
};

class CustomSignIn extends Component<CustomSignInProps> {
  inputs: {[key: string]: string}= {};
  
  async signIn(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault();
    let email = this.inputs['email'];
    let password = this.inputs['password'];
    const user = await Auth.signIn({
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
          <div>
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
          </div>
          <div>
            <Button
              type='submit'
              onClick={(event) => this.signIn(event!)}
            >
              Login
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(CustomSignIn);