import Auth from '@aws-amplify/auth';

import Resolver from '../models/Resolver';

const signOut: Resolver = async (_root) => {
  return await Auth.signOut();
};

export default signOut;