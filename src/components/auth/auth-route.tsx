import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface AuthRouteProps {
  children: React.ReactNode;
}

export default function AuthRoute({ children }: AuthRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();

  // Show nothing while checking authentication status
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center theme-gradient">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }

  // Render children if authenticated
  return <>{children}</>;
} 