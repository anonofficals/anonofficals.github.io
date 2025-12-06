import { apiService } from './api';

export const roleApi = {
  // Assign role to user
  assignRole: async (userId: string, role: string, departmentId?: string, reason?: string) => {
    return apiService.post<any>('/roles/assign', {
      userId,
      role,
      departmentId,
      reason
    });
  },

  // Revoke role from user
  revokeRole: async (userId: string, role: string, reason?: string) => {
    return apiService.post<any>('/roles/revoke', {
      userId,
      role,
      reason
    });
  },

  // Get user's roles
  getUserRoles: async (userId: string) => {
    return apiService.get<any>(`/roles/user/${userId}`);
  },

  // Get users by role
  getUsersByRole: async (role: string) => {
    return apiService.get<any>(`/roles/list/${role}`);
  },

  // Bulk assign roles
  bulkAssignRoles: async (assignments: Array<{ userId: string; role: string; departmentId?: string }>) => {
    return apiService.post<any>('/roles/bulk-assign', { assignments });
  }
};

export const permissionApi = {
  // Check if user has permission
  checkPermission: async (userId: string, category: string, action: string) => {
    return apiService.post<{ hasPermission: boolean }>('/permissions/check', {
      userId,
      category,
      action
    });
  },

  // Get user's permissions
  getUserPermissions: async (userId: string) => {
    return apiService.get<any>(`/permissions/user/${userId}`);
  },

  // Get permissions for a role
  getRolePermissions: async (role: string) => {
    return apiService.get<any>(`/permissions/role/${role}`);
  }
};

export const invitationApi = {
  // Send invitation
  sendInvitation: async (email: string, role: string, departmentId?: string) => {
    return apiService.post<any>('/invitations/send', {
      email,
      role,
      departmentId
    });
  },

  // Accept invitation
  acceptInvitation: async (token: string, userData: any) => {
    return apiService.post<any>('/invitations/accept', {
      token,
      ...userData
    });
  },

  // Get pending invitations
  getPendingInvitations: async () => {
    return apiService.get<any>('/invitations/pending');
  }
};
