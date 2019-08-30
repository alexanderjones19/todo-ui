import gql from 'graphql-tag';

export type SignOutMutation = {
  signOut: () => void
};

export const SIGN_OUT = gql`
  mutation SignOut {
    signOut @client
  }
`;