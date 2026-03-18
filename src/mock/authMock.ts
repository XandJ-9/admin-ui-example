import { LoginParams, AuthResponse } from '../types';

export const authMockApi = {
  login: async (params: LoginParams): Promise<AuthResponse> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (params.username === 'admin') {
          resolve({
            token: 'mock-token-admin',
            user: {
              id: 1,
              username: 'admin',
              nickname: '超级管理员',
              email: 'admin@example.com',
              role: 'admin',
              status: 'active',
              createTime: '2024-01-01 00:00:00',
            },
          });
        } else if (params.username === 'user') {
          resolve({
            token: 'mock-token-user',
            user: {
              id: 2,
              username: 'user',
              nickname: '普通用户',
              email: 'user@example.com',
              role: 'user',
              status: 'active',
              createTime: '2024-01-01 00:00:00',
            },
          });
        } else {
          reject(new Error('用户名或密码错误'));
        }
      }, 500);
    });
  },
  logout: async (): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(resolve, 300);
    });
  },
  getCurrentUser: async (): Promise<AuthResponse['user']> => {
    const token = localStorage.getItem('token');
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (token === 'mock-token-admin') {
          resolve({
            id: 1,
            username: 'admin',
            nickname: '超级管理员',
            email: 'admin@example.com',
            role: 'admin',
            status: 'active',
            createTime: '2024-01-01 00:00:00',
          });
        } else if (token === 'mock-token-user') {
          resolve({
            id: 2,
            username: 'user',
            nickname: '普通用户',
            email: 'user@example.com',
            role: 'user',
            status: 'active',
            createTime: '2024-01-01 00:00:00',
          });
        } else {
          reject(new Error('未登录'));
        }
      }, 300);
    });
  }
};
