import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  button: {
    fontSize: '3em'
  }
}));

interface ToggleButtonProps {
  buttonToggle: boolean;
  toggleButton: Function;
}

export default function ToggleButton(props: ToggleButtonProps) {
  const classes = useStyles({});

  return (
    <Button variant="contained" className={classes.button} onClick={() => props.toggleButton()}>{props.buttonToggle.toString()}</Button>
  );
}