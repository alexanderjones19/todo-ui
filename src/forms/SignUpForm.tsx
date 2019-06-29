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
  const passwordValue = watch('password');
  const confirmPasswordValue = watch('confirmPassword');
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
            inputRef={register({
              required: true,
              validate: matchingValidator(confirmPasswordValue)
            })}
            type='password'
            placeholder='******************'
            variant='filled'
          />
          {errors.password && 'Password is required.'}
        </div>
        <div>
          <TextField
            id='confirm-password'
            label='Confirm Password'
            key='confirmPassword'
            name='confirmPassword'
            inputRef={register({
              required: true,
              validate: matchingValidator(passwordValue)
            })}
            type='password'
            placeholder='******************'
            variant='filled'
          />
          {errors.confirmPassword && 'Password confirmation is required.'}
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