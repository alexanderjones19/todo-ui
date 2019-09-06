import React, { FC } from 'react';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

import TodoListItem from './TodoListItem';
import Todo from '../../models/Todo';

interface TodoListProps {
  todos: Todo[];
  onDeleteTodo: (id: string) => void;
  onUpdateTodo: (id: string) => void;
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
      {todos.map((todo) =>
        <React.Fragment key={todo.id}>
          <Divider />
          <TodoListItem
            todo={todo}
            onDeleteTodo={onDeleteTodo}
            onUpdateTodo={onUpdateTodo}
            deleteTodoLoading={isDeleteTodoLoading(todo.id)}
            updateTodoLoading={isUpdateTodoLoading(todo.id)}
          />
        </React.Fragment>
      )}
    </List>
  )
}

export default TodoList;