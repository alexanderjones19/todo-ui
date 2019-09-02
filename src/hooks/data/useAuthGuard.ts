import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/react-hooks';

import { GET_CURRENT_USER, GetCurrentUserQuery } from '../../queries/getCurrentUser';

const useAuthGuard = (authRoute: string, unauthRoute: string) => {
  const router = useRouter();
  const { 
    loading: userLoading,
    data: userData,
    error: userError,
  } = useQuery<GetCurrentUserQuery>(
    GET_CURRENT_USER,
  );
  useEffect(() => {
    if (userLoading) {
      return;
    }
    const auth = userData && userData.currentUser && !userError;
    if (auth) {
      if (authRoute) {
        router.push(authRoute);
      }
    } else {
      if (unauthRoute) {
        router.push(unauthRoute);
      }
    }
  }, [userData, userLoading, userError]);
  return {
    userData,
    userLoading,
    userError
  };
}

export default useAuthGuard;