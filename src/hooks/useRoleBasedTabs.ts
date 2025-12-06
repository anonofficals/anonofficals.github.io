import { useMemo } from 'react';

export interface TabConfig {
  value: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  roles: string[];
}

export const useRoleBasedTabs = (allTabs: TabConfig[], userRole: string) => {
  const visibleTabs = useMemo(() => {
    return allTabs.filter(tab => 
      tab.roles.includes('*') || tab.roles.includes(userRole)
    );
  }, [allTabs, userRole]);

  return visibleTabs;
};
