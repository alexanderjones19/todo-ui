import { Auth } from 'aws-amplify';

import Resolver from '../models/Resolver';

const signIn: Resolver = async (_root, variables, { cache }) => {
  let email = variables.email;
  let password = variables.password;
  const user = await Auth.signIn({
    username: email,
    password
  });
  const data = { user: user };
  // cache.writeData({ data });
  return data;
};

export default signIn;