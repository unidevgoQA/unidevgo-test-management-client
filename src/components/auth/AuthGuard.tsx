import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/hooks/useAuthStore';

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, isLoading } = useAuthStore();

  useEffect(() => {
    const publicPaths = ['/signin', '/signup'];
    const isPublicPath = publicPaths.includes(location.pathname);

    if (!isLoading) {
      if (isAuthenticated && isPublicPath) {
        navigate('/dashboard');
      } else if (!isAuthenticated && !isPublicPath) {
        navigate('/signin');
      }
    }
  }, [isAuthenticated, isLoading, location.pathname, navigate]);

  if (isLoading) {
    return null;
  }

  return <>{children}</>;
}