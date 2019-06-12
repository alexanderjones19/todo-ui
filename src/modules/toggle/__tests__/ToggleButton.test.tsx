/* eslint-env jest */
import React from 'react';
import { shallow, mount } from 'enzyme';

import ToggleButton from '../ToggleButton';

describe('ToggleButton', () => {
  it('should display current toggle state', () => {
    const button = shallow(<ToggleButton buttonToggle={true} toggleButton={null}/>);
    expect(button.text()).toEqual('true');
  });

  it('should toggle when clicked', () => {
    const toggleButton = jest.fn();
    const button = shallow(<ToggleButton buttonToggle={false} toggleButton={toggleButton}/>);
    button.simulate('click');
    expect(toggleButton).toHaveBeenCalled();
  });
});