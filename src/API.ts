/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type SaveTodoMutationVariables = {
  TodoId: string,
  title: string,
};

export type SaveTodoMutation = {
  saveTodo:  {
    __typename: "Todo",
    TodoId: string,
    title: string | null,
  } | null,
};

export type DeleteTodoMutationVariables = {
  TodoId: string,
};

export type DeleteTodoMutation = {
  deleteTodo:  {
    __typename: "Todo",
    TodoId: string,
    title: string | null,
  } | null,
};

export type AllTodosQueryVariables = {
  limit?: number | null,
  nextToken?: string | null,
};

export type AllTodosQuery = {
  allTodos:  {
    __typename: "PaginatedTodos",
    todos:  Array< {
      __typename: "Todo",
      TodoId: string,
      title: string | null,
    } >,
    nextToken: string | null,
  },
};

export type GetTodoQueryVariables = {
  TodoId: string,
};

export type GetTodoQuery = {
  getTodo:  {
    __typename: "Todo",
    TodoId: string,
    title: string | null,
  } | null,
};
