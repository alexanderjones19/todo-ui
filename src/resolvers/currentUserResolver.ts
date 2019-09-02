import Auth from '@aws-amplify/auth';

import Resolver from '../models/Resolver';

const currentUser: Resolver = async (_root, variables, { cache }) => {
  const user = await Auth.currentAuthenticatedUser();
  return user;
};

export default currentUser;