const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}

interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  profilePicture?: string;
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthResponse {
  user: User;
  token: string;
}

interface SignupData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface LoginData {
  email: string;
  password: string;
}

class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public errors?: Array<{ field: string; message: string }>
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

class AuthService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const token = localStorage.getItem('authToken');
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
      const data = await response.json();

      if (!response.ok) {
        throw new ApiError(
          data.message || 'An error occurred',
          response.status,
          data.errors
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

  async signup(signupData: SignupData): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(signupData),
    });

    if (response.data) {
      // Store token in localStorage
      localStorage.setItem('authToken', response.data.token);
      return response.data;
    }

    throw new ApiError('Signup failed', 500);
  }

  async login(loginData: LoginData): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(loginData),
    });

    if (response.data) {
      // Store token in localStorage
      localStorage.setItem('authToken', response.data.token);
      return response.data;
    }

    throw new ApiError('Login failed', 500);
  }

  async getProfile(): Promise<User> {
    const response = await this.request<{ user: User }>('/auth/profile');
    
    if (response.data) {
      return response.data.user;
    }

    throw new ApiError('Failed to get profile', 500);
  }

  async updateProfile(updates: Partial<Pick<User, 'firstName' | 'lastName' | 'profilePicture'>>): Promise<User> {
    const response = await this.request<{ user: User }>('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(updates),
    });

    if (response.data) {
      return response.data.user;
    }

    throw new ApiError('Failed to update profile', 500);
  }

  async logout(): Promise<void> {
    try {
      await this.request('/auth/logout', {
        method: 'POST',
      });
    } catch (error) {
      // Continue with logout even if API call fails
      console.warn('Logout API call failed:', error);
    } finally {
      // Always remove token from localStorage
      localStorage.removeItem('authToken');
    }
  }

  async checkHealth(): Promise<{ status: string; message: string; timestamp: string }> {
    const response = await this.request<{ status: string; message: string; timestamp: string }>('/health');
    
    if (response.data) {
      return response.data;
    }

    throw new ApiError('Health check failed', 500);
  }

  // Helper method to check if user is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  // Helper method to get the stored token
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }
}

export const authService = new AuthService();
export { ApiError };
export type { User, AuthResponse, SignupData, LoginData };
