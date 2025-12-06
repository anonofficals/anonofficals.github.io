import React from 'react';
import { usePermission } from '@/hooks/usePermission';

interface PermissionGateProps {
  children: React.ReactNode;
  category: string;
  action: string;
  fallback?: React.ReactNode;
}

export const PermissionGate: React.FC<PermissionGateProps> = ({
  children,
  category,
  action,
  fallback = null
}) => {
  const { hasPermission, loading } = usePermission(category, action);

  if (loading) {
    return <div className="text-gray-400">Checking permissions...</div>;
  }

  if (!hasPermission) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
