import React, { FC, useState } from 'react';
import Box from '@material-ui/core/Box';
import Grow from '@material-ui/core/Grow';
import { TransitionProps } from '@material-ui/core/transitions/transition';
import { CollapseProps } from '@material-ui/core/Collapse';

interface SwitchProps {
  case: boolean;
  view: React.ReactNode;
  default: React.ReactNode;
  transition?: React.ComponentType<TransitionProps | CollapseProps>;
  timeout?: number;
  mountOnEnter?: boolean;
  unmountOnExit?: boolean;
}

const Switch: FC<SwitchProps> = function({
  case: switchCase,
  view,
  default: defaultView,
  transition,
  timeout,
  mountOnEnter = true,
  unmountOnExit = true
}) {
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const TransitionComponent = transition ? transition : Grow;

  return (
    <React.Fragment>
      <TransitionComponent
        in={switchCase}
        onExited={() => setIsTransitioning(false)}
        onExiting={() => setIsTransitioning(true)}
        onEntering={() => setIsTransitioning(true)}
        onEntered={() => setIsTransitioning(false)}
        mountOnEnter={mountOnEnter}
        unmountOnExit={unmountOnExit}
        timeout={timeout ? timeout : 170}
      >
        {/* Need to wrap in box for Slide to work */}
        {/* <Box display={ (switchCase || displayView) ? 'box': 'none' }>
          { (switchCase || displayView) ? view : <Box display="none" /> }
        </Box> */}
        { view }
      </TransitionComponent>
      { (!switchCase && !isTransitioning) ? defaultView : null }
    </React.Fragment>
  )
}

export default Switch;