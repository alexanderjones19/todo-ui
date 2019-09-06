import Auth from '@aws-amplify/auth';

import Resolver from '../models/Resolver';

const signOut: Resolver = async (_root, variables, { client }) => {
  await Auth.signOut();
  await client.resetStore();
};

export default signOut;