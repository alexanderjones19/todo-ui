import uuid from 'uuid/v4';

import Resolver from '../models/Resolver';

const createTodoLocalResolver: Resolver = (_root, variables, { cache }) => {
  const createTodo = {
    __typename: 'Todo',
    title: variables.title,
    id: uuid()
  }
  return createTodo;
};

export default createTodoLocalResolver;