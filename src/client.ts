import { ApolloClient } from 'apollo-client';
import { Auth } from 'aws-amplify';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import gql from 'graphql-tag';

import aws_config from './aws.config';

export const GET_BUTTON_TOGGLE = gql`
  {
    buttonToggle @client
  }
`;

const typeDefs = gql`
  extend type ButtonToggle {
    buttonToggle: Boolean!
  }
`;

const httpLink = createHttpLink({
  uri: aws_config.API.appsyncGraphqlEndpoint
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
      toggleButton: (_root, variables, { cache }) => {
        const query = cache.readQuery({query: GET_BUTTON_TOGGLE});
        const data = { buttonToggle: !query.buttonToggle };
        cache.writeData({ data });
      } 
    }
  }
});

cache.writeData({
  data: {
    buttonToggle: false
  }
});

export default client;