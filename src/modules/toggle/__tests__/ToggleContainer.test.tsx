/* eslint-env jest */
import React from 'react';
import { mount } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';

import { GET_BUTTON_TOGGLE } from '../../../client';
import ToggleContainer from './../ToggleContainer';
import { InMemoryCache } from 'apollo-cache-inmemory';

const mocks = [
  {
    request: {
      query: GET_BUTTON_TOGGLE
    },
    result: {
      data: {
        buttonToggle: false
      }
    }
  }
];

const cache  = new InMemoryCache();

const toggleButton = jest.fn();

const resolvers = {
  Mutation: {
    toggleButton
  }
};

const ButtonToggle = (
  <MockedProvider mocks={mocks} resolvers={resolvers} cache={cache}>
    <ToggleContainer>
      {({toggleButton, buttonToggleQuery}) => (
        <button onClick={() => toggleButton()}>{buttonToggleQuery.data.buttonToggle.toString()}</button>
      )}
    </ToggleContainer>
  </MockedProvider>
);

describe('ToggleContainer', () => {
  it('renders correct initial button', () => {
    cache.writeData({
      data: {
        buttonToggle: false
      }
    });
    const button = mount(ButtonToggle);
    expect(button.text()).toEqual('false');
  });

  it('calls toggleButton mutation', async () => {
    const button = mount(ButtonToggle);
    await button.find('button').simulate('click');
    expect(toggleButton).toHaveBeenCalled();
  });

});
