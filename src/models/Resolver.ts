import { ApolloClient } from 'apollo-client';
import { ApolloCache } from 'apollo-cache'
import { NormalizedCache } from 'apollo-cache-inmemory';

type Resolver = (
  rootValue?: any,
  args?: any,
  context?: {
    cache: ApolloCache<NormalizedCache>,
    client: ApolloClient<NormalizedCache>
  },
  info?: any,
  ) => any;

export default Resolver;