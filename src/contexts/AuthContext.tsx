
import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService, ApiError, type User as ApiUser } from '@/services/authService';

interface User {
  id: string;
  email: string;
  name: string;
  firstName: string;
  lastName: string;
  role: string;
  isAdmin: boolean;
  profilePicture?: string;
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
  points: number; // For the existing points system
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<Pick<User, 'firstName' | 'lastName' | 'profilePicture'>>) => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Helper function to transform API user to our User interface
  const transformUser = (apiUser: ApiUser): User => ({
    id: apiUser._id,
    email: apiUser.email,
    name: `${apiUser.firstName} ${apiUser.lastName}`,
    firstName: apiUser.firstName,
    lastName: apiUser.lastName,
    role: apiUser.role,
    isAdmin: apiUser.role === 'admin',
    profilePicture: apiUser.profilePicture,
    isActive: apiUser.isActive,
    lastLogin: apiUser.lastLogin,
    createdAt: apiUser.createdAt,
    updatedAt: apiUser.updatedAt,
    points: 150, // Default points - this could be stored in a separate collection later
  });

  useEffect(() => {
    // Check for existing user session
    const checkAuth = async () => {
      try {
        if (authService.isAuthenticated()) {
          const apiUser = await authService.getProfile();
          setUser(transformUser(apiUser));
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        // Clear invalid token
        localStorage.removeItem('authToken');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const authResponse = await authService.login({ email, password });
      const transformedUser = transformUser(authResponse.user);
      setUser(transformedUser);
    } catch (error) {
      if (error instanceof ApiError) {
        throw new Error(error.message);
      }
      throw new Error('Login failed. Please try again.');
    }
  };

  const signup = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      const authResponse = await authService.signup({ email, password, firstName, lastName });
      const transformedUser = transformUser(authResponse.user);
      setUser(transformedUser);
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.errors && error.errors.length > 0) {
          throw new Error(error.errors.map(err => err.message).join(', '));
        }
        throw new Error(error.message);
      }
      throw new Error('Signup failed. Please try again.');
    }
  };

  const updateProfile = async (updates: Partial<Pick<User, 'firstName' | 'lastName' | 'profilePicture'>>) => {
    try {
      const updatedApiUser = await authService.updateProfile(updates);
      const transformedUser = transformUser(updatedApiUser);
      setUser(transformedUser);
    } catch (error) {
      if (error instanceof ApiError) {
        throw new Error(error.message);
      }
      throw new Error('Profile update failed. Please try again.');
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateProfile, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
