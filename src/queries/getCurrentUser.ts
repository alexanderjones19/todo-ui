import gql from 'graphql-tag';
import { CognitoUser } from '@aws-amplify/auth';

export type GetCurrentUserQuery = {
  currentUser: CognitoUser
}

export const GET_CURRENT_USER = gql`
  {
    currentUser @client
  }
`;