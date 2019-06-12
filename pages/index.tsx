import React from 'react';

import ToggleContainer from '../src/modules/toggle/ToggleContainer';
import ToggleButton from '../src/modules/toggle/ToggleButton';

const IndexPage = () => {
  return (
    <ToggleContainer>
      {({buttonToggleQuery, toggleButton}) => (
        <ToggleButton buttonToggle={buttonToggleQuery.data.buttonToggle} toggleButton={() => toggleButton()} />
      )}
    </ToggleContainer>
  );
}

export default IndexPage;