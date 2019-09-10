import React, { FC } from 'react';
import { CSSTransitionGroup } from 'react-transition-group'
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  enter: {
    opacity: 0.01
  },
  enterActive: {
    opacity: 1,
    transition: theme.transitions.create(
      ['opacity'],
      { duration: theme.transitions.duration.enteringScreen }
    )
  },
  leave: {
    opacity: 1
  },
  leaveActive: {
    opacity: 0.01,
    transition: theme.transitions.create(
      ['opacity'],
      { duration: theme.transitions.duration.leavingScreen }
    )
  },
  appear: {

  },
  appearActive: {

  }
}))

interface ListTransitionProps {

}

const ListTransition: FC<ListTransitionProps> = function({
  children
}) {
  const classes = useStyles({});
  return (
    <CSSTransitionGroup 
      transitionName={{
        enter: classes.enter,
        enterActive: classes.enterActive,
        leave: classes.leave,
        leaveActive: classes.leaveActive
      }}
      transitionEnterTimeout={500}
      transitionLeaveTimeout={300}>
        { children }
    </CSSTransitionGroup>
  )
}

export default ListTransition;