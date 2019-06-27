import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { WithStyles, createStyles, withStyles } from '@material-ui/core/';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

import FormProps from '../models/FormProps';

const styles = (theme: Theme) => createStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.default,
  }
});

interface SignUpFormData extends FormData {
  email?: string;
  password?: string;
  confirmPassword?: string;
}

interface SignUpFormState {
  inputs: SignUpFormData;
}

interface SignUpFormProps extends WithStyles<typeof styles>, FormProps<SignUpFormData> {

};

class SignUpForm extends FormComponent<SignUpFormProps, Readonly<SignUpFormState>, SignUpFormData> {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <form onSubmit={this.handleSubmit.bind(this)}>
          {/* consider these divs */}
          <div>
            <TextField
              id='email'
              label='Email'
              key='email'
              name='email'
              onChange={this.onInputChange.bind(this)}
              type='email'
              placeholder='Email'
              variant='filled'
            />
          </div>
          <div>
            <TextField
              id='password'
              label='Password'
              key='password'
              name='password'
              onChange={this.onInputChange.bind(this)}
              type='password'
              placeholder='******************'
              variant='filled'
            />
          </div>
          <div>
            <TextField
              id='confirm-password'
              label='Confirm Password'
              key='confirm-password'
              name='confirm-password'
              onChange={this.onInputChange.bind(this)}
              type='password'
              placeholder='******************'
              variant='filled'
            />
          </div>
          <div>
            <Button
              type='submit'
            >
              Sign Up
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(SignUpForm);