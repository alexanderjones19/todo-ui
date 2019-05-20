// tslint:disable
// this is an auto generated file. This will be overwritten

export const allTodos = `query AllTodos($limit: Int, $nextToken: String) {
  allTodos(limit: $limit, nextToken: $nextToken) {
    todos {
      TodoId
      title
    }
    nextToken
  }
}
`;
export const getTodo = `query GetTodo($TodoId: ID!) {
  getTodo(TodoId: $TodoId) {
    TodoId
    title
  }
}
`;
