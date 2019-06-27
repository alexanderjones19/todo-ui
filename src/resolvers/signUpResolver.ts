import Auth from '@aws-amplify/auth';

import Resolver from '../models/Resolver';

const signUp: Resolver = async (_root, variables, { cache }) => {
  let email = variables.email;
  let password = variables.password;
  const user = await Auth.signUp({
    username: email,
    password
  });
  const data = { user: user };
  return data;
};

export default signUp;