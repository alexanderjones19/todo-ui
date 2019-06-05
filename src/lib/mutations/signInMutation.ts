import gql from 'graphql-tag';

export type SignInMutation = {
  signIn: (email: string, password: string) => void
}

export const SIGN_IN = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) @client
  }
`;