import gql from 'graphql-tag';
import React from 'react';
import { adopt } from 'react-adopt'
import { Query, Mutation, DataProps } from 'react-apollo';

import { GET_BUTTON_TOGGLE } from '../../client';

interface ToggleContainerProps {
  buttonToggleQuery: DataProps<GetButtonToggleQuery>,
  toggleButton: Function
}

type GetButtonToggleQuery = {
  buttonToggle: boolean
}

type ToggleButtonMutation = {
  toggleButton: Function
}

const TOGGLE_BUTTON = gql`
  mutation ToggleButton {
    toggleButton @client
  }
`;

export default adopt<ToggleContainerProps, {}>({
  buttonToggleQuery: ({render}) => <Query<GetButtonToggleQuery> query={GET_BUTTON_TOGGLE} children={render}/>,
  toggleButton: ({render}) => <Mutation<ToggleButtonMutation> mutation={TOGGLE_BUTTON} children={render}/>
});