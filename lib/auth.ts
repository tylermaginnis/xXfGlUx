import api from './api';
import { mockApi, isMockMode } from './mock-api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignUpData {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  tier?: 'GOLD' | 'BLACK';
}

export interface User {
  id: string;
  email: string;
  role: 'MEMBER' | 'PARTNER' | 'ADMIN';
  tier?: 'GOLD' | 'BLACK';
  firstName?: string;
  lastName?: string;
}

export const authService = {
  async login(credentials: LoginCredentials) {
    // Use mock API if enabled
    if (isMockMode) {
      const response = await mockApi.login(credentials.email, credentials.password);
      if (response.access_token) {
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('user', JSON.stringify(response.user));
      }
      return response;
    }

    // Use real API
    const response = await api.post('/auth/login', credentials);
    if (response.data.access_token) {
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  async signUp(data: SignUpData) {
    // Use mock API if enabled
    if (isMockMode) {
      const response = await mockApi.signUp(data);
      if (response.access_token) {
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('user', JSON.stringify(response.user));
      }
      return response;
    }

    // Use real API
    const response = await api.post('/auth/signup', data);
    if (response.data.access_token) {
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  async logout() {
    try {
      if (isMockMode) {
        await mockApi.logout();
      } else {
        await api.post('/auth/logout');
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
  },

  getCurrentUser(): User | null {
    if (typeof window === 'undefined') return null;
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('access_token');
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },
};





