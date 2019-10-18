import React, { RefForwardingComponent, useImperativeHandle, forwardRef } from 'react';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/AddOutlined';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import useForm from 'react-hook-form';
import { makeStyles } from '@material-ui/core';

import FormProps from '../models/FormProps';

const createTodoFormErrors = {
  title: {
    required: 'New todo must have a title'
  }
}

const useStyles = makeStyles({
  formGroup: {
    flexWrap: 'nowrap'
  }
});

export interface CreateTodoFormData {
  title: string;
}

export interface CreateTodoFormRef {
  reset: Function;
}

interface CreateTodoFormProps extends FormProps<CreateTodoFormData> {
  loading: boolean;
  error?: string;
}

const CreateTodoForm: RefForwardingComponent<CreateTodoFormRef, CreateTodoFormProps> = function({ onSubmit, loading, error: globalError }, ref) {
  const { register, handleSubmit, errors, reset } = useForm();
  const classes = useStyles({});
  useImperativeHandle(ref, () => ({
    reset: () => {
      reset();
    }
  }));
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup row className={classes.formGroup}>
        <TextField
          name='title'
          placeholder="Add todo..."
          style={{flexGrow: 1}}
          margin="dense"
          autoComplete="off"
          variant="outlined"
          inputRef={register({ required: createTodoFormErrors.title.required })}
          helperText={
            (errors.title && errors.title.message) ||
            (!!globalError && globalError)
          }
          error={!!errors.password || !!globalError}
        ></TextField>
        <Box marginLeft="5px">
          <IconButton
            type="submit"
            disabled={loading}
          >
            {loading ? <CircularProgress size={35} color="inherit" /> : <AddIcon fontSize="large" color="primary" />}
          </IconButton>
        </Box>
      </FormGroup>
    </form>
  )
}

export default forwardRef(CreateTodoForm);