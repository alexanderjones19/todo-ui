import React, { FC, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/AddOutlined';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import useForm from 'react-hook-form';

import FormProps from '../models/FormProps';

const createTodoFormErrors = {
  title: {
    required: 'New todo must have a title'
  }
}

interface CreateTodoFormData {
  title: string;
}

interface CreateTodoFormProps extends FormProps<CreateTodoFormData> {
  loading: boolean;
  error?: string;
}

const CreateTodoForm: FC<CreateTodoFormProps> = function({ onSubmit, loading, error: globalError }) {
  const { register, handleSubmit, errors, reset } = useForm();
  useEffect(() => {
    if (!loading && !globalError) {
      reset();
    }
  }, [loading, globalError]);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup row>
        <TextField
          name='title'
          style={{flexGrow: 1}}
          inputRef={register({ required: createTodoFormErrors.title.required })}
          helperText={
            (errors.title && errors.title.message) ||
            (!!globalError && globalError)
          }
          error={!!errors.password || !!globalError}
        ></TextField>
        <IconButton
          type="submit"
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : <AddIcon color="primary" />}
        </IconButton>
      </FormGroup>
    </form>
  )
}

export default CreateTodoForm;