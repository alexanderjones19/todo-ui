import gql from 'graphql-tag';

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

export const DELETE_TODO_LOCAL = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id) @client {
      id
      title
    }
  }
`;
