import React, { FC } from 'react';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Zoom from '@material-ui/core/Zoom';
import Box from '@material-ui/core/Box';

import TodoListItem from './TodoListItem';
import Todo from '../../models/Todo';
import ListTransition from '../../components/ListTransition';

interface TodoListProps {
  todos: Todo[];
  onDeleteTodo: (id: string) => void;
  onUpdateTodo: (id: string, title: string) => void;
  isDeleteTodoLoading: (id: string) => boolean;
  isUpdateTodoLoading: (id: string) => boolean;
}

const TodoList: FC<TodoListProps> = function({
  todos,
  onDeleteTodo,
  onUpdateTodo,
  isDeleteTodoLoading,
  isUpdateTodoLoading
}) {
  return (
    <List>
      <ListTransition>
        {todos.map((todo) =>
          <Box key={todo.id}>
            <Divider />
            <TodoListItem
              todo={todo}
              onDeleteTodo={onDeleteTodo}
              onUpdateTodo={onUpdateTodo}
              deleteTodoLoading={isDeleteTodoLoading(todo.id)}
              updateTodoLoading={isUpdateTodoLoading(todo.id)}
            />
          </Box>
        )}
      </ListTransition>
    </List>
  )
}

export default TodoList;