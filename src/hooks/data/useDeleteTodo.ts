import { useMutation } from "@apollo/react-hooks";

import Todo from "../../models/Todo";
import { DeleteTodoMutationVariables, DELETE_TODO, DELETE_TODO_LOCAL } from "../../mutations/deleteTodoMutation";
import { FETCH_TODOS } from "../../queries/fetchTodos";

const useDeleteTodo = (online: boolean) => {
  const mutationResult = useMutation<
    { deleteTodo: Todo },
    DeleteTodoMutationVariables
  >(
    ( online ? DELETE_TODO : DELETE_TODO_LOCAL ),
    {
      update(cache, { data: { deleteTodo } }) {
        const { allTodos } = cache.readQuery({ query: FETCH_TODOS });
        allTodos.todos.splice(allTodos.todos.findIndex(t => t.id === deleteTodo.id), 1);
        cache.writeQuery({
          query: FETCH_TODOS,
          data: { allTodos }
        });
      }
    }
  )

  return mutationResult;
}

export default useDeleteTodo;