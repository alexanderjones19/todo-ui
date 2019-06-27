import React, { FC } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { WithStyles, createStyles, withStyles } from '@material-ui/core/';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

import FormProps from '../models/FormProps';
import useForm from '../hooks/useForm';

// const styles = (theme: Theme) => createStyles({
//   root: {
//     display: 'flex',
//     flexDirection: 'column',
//     backgroundColor: theme.palette.background.default,
//   }
// });

interface SignInFormData {
  email?: string;
  password?: string;
}

interface SignInFormProps extends FormProps<SignInFormData> {

};

const SignInForm: FC<SignInFormProps> = ({ onSubmit }) => {
  // const { classes } = this.props;
  const {data, handleInputChange, handleSubmit} = useForm<SignInFormData>(onSubmit);
  return (
    // <div className={classes.root}>
      <form onSubmit={handleSubmit}>
        {/* consider these divs */}
        <div>
          <TextField
            id='email'
            label='Email'
            key='email'
            name='email'
            onChange={handleInputChange}
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
            onChange={handleInputChange}
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
    // </div>
  );
}

export default SignInForm;