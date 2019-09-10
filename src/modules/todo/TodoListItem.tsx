import React, { FC, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import CircularProgress from '@material-ui/core/CircularProgress';
import Collapse from '@material-ui/core/Collapse';
import Grow from '@material-ui/core/Grow';
import Fade from '@material-ui/core/Fade';
import Slide from '@material-ui/core/Slide';
import Zoom from '@material-ui/core/Zoom';

import Todo from '../../models/Todo';
import UpdateTodoForm from '../../forms/UpdateTodoForm';
import Switch from '../../components/Switch';

const useStyles = makeStyles(theme => ({
  listItem: {
    display: 'flex',
    '&:hover': {
      background: theme.palette.background.default
    },
    transition: theme.transitions.create(
      ['height', 'flex-grow'],
      {duration: theme.transitions.duration.short}
    )
  },
  hidden: {
    display: 'none'
  }
}))

interface TodoListItemProps {
  todo: Todo;
  onDeleteTodo: Function;
  onUpdateTodo: (id: string, title: string) => void;
  deleteTodoLoading: boolean;
  updateTodoLoading: boolean;
}

const TodoListItem: FC<TodoListItemProps> = function({
  todo,
  onDeleteTodo,
  onUpdateTodo,
  deleteTodoLoading,
  updateTodoLoading
}) {
  const classes = useStyles({});
  const [isEditing, setIsEditing] = useState<boolean>(false);
  useEffect(() => {
    if (!updateTodoLoading) {
      setIsEditing(false);
    }
  }, [updateTodoLoading]);
  return (
    <ListItem className={classes.listItem}>
      <ListItemIcon>
        <IconButton 
          edge="end"
          aria-label="edit"
          onClick={() => setIsEditing(!isEditing)}
        >
          { isEditing ? <CancelIcon/> : <EditIcon /> }
        </IconButton>      
      </ListItemIcon>
      <Switch
        case={isEditing}
        view={
          <UpdateTodoForm
            defaultValue={todo.title}
            loading={updateTodoLoading}
            onSubmit={data => onUpdateTodo(todo.id, data.title)}
          />
        }
        default={
          <ListItemText primary={todo.title} />
        }
        transition={Zoom}
      />
      <ListItemSecondaryAction>
        <IconButton 
          edge="end"
          aria-label="delete"
          onClick={() => onDeleteTodo(todo.id)}
        >
          { deleteTodoLoading ? <CircularProgress size={24} /> : <DeleteIcon /> }
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}

export default TodoListItem;