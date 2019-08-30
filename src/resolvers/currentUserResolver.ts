import Auth from '@aws-amplify/auth';

import Resolver from '../models/Resolver';

const currentUser: Resolver = (_root, variables, { cache }) => {
  console.log('current user resolver');
  return Auth.currentAuthenticatedUser();
};

export default currentUser;