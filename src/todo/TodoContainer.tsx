import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { ApolloError, gql } from 'apollo-boost';

import { allTodos } from '../graphql/queries';
import { AllTodosQuery, AllTodosQueryVariables } from '../API';

export default class TodoContainer extends Component {
  render() {
    return (
      <Query<AllTodosQuery, AllTodosQueryVariables>
        query={gql(allTodos)}
      >
        {({ loading, error, data }: {loading: boolean, error?: ApolloError, data?: AllTodosQuery}) => {
          if (loading) return <p>Loading...</p>;
          if (error || !data) return <p>Error</p>;
          if (data!.allTodos.todos.length === 0) return <p>No Todos</p>
          return (
          <div>
            <h4>To Do</h4>
            <ul>
              {data!.allTodos.todos.map(todo => (
                <li key={todo.TodoId}>{todo.title}</li>
              ))}
            </ul>
          </div>
          );
        }}
      </Query>
    );
  }
}