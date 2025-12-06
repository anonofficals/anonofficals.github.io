import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { apiService } from '@/services/api';

export const usePermission = (category: string, action: string) => {
  const [hasPermission, setHasPermission] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const checkPermission = async () => {
      if (!user?._id) {
        setHasPermission(false);
        setLoading(false);
        return;
      }

      try {
        const response = await apiService.post<{ hasPermission: boolean }>('/permissions/check', {
          userId: user._id,
          category,
          action
        });

        if (response.success && response.data) {
          setHasPermission(response.data.hasPermission);
        } else {
          setHasPermission(false);
        }
      } catch (error) {
        console.error('Permission check error:', error);
        setHasPermission(false);
      } finally {
        setLoading(false);
      }
    };

    checkPermission();
  }, [user?._id, category, action]);

  return { hasPermission, loading };
};
