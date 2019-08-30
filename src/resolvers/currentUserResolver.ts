import Auth from '@aws-amplify/auth';

import Resolver from '../models/Resolver';

const currentUser: Resolver = async (_root, variables, { cache }) => {
  try {
    const user = await Auth.currentAuthenticatedUser();
    return user;
  } catch(e) {
    throw e;
  }
};

export default currentUser;