import gql from 'graphql-tag';

export type SignUpMutation = {
  signUp: (email: string, password: string) => void
};

export type SignUpMutationVariables = {
  email: string,
  password: string
};

export const SIGN_UP = gql`
  mutation SignUp($email: String!, $password: String!) {
    signUp(email: $email, password: $password) @client
  }
`;