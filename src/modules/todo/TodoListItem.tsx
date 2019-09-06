import React, { FC } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CircularProgress from '@material-ui/core/CircularProgress';

import Todo from '../../models/Todo';

interface TodoListItemProps {
  todo: Todo;
  onDeleteTodo: Function;
  onUpdateTodo: Function;
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
  return (
    <ListItem>
      <ListItemText primary={todo.title} />
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