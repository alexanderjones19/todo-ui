import Auth from '@aws-amplify/auth';

import Resolver from '../models/Resolver';

const currentUser: Resolver = async (_root, variables, { cache }) => {
  return await Auth.currentAuthenticatedUser();
};

export default currentUser;