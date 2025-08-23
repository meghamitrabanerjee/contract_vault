import React, { useEffect } from 'react';
import { useAppDispatch } from '../store/hooks';
import { checkAuthStatus } from '../store/slices/userSlice';

const AuthInitializer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Check authentication status when app loads
    dispatch(checkAuthStatus());
  }, [dispatch]);

  return <>{children}</>;
};

export default AuthInitializer;
