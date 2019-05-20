// tslint:disable
// this is an auto generated file. This will be overwritten

export const saveTodo = `mutation SaveTodo($TodoId: ID!, $title: String!) {
  saveTodo(TodoId: $TodoId, title: $title) {
    TodoId
    title
  }
}
`;
export const deleteTodo = `mutation DeleteTodo($TodoId: ID!) {
  deleteTodo(TodoId: $TodoId) {
    TodoId
    title
  }
}
`;
