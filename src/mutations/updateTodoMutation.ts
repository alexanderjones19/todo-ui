import gql from 'graphql-tag';

export type UpdateTodoMutationVariables = {
  id: string,
  title: string
};

export const UPDATE_TODO = gql`
  mutation UpdateTodo($id: ID!, $title: String!) {
    updateTodo(id: $id, title: $title) {
      id
      title
    }
  }
`;