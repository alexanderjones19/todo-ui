import React from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { WithStyles, createStyles, withStyles } from '@material-ui/core/';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

import FormComponent from '../components/FormComponent';
import FormData from '../models/FormData';
import FormProps from '../models/FormProps';

const styles = (theme: Theme) => createStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.default,
  }
});

interface SignInFormData extends FormData {
  email?: string;
  password?: string;
}

interface SignInFormState {
  inputs: SignInFormData;
}

interface SignInFormProps extends WithStyles<typeof styles>, FormProps<SignInFormData> {

};

class SignInForm extends FormComponent<SignInFormProps, Readonly<SignInFormState>, SignInFormData> {
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
            <Button
              type='submit'
            >
              Login
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(SignInForm);