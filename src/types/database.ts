
// Database models for MongoDB integration

export interface User {
  _id?: string;
  name: string;
  email: string;
  role: 'ceo' | 'hod' | 'hr' | 'employee' | 'intern' | 'auditor';
  department?: string;
  password?: string; // Will be hashed in backend
  createdAt?: Date;
  updatedAt?: Date;
  isActive?: boolean;
}

export interface Department {
  _id?: string;
  name: string;
  code: string; // e.g., 'web-mobile', 'ai-dev'
  hodId?: string;
  budget?: number;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Employee {
  _id?: string;
  userId: string; // Reference to User
  employeeId: string; // Unique employee ID
  departmentId: string; // Reference to Department
  position: string;
  salary?: number;
  joinDate: Date;
  phone?: string;
  address?: string;
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
  performance?: {
    rating: number;
    reviews: Array<{
      date: Date;
      rating: number;
      comments: string;
      reviewerId: string;
    }>;
  };
  status: 'active' | 'on_leave' | 'inactive' | 'terminated';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Project {
  _id?: string;
  name: string;
  description?: string;
  departmentId: string;
  managerId: string; // Employee who manages the project
  teamMembers: string[]; // Array of employee IDs
  budget?: number;
  startDate: Date;
  endDate?: Date;
  status: 'planning' | 'active' | 'on_hold' | 'completed' | 'cancelled';
  progress: number; // 0-100
  milestones?: Array<{
    name: string;
    description?: string;
    dueDate: Date;
    completed: boolean;
    completedDate?: Date;
  }>;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Intern {
  _id?: string;
  name: string;
  email: string;
  phone?: string;
  university: string;
  program: string;
  departmentId: string;
  supervisorId: string; // Employee ID
  startDate: Date;
  endDate: Date;
  stipend?: number;
  status: 'active' | 'completed' | 'terminated';
  performance?: {
    rating: number;
    feedback: string;
    evaluatedBy: string;
    evaluatedAt: Date;
  };
  documents?: {
    resume?: string; // File path or URL
    coverLetter?: string;
    university_verification?: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

export interface LeaveRequest {
  _id?: string;
  employeeId: string;
  type: 'sick' | 'vacation' | 'personal' | 'maternity' | 'other';
  startDate: Date;
  endDate: Date;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  approvedBy?: string;
  approvedAt?: Date;
  rejectionReason?: string;
  documents?: string[]; // File paths for supporting documents
  createdAt?: Date;
  updatedAt?: Date;
}

export interface SystemAnalytics {
  _id?: string;
  date: Date;
  metrics: {
    totalUsers: number;
    activeProjects: number;
    completionRate: number;
    systemUptime: number;
    departmentPerformance: Array<{
      departmentId: string;
      performance: number;
      revenue: number;
      projectCount: number;
    }>;
    monthlyRevenue: number;
    newHires: number;
  };
  createdAt?: Date;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Query filters
export interface StaffFilters {
  department?: string;
  status?: string;
  position?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export interface ProjectFilters {
  department?: string;
  status?: string;
  manager?: string;
  search?: string;
  page?: number;
  limit?: number;
}
