import React, { FC } from 'react';
import useForm from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

import FormProps from '../models/FormProps';
import { matchingValidator } from './validators';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.default,
  }
}));

const signUpFormErrors = {
  email: {
    required: 'Email is required'
  },
  password: {
    required: 'Password is required'
  },
  confirmPassword: {
    required: 'Must confirm password',
    matching: 'Passwords must match'
  }
};

interface SignUpFormData {
  email?: string;
  password?: string;
  confirmPassword?: string;
}

interface SignUpFormProps extends FormProps<SignUpFormData> {

};

const SignUpForm: FC<SignUpFormProps> = ({ onSubmit }) => {
  const classes = useStyles({});
  const { register, handleSubmit, errors, watch } = useForm<SignUpFormData>();
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
            inputRef={register({ required: signUpFormErrors.email.required })}
            type='email'
            placeholder='Email'
            variant='filled'
            helperText={errors.email && errors.email.message}
            error={!!errors.email}
          />
        </div>
        <div>
          <TextField
            id='password'
            label='Password'
            key='password'
            name='password'
            inputRef={register({
              required: signUpFormErrors.password.required
            })}
            type='password'
            placeholder='******************'
            variant='filled'
            helperText={errors.password && errors.password.message}
            error={!!errors.password}
          />
        </div>
        <div>
          <TextField
            id='confirm-password'
            label='Confirm Password'
            key='confirmPassword'
            name='confirmPassword'
            inputRef={register({
              required: signUpFormErrors.confirmPassword.required,
              validate: matchingValidator('password', watch, signUpFormErrors.confirmPassword.matching)
            })}
            type='password'
            placeholder='******************'
            variant='filled'
            helperText={errors.confirmPassword && errors.confirmPassword.message}
            error={!!errors.confirmPassword}
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
    // </div>
  );
}

export default SignUpForm;