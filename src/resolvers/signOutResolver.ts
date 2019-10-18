import Auth from '@aws-amplify/auth';

import Resolver from '../models/Resolver';
import { persistor } from '../client';

const signOut: Resolver = async (_root, variables, { client, cache }) => {
  await Auth.signOut();
  await client.clearStore();
  await persistor.restore();
  await client.reFetchObservableQueries();
};

export default signOut;