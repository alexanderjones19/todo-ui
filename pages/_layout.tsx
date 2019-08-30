import React, { FC } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { useMutation } from '@apollo/react-hooks';

import { SIGN_OUT, SignOutMutation } from '../src/mutations/signOutMutation';

const Layout: FC = ({ children }) => {

  const [
    signOut,
    {
      error: signOutError,
      loading: signOutLoading
    }
  ] = useMutation<SignOutMutation>(SIGN_OUT);

  return (
    <React.Fragment>
      <AppBar position="static">
        <Toolbar>
          <Button variant="contained" onClick={() => {signOut()}}>Logout</Button>
        </Toolbar>
      </AppBar>
      {children}
    </React.Fragment>
  );
}

export default Layout;