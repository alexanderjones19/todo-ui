import Resolver from '../models/Resolver';

const deleteTodoLocalResolver: Resolver = (_root, variables, { cache }) => {
  const deleteTodo = {
    __typename: 'Todo',
    id: variables.id
  }
  return deleteTodo;
};

export default deleteTodoLocalResolver;