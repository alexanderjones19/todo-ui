import { useLazyQuery } from '@apollo/react-hooks';

import { FetchTodosQuery, FETCH_TODOS } from "../../queries/fetchTodos";

const useFetchTodos = (online: boolean) => {
  const queryResult = useLazyQuery<FetchTodosQuery>(FETCH_TODOS, {
    fetchPolicy: (online ? 'cache-and-network' : 'cache-only' )
  });

  return queryResult;
}

export default useFetchTodos;