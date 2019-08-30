import React, { FC } from 'react';
import useForm from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { FormControl } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

import FormProps from '../models/FormProps';

const signInFormErrors = {
  email: {
    required: 'Email is required'
  },
  password: {
    required: 'Password is required'
  }
};

interface SignInFormData {
  email?: string;
  password?: string;
}

interface SignInFormProps extends FormProps<SignInFormData> {
  loading: boolean;
};

const SignInForm: FC<SignInFormProps> = ({ onSubmit, loading }) => {
  const { register, handleSubmit, errors } = useForm();
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        id='email'
        label='Email'
        key='email'
        name='email'
        inputRef={register({ required: signInFormErrors.email.required })}
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
        inputRef={register({ required: signInFormErrors.password.required })}
        type='password'
        placeholder='******************'
        variant='filled'
        fullWidth
        margin="dense"
        helperText={errors.password && errors.password.message}
        error={!!errors.password}
      />
      <FormControl
        fullWidth
        margin="dense"
      >
        <Button
          type='submit'
          fullWidth
          variant="contained"
          size="large"
          color="primary"
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In' }
        </Button>
      </FormControl>
    </form>
  );
}

export default SignInForm;