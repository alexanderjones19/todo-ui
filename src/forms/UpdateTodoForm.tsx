import React, { FC, useEffect } from 'react';
import Input from '@material-ui/core/Input';
import SaveIcon from '@material-ui/icons/Save';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import useForm from 'react-hook-form';

import FormProps from '../models/FormProps';
import Switch from '../components/Switch';

const updateTodoFormErrors = {
  title: {
    required: 'Must enter a title'
  }
}

interface UpdateTodoFormData {
  title: string;
}

interface UpdateTodoFormProps extends FormProps<UpdateTodoFormData> {
  defaultValue: string;
  loading: boolean;
  error?: string;
}

const UpdateTodoForm: FC<UpdateTodoFormProps & React.HTMLAttributes<HTMLFormElement>> = function(
  {
    onSubmit,
    loading,
    error: globalError,
    style,
    defaultValue
  }) {
  const { register, handleSubmit, errors, reset, formState, triggerValidation } = useForm();
  useEffect(() => {
    if (!loading && !globalError) {
      reset();
    }
  }, [loading, globalError]);
  useEffect(() => {
    triggerValidation();
  }, [])
  return (
    <form onSubmit={handleSubmit(onSubmit)} style={style}>
      <FormGroup row>
        <Input
          name='title'
          style={{flexGrow: 1}}
          defaultValue={defaultValue}
          margin="dense"
          autoComplete="off"
          autoFocus
          onChange={() => triggerValidation()}
          inputRef={register({
            required: updateTodoFormErrors.title.required,
            validate: (value) => (value !== defaultValue ? true : '')
          })}
          error={!!errors.password || !!globalError}
          endAdornment={
            <Switch
              case={formState.isValid}
              mountOnEnter={false}
              unmountOnExit={false}
              view={<IconButton
                type="submit"
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : <SaveIcon color="primary" />}
              </IconButton>}
              default={null}
            />}
        ></Input>
      </FormGroup>
    </form>
  )
}

export default UpdateTodoForm;