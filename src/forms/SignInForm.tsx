import React, { FC } from 'react';
import useForm from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

import FormProps from '../models/FormProps';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.default,
  }
}));

interface SignInFormData {
  email?: string;
  password?: string;
}

interface SignInFormProps extends FormProps<SignInFormData> {

};

const SignInForm: FC<SignInFormProps> = ({ onSubmit }) => {
  const classes = useStyles({});
  const { register, handleSubmit, errors } = useForm();
  return (
    // <div className={classes.root}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* consider these divs */}
        <div>
          <TextField
            id='email'
            label='Email'
            key='email'
            name='email'
            inputRef={register({ required: true })}
            type='email'
            placeholder='Email'
            variant='filled'
          />
          {errors.email && 'Email is required.'}
        </div>
        <div>
          <TextField
            id='password'
            label='Password'
            key='password'
            name='password'
            inputRef={register({ required: true })}
            type='password'
            placeholder='******************'
            variant='filled'
          />
          {errors.password && 'Password is required.'}
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