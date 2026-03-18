import { LoginParams, AuthResponse } from '../types';
import request from '../utils/request';

export const authApi = {
  login: async (params: LoginParams): Promise<AuthResponse> => {
    return request.post('/login', params);
  },
  logout: async (): Promise<void> => {
    return request.post('/logout');
  },
  getCurrentUser: async (): Promise<AuthResponse['user']> => {
    return request.get('/me');
  }
};
