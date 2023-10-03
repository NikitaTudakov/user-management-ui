import { ReactNode, useState } from 'react';
import { Navigate } from 'react-router-dom';

interface AuthGuardProps {
  children: ReactNode;
  isAuthenticated: boolean;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children,isAuthenticated }) => {
  if (isAuthenticated) {
    return <>{children}</>;
  } else {
    return <Navigate to="/login" />;
  }
};

export default AuthGuard;

