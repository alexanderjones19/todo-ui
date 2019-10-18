import { ApolloClient } from 'apollo-client';
import Amplify from '@aws-amplify/core';
import Auth from '@aws-amplify/auth';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import * as fetch from 'cross-fetch';
import gql from 'graphql-tag';
import { CachePersistor } from 'apollo-cache-persist';
import { AsyncNodeStorage } from 'redux-persist-node-storage';
import { ApolloLink } from 'apollo-link';

import aws_config from './aws.config';
import signIn from './resolvers/signInResolver';
import signOut from './resolvers/signOutResolver';
import signUp from './resolvers/signUpResolver';
import toggleButton from './resolvers/toggleButtonResolver';
import currentUser from './resolvers/currentUserResolver';
import createTodo from './resolvers/createTodoLocalResolver';
import updateTodo from './resolvers/updateTodoLocalResolver';
import deleteTodo from './resolvers/deleteTodoLocalResolver';

Amplify.configure(aws_config);

// TODO: fix type defs
const typeDefs = gql`
  extend type ButtonToggle {
    buttonToggle: Boolean!
  }
`;

const httpLink = createHttpLink({
  uri: aws_config.API.appsyncGraphqlEndpoint,
  fetch: fetch as any
});

const authLink = setContext(async (_, { headers }) => {
  const token = (await Auth.currentSession()).getAccessToken().getJwtToken();
  return {
    headers: {
      ...headers,
      authorization: token ? token : '',
    }
  }
});

const cache = new InMemoryCache();

let storage;
try {
  storage = window.localStorage;
} catch {
  storage = new AsyncNodeStorage('/tmp/todo-storage/');
}
export const persistor = new CachePersistor({
  cache,
  storage
});
persistor.pause();

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([
    authLink,
    httpLink
  ]),
  typeDefs,
  resolvers: {
    Query: {
      currentUser
    },
    Mutation: {
      createTodo,
      deleteTodo,
      updateTodo,
      toggleButton,
      signIn,
      signOut,
      signUp
    }
  }
});

export const initStore = () => {
  cache.writeData({
    data: {
      buttonToggle: false,
      allTodos: {__typename: 'PaginatedTodos', todos: [], nextToken: ''}
    }
  });
}

initStore();

export default client;