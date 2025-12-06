// Role types for the application
export type UserRole = 'ceo' | 'content_manager' | 'contributor';

export interface RolePermissions {
  canManageUsers: boolean;
  canManageContributors: boolean;
  canManageBlogs: boolean;
  canManageProjects: boolean;
  canViewAnalytics: boolean;
  canEditSettings: boolean;
}

export const ROLE_PERMISSIONS: Record<UserRole, RolePermissions> = {
  ceo: {
    canManageUsers: true,
    canManageContributors: true,
    canManageBlogs: true,
    canManageProjects: true,
    canViewAnalytics: true,
    canEditSettings: true,
  },
  content_manager: {
    canManageUsers: false,
    canManageContributors: false,
    canManageBlogs: true,
    canManageProjects: true,
    canViewAnalytics: true,
    canEditSettings: false,
  },
  contributor: {
    canManageUsers: false,
    canManageContributors: false,
    canManageBlogs: false,
    canManageProjects: false,
    canViewAnalytics: false,
    canEditSettings: false,
  },
};

export const ROLE_LABELS: Record<UserRole, string> = {
  ceo: 'CEO',
  content_manager: 'Content Manager',
  contributor: 'Contributor',
};

export const isCEO = (roles: string[]): boolean => roles.includes('ceo');
export const isContentManager = (roles: string[]): boolean => roles.includes('content_manager');
export const isContributor = (roles: string[]): boolean => roles.includes('contributor');
