import gql from 'graphql-tag';

export const TOGGLE_BUTTON = gql`
  mutation ToggleButton {
    toggleButton @client
  }
`;