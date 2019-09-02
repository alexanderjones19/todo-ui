import gql from 'graphql-tag';

export type CreateTodoMutation = {
 createTodo: (title: string) => void
};

export type CreateTodoMutationVariables = {
  title: string
};

export const CREATE_TODO = gql`
  mutation CreateTodo($title: String!) {
    createTodo(title: $title) {
      id
      title
    }
  }
`;