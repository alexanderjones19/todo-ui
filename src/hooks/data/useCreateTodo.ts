import { useMutation } from '@apollo/react-hooks';

import { CREATE_TODO, CREATE_TODO_LOCAL, CreateTodoMutationVariables } from '../../mutations/createTodoMutation';
import Todo from '../../models/Todo';
import { FETCH_TODOS } from '../../queries/fetchTodos';

const useCreateTodo = (online: boolean) => {
  const mutationResults = useMutation<
    { createTodo: Todo },
    CreateTodoMutationVariables
  >(
    ( online ? CREATE_TODO : CREATE_TODO_LOCAL ), 
    {
      update(cache, result) {
        const { createTodo } = result.data
        const { allTodos } = cache.readQuery({ query: FETCH_TODOS });
        allTodos.todos = allTodos.todos.concat([createTodo])
        cache.writeQuery({
          query: FETCH_TODOS,
          data: { allTodos }
        });
      }
    }
  );

  return mutationResults;
}

export default useCreateTodo;