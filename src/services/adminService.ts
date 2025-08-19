import { authService, ApiError } from './authService';

interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  adminUsers: number;
  inactiveUsers: number;
}

interface AdminUser {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

interface AdminDashboardData {
  stats: AdminStats;
  recentUsers: AdminUser[];
}

interface UsersResponse {
  users: AdminUser[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalUsers: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

class AdminService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<{ success: boolean; message: string; data?: T }> {
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      throw new ApiError('No authentication token found', 401);
    }

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
      ...options,
    };

    try {
      const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
      const data = await response.json();

      if (!response.ok) {
        throw new ApiError(
          data.message || 'An error occurred',
          response.status
        );
      }

      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      
      // Network or other errors
      throw new ApiError('Network error. Please check your connection.', 0);
    }
  }

  async getDashboardData(): Promise<AdminDashboardData> {
    const response = await this.request<AdminDashboardData>('/auth/admin/dashboard');
    
    if (response.data) {
      return response.data;
    }

    throw new ApiError('Failed to get dashboard data', 500);
  }

  async getUsers(page: number = 1, limit: number = 10): Promise<UsersResponse> {
    const response = await this.request<UsersResponse>(`/auth/admin/users?page=${page}&limit=${limit}`);
    
    if (response.data) {
      return response.data;
    }

    throw new ApiError('Failed to get users', 500);
  }

  async updateUserStatus(userId: string, isActive: boolean): Promise<AdminUser> {
    const response = await this.request<{ user: AdminUser }>(`/auth/admin/users/${userId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ isActive }),
    });

    if (response.data) {
      return response.data.user;
    }

    throw new ApiError('Failed to update user status', 500);
  }

  async updateUserRole(userId: string, role: 'user' | 'admin'): Promise<AdminUser> {
    const response = await this.request<{ user: AdminUser }>(`/auth/admin/users/${userId}/role`, {
      method: 'PUT',
      body: JSON.stringify({ role }),
    });

    if (response.data) {
      return response.data.user;
    }

    throw new ApiError('Failed to update user role', 500);
  }

  async deleteUser(userId: string): Promise<void> {
    await this.request(`/auth/admin/users/${userId}`, {
      method: 'DELETE',
    });
  }

  // Helper method to check if current user is admin
  async verifyAdminAccess(): Promise<boolean> {
    try {
      await this.getDashboardData();
      return true;
    } catch (error) {
      if (error instanceof ApiError && error.status === 403) {
        return false;
      }
      throw error;
    }
  }
}

export const adminService = new AdminService();
export type { AdminStats, AdminUser, AdminDashboardData, UsersResponse };
