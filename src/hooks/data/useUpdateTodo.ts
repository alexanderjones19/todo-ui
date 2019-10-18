import { useMutation } from "@apollo/react-hooks";

import { UpdateTodoMutationVariables, UPDATE_TODO, UPDATE_TODO_LOCAL } from "../../mutations/updateTodoMutation";
import Todo from "../../models/Todo";

const useUpdateTodo = (online: boolean) => {
  const mutationResult = useMutation<
    { updateTodo: Todo},
    UpdateTodoMutationVariables
  >(
    ( online ? UPDATE_TODO : UPDATE_TODO_LOCAL )
  );

  return mutationResult;
}

export default useUpdateTodo;