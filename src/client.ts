import { ApolloClient } from 'apollo-client';
import Amplify from '@aws-amplify/core';
import Auth from '@aws-amplify/auth';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import * as fetch from 'cross-fetch';
import gql from 'graphql-tag';

import aws_config from './aws.config';
import signIn from './resolvers/signInResolver';
import signUp from './resolvers/signUpResolver';
import toggleButton from './resolvers/toggleButtonResolver';

Amplify.configure(aws_config);

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
const client = new ApolloClient({
  cache,
  link: authLink.concat(httpLink),
  typeDefs,
  resolvers: {
    Mutation: {
      toggleButton,
      signIn,
      signUp
    }
  }
});

cache.writeData({
  data: {
    buttonToggle: false
  }
});

export default client;