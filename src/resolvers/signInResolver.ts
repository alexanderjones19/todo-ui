import Auth from '@aws-amplify/auth';

import Resolver from '../models/Resolver';
import { GET_CURRENT_USER } from '../queries/getCurrentUser';

const signIn: Resolver = async (_root, variables, { cache }) => {
  let email = variables.email;
  let password = variables.password;
  const user = await Auth.signIn({
    username: email,
    password
  });
  const data = { user: user };
  cache.writeQuery({
    query: GET_CURRENT_USER,
    data: { currentUser: user }
  });
  return data;
};

export default signIn;