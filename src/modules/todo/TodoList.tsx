import React, { FC } from 'react';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';

import TodoListItem from './TodoListItem';
import Todo from '../../models/Todo';
import ListTransition from '../../components/ListTransition';
import AsyncStateMap from '../../models/AsyncStateMap';

interface TodoListProps {
  todos: Todo[];
  onDeleteTodo: (id: string) => void;
  onUpdateTodo: (id: string, title: string) => void;
  updateTodoState: AsyncStateMap;
  deleteTodoState: AsyncStateMap;
}

const TodoList: FC<TodoListProps> = function({
  todos,
  onDeleteTodo,
  onUpdateTodo,
  updateTodoState,
  deleteTodoState
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
              deleteTodoLoading={deleteTodoState[todo.id] && deleteTodoState[todo.id].loading}
              updateTodoLoading={updateTodoState[todo.id] && updateTodoState[todo.id].loading}
              deleteTodoError={deleteTodoState[todo.id] && deleteTodoState[todo.id].error}
              updateTodoError={updateTodoState[todo.id] && updateTodoState[todo.id].error}
            />
          </Box>
        )}
      </ListTransition>
    </List>
  )
}

export default TodoList;