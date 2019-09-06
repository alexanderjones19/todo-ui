import React, { FC } from 'react';
import List from '@material-ui/core/List';

import Todo from '../../models/Todo';

interface TodoListProps {
  todos: Todo[]
}

const TodoList: FC<TodoListProps> = function() {
  return (
    <List>

    </List>
  )
}

export default TodoList;