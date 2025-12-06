import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { apiService } from '@/services/api';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRoles }) => {
  const [isValidating, setIsValidating] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  
  useEffect(() => {
    const validateAuth = async () => {
      const token = localStorage.getItem("authToken");
      const userData = localStorage.getItem("user");
      
      if (!token || !userData) {
        setIsAuthorized(false);
        setIsValidating(false);
        return;
      }

      try {
        // Validate token with backend
        const response = await apiService.get<any>('/auth/me');
        
        if (response.success && response.data) {
          const user = response.data;
          
          // Check if user has required role
          if (requiredRoles && requiredRoles.length > 0) {
            const hasRequiredRole = user.roles?.some((role: string) => 
              requiredRoles.includes(role)
            );
            setIsAuthorized(hasRequiredRole);
          } else {
            setIsAuthorized(true);
          }
        } else {
          setIsAuthorized(false);
          localStorage.removeItem("user");
          localStorage.removeItem("authToken");
        }
      } catch (error) {
        console.error('Auth validation error:', error);
        setIsAuthorized(false);
        localStorage.removeItem("user");
        localStorage.removeItem("authToken");
      } finally {
        setIsValidating(false);
      }
    };

    validateAuth();
  }, [requiredRoles]);

  if (isValidating) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-white">Validating...</div>
      </div>
    );
  }

  if (!isAuthorized) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;