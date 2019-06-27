import gql from 'graphql-tag';

export const GET_BUTTON_TOGGLE = gql`
  {
    buttonToggle @client
  }
`;