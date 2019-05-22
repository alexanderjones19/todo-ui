import { ApolloClient } from 'apollo-client';
import { Auth } from 'aws-amplify';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { Mutation } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import gql from 'graphql-tag';

import aws_config from './aws.config';

export const GET_BUTTON_TOGGLE = gql`
  {
    buttonToggle @client
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
});

cache.writeData({
  data: {
    buttonToggle: false
  }
});

export default client;