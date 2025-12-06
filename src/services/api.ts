
import { ApiResponse, PaginatedResponse } from '@/types/database';

// Base API configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${API_BASE_URL}${endpoint}`;
      const config: RequestInit = {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      };

      // Add auth token if available
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers = {
          ...config.headers,
          'Authorization': `Bearer ${token}`,
        };
      }

      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }

      return data;
    } catch (error) {
      console.error('API request error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // GET request
  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  // POST request
  async post<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // PUT request
  async put<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // DELETE request
  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  // PATCH request
  async patch<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }
}

// Create singleton instance
export const apiService = new ApiService();

// Specific API endpoints
export const staffApi = {
  getAll: (filters?: any) => 
    apiService.get<PaginatedResponse<any>>(`/staff?${new URLSearchParams(filters).toString()}`),
  getById: (id: string) => apiService.get<any>(`/staff/${id}`),
  create: (data: any) => apiService.post<any>('/staff', data),
  update: (id: string, data: any) => apiService.put<any>(`/staff/${id}`, data),
  delete: (id: string) => apiService.delete<any>(`/staff/${id}`),
};

export const departmentApi = {
  getAll: () => apiService.get<any[]>('/departments'),
  getById: (id: string) => apiService.get<any>(`/departments/${id}`),
  getStats: (id: string) => apiService.get<any>(`/departments/${id}/stats`),
  create: (data: any) => apiService.post<any>('/departments', data),
  update: (id: string, data: any) => apiService.put<any>(`/departments/${id}`, data),
  delete: (id: string) => apiService.delete<any>(`/departments/${id}`),
};

export const projectApi = {
  getAll: (filters?: any) => 
    apiService.get<PaginatedResponse<any>>(`/projects?${new URLSearchParams(filters).toString()}`),
  getById: (id: string) => apiService.get<any>(`/projects/${id}`),
  create: (data: any) => apiService.post<any>('/projects', data),
  update: (id: string, data: any) => apiService.put<any>(`/projects/${id}`, data),
  delete: (id: string) => apiService.delete<any>(`/projects/${id}`),
};

export const analyticsApi = {
  getSystemMetrics: () => apiService.get<any>('/analytics/system'),
  getDepartmentAnalytics: (id: string) => apiService.get<any>(`/analytics/departments/${id}`),
  getMonthlyData: () => apiService.get<any>('/analytics/monthly'),
};

export const internApi = {
  getAll: (filters?: any) => 
    apiService.get<PaginatedResponse<any>>(`/interns?${new URLSearchParams(filters).toString()}`),
  getById: (id: string) => apiService.get<any>(`/interns/${id}`),
  create: (data: any) => apiService.post<any>('/interns', data),
  update: (id: string, data: any) => apiService.put<any>(`/interns/${id}`, data),
  delete: (id: string) => apiService.delete<any>(`/interns/${id}`),
};

export const applicationApi = {
  getAll: (filters?: any) => 
    apiService.get<PaginatedResponse<any>>(`/applications?${new URLSearchParams(filters).toString()}`),
  getById: (id: string) => apiService.get<any>(`/applications/${id}`),
  create: (data: any) => apiService.post<any>('/applications', data),
  updateStatus: (id: string, data: any) => apiService.patch<any>(`/applications/${id}/status`, data),
  delete: (id: string) => apiService.delete<any>(`/applications/${id}`),
  getStats: (formType?: string) => 
    apiService.get<any>(`/applications/stats/overview${formType ? `?formType=${formType}` : ''}`),
  search: (query: string, type?: string) => 
    apiService.get<any>(`/applications/search?q=${encodeURIComponent(query)}${type ? `&type=${type}` : ''}`),
};

export const fileApi = {
  upload: (formData: FormData) => {
    const token = localStorage.getItem('authToken');
    return fetch(`${API_BASE_URL}/files/upload`, {
      method: 'POST',
      headers: token ? { 'Authorization': `Bearer ${token}` } : {},
      body: formData,
    }).then(res => res.json());
  },
  uploadMultiple: (formData: FormData) => {
    const token = localStorage.getItem('authToken');
    return fetch(`${API_BASE_URL}/files/upload-multiple`, {
      method: 'POST',
      headers: token ? { 'Authorization': `Bearer ${token}` } : {},
      body: formData,
    }).then(res => res.json());
  },
  getById: (id: string) => apiService.get<any>(`/files/${id}`),
  getRelated: (model: string, id: string) => apiService.get<any>(`/files/related/${model}/${id}`),
  delete: (id: string) => apiService.delete<any>(`/files/${id}`),
};

export const paymentApi = {
  getAll: (filters?: any) => 
    apiService.get<PaginatedResponse<any>>(`/payments?${new URLSearchParams(filters).toString()}`),
  getById: (id: string) => apiService.get<any>(`/payments/${id}`),
  create: (data: any) => apiService.post<any>('/payments', data),
  updateStatus: (id: string, data: any) => apiService.patch<any>(`/payments/${id}/status`, data),
  getStats: (startDate?: string, endDate?: string) => {
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    return apiService.get<any>(`/payments/stats/overview?${params.toString()}`);
  },
};

export const leaveApi = {
  getAll: (filters?: any) => 
    apiService.get<PaginatedResponse<any>>(`/leave?${new URLSearchParams(filters).toString()}`),
  getById: (id: string) => apiService.get<any>(`/leave/${id}`),
  create: (data: any) => apiService.post<any>('/leave', data),
  updateStatus: (id: string, data: any) => apiService.patch<any>(`/leave/${id}/status`, data),
  delete: (id: string) => apiService.delete<any>(`/leave/${id}`),
};

export const notificationApi = {
  getUserNotifications: (userId: string, filters?: any) => 
    apiService.get<PaginatedResponse<any>>(`/notifications/user/${userId}?${new URLSearchParams(filters).toString()}`),
  markAsRead: (id: string) => apiService.patch<any>(`/notifications/${id}/read`, {}),
  markAllAsRead: (userId: string) => apiService.patch<any>(`/notifications/user/${userId}/read-all`, {}),
  create: (data: any) => apiService.post<any>('/notifications', data),
  delete: (id: string) => apiService.delete<any>(`/notifications/${id}`),
  getUnreadCount: (userId: string) => apiService.get<any>(`/notifications/user/${userId}/unread-count`),
};

export const authApi = {
  login: (email: string, password: string) => apiService.post<any>('/auth/login', { email, password }),
  signup: (name: string, email: string, password: string) => apiService.post<any>('/auth/signup', { name, email, password }),
  me: () => apiService.get<any>('/auth/me'),
};

export const contentApi = {
  getPageContent: (pageType: string) => apiService.get<any>(`/pages/public/${pageType}`),
  updatePageContent: (pageType: string, data: any) => apiService.put<any>(`/pages/${pageType}`, data),
};

export const pricingApi = {
  getPricing: (category: string) => apiService.get<any>(`/pricing/${category}`),
  updatePricing: (category: string, data: any) => apiService.put<any>(`/pricing/${category}`, data),
};

export const blogsApi = {
  getAll: (filters?: any) =>
    apiService.get<PaginatedResponse<any>>(`/blogs?${new URLSearchParams(filters).toString()}`),
  getById: (id: string) => apiService.get<any>(`/blogs/${id}`),
  create: (data: any) => apiService.post<any>('/blogs', data),
  update: (id: string, data: any) => apiService.put<any>(`/blogs/${id}`, data),
  delete: (id: string) => apiService.delete<any>(`/blogs/${id}`),
  getStats: () => apiService.get<any>('/blogs/stats'),
};

export const teamApi = {
  getAll: (filters?: any) =>
    apiService.get<PaginatedResponse<any>>(`/team?${new URLSearchParams(filters).toString()}`),
  getById: (id: string) => apiService.get<any>(`/team/${id}`),
  create: (data: any) => apiService.post<any>('/team', data),
  update: (id: string, data: any) => apiService.put<any>(`/team/${id}`, data),
  delete: (id: string) => apiService.delete<any>(`/team/${id}`),
  getStats: () => apiService.get<any>('/team/stats'),
  getDepartments: () => apiService.get<any[]>('/team/departments'),
};

