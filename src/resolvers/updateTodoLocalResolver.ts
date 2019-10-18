import Resolver from '../models/Resolver';
import { UpdateTodoMutationVariables } from '../mutations/updateTodoMutation';
import { FETCH_TODOS, FetchTodosQuery } from '../queries/fetchTodos';

const updateTodoLocalResolver: Resolver = (_root, variables: UpdateTodoMutationVariables, { cache }) => {
  const { allTodos } = cache.readQuery<FetchTodosQuery>({ query: FETCH_TODOS });
  const updateTodo = allTodos.todos.find((todo) => {
    return todo.id === variables.id;
  })
  updateTodo.title = variables.title;
  allTodos.todos = allTodos.todos.concat([]);
  cache.writeQuery({
    query: FETCH_TODOS,
    data: { allTodos }
  });
  return updateTodo;
};

export default updateTodoLocalResolver;