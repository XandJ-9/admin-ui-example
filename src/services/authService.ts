import { LoginParams, AuthResponse } from '../types';
import { authMockApi } from '../mock/authMock';
import { authApi } from '../api/authApi';
import { USE_MOCK } from './config';

class AuthService {
  async login(params: LoginParams): Promise<AuthResponse> {
    const response = await (USE_MOCK ? authMockApi.login(params) : authApi.login(params));
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
    return response;
  }

  async logout(): Promise<void> {
    try {
      await (USE_MOCK ? authMockApi.logout() : authApi.logout());
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }

  async getCurrentUser(): Promise<AuthResponse['user']> {
    return USE_MOCK ? authMockApi.getCurrentUser() : authApi.getCurrentUser();
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getUser(): AuthResponse['user'] | null {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }
}

export const authService = new AuthService();
