import gql from 'graphql-tag';

export const FETCH_TODOS = gql`
  {
    allTodos {
      todos {
        id
        title
      }
    }
  }
`;