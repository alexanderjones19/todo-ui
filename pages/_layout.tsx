import React, { FC } from 'react';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { useMutation, useQuery } from '@apollo/react-hooks';

import { SIGN_OUT, SignOutMutation } from '../src/mutations/signOutMutation';
import { GET_CURRENT_USER, GetCurrentUserQuery } from '../src/queries/getCurrentUser';

const useStyles = makeStyles({
  logoutButton: {
    marginLeft: 'auto'
  }
})

const Layout: FC = ({ children }) => {
  const classes = useStyles();
  const router = useRouter();

  const {
    data: userData,
    error: userError,
    loading: userLoading
   } = useQuery<GetCurrentUserQuery>(GET_CURRENT_USER);

  const [
    signOut,
    {
      error: signOutError,
      loading: signOutLoading
    }
  ] = useMutation<SignOutMutation>(SIGN_OUT, {
    onCompleted: () => {
      router.push('/');
    },
    update(cache) {
      cache.writeQuery({
        query: GET_CURRENT_USER,
        data: { currentUser: null }
      });
    }
  });

  return (
    <React.Fragment>
      <AppBar position="static">
        <Toolbar>
          {userData && userData.currentUser && !userLoading ? 
            <Button 
              className={classes.logoutButton}
              variant="contained" 
              onClick={() => {signOut()}}
            >Logout</Button> :
            null}
        </Toolbar>
      </AppBar>
      {children}
    </React.Fragment>
  );
}

export default Layout;