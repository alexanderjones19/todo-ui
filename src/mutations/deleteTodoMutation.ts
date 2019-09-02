import gql from 'graphql-tag';

export type DeleteTodoMutation = {
 deleteTodo: (id: string) => void
};

export type DeleteTodoMutationVariables = {
  id: string
};

export const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      id
      title
    }
  }
`;