import React, { FC } from 'react';
import useForm from 'react-hook-form';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import FormProps from '../models/FormProps';
import { matchingValidator } from './validators';

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
  loading: boolean;
};

const SignUpForm: FC<SignUpFormProps> = ({ onSubmit, loading }) => {
  const { register, handleSubmit, errors, watch } = useForm<SignUpFormData>();
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        id='email'
        label='Email'
        key='email'
        name='email'
        inputRef={register({ required: signUpFormErrors.email.required })}
        type='email'
        placeholder='Email'
        variant='filled'
        fullWidth
        margin="dense"
        helperText={errors.email && errors.email.message}
        error={!!errors.email}
      />
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
        fullWidth
        margin="dense"
        helperText={errors.password && errors.password.message}
        error={!!errors.password}
      />
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
        fullWidth
        margin="dense"
        helperText={errors.confirmPassword && errors.confirmPassword.message}
        error={!!errors.confirmPassword}
      />
      <FormControl
        margin="dense"
        fullWidth
      >
        <Button
          type='submit'
          fullWidth
          variant="contained"
          size="large"
          color="primary"
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign Up' }
        </Button>
      </FormControl>
    </form>
  );
}

export default SignUpForm;