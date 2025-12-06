import { apiService } from './api';

export const authApi = {
  // Login user
  login: async (email: string, password: string) => {
    return apiService.post<any>('/auth/login', { email, password });
  },

  // Register user
  signup: async (name: string, email: string, password: string) => {
    return apiService.post<any>('/auth/signup', { name, email, password });
  },

  // Get current user
  me: async () => {
    return apiService.get<any>('/auth/me');
  },

  // Update profile
  updateProfile: async (data: any) => {
    return apiService.put<any>('/auth/profile', data);
  },

  // Change password
  changePassword: async (currentPassword: string, newPassword: string) => {
    return apiService.post<any>('/auth/change-password', {
      currentPassword,
      newPassword
    });
  }
};
