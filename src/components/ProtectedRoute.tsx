import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { checkAuthStatus } from '../store/slices/userSlice';
import { LoadingSpinner } from './LoadingSpinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  allowedRoles?: ('freelancer' | 'client')[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireAuth = true,
  allowedRoles = []
}) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { isAuthenticated, currentUser, loading } = useAppSelector(state => state.user);

  useEffect(() => {
    // Check authentication status on component mount
    if (!isAuthenticated && !loading) {
      dispatch(checkAuthStatus());
    }
  }, [dispatch, isAuthenticated, loading]);

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner />
      </div>
    );
  }

  // If authentication is not required, render children
  if (!requireAuth) {
    return <>{children}</>;
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If role restrictions are specified, check user role
  if (allowedRoles.length > 0 && currentUser) {
    if (!allowedRoles.includes(currentUser.role)) {
      // Redirect to dashboard if user doesn't have required role
      return <Navigate to="/dashboard" replace />;
    }
  }

  // User is authenticated and has required role (if specified)
  return <>{children}</>;
};

export default ProtectedRoute;
