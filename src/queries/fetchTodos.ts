import gql from 'graphql-tag';

import Todo from '../models/Todo';

export type FetchTodosQuery = {
  allTodos: {
    todos: Todo[],
    nextToken?: string
  }
}

export const FETCH_TODOS = gql`
  {
    allTodos {
      todos {
        id
        title
      }
      nextToken
    }
  }
`;