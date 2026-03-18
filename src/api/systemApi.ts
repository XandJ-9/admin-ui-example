import { User, Role, Menu } from '../types';
import request from '../utils/request';

const BASE_URL = '/system';

export const systemApi = {
  // User Management
  getUsers: async (): Promise<User[]> => {
    return request.get(`${BASE_URL}/users`);
  },
  addUser: async (user: Omit<User, 'id' | 'createTime'>): Promise<User> => {
    return request.post(`${BASE_URL}/users`, user);
  },
  updateUser: async (id: number, data: Partial<User>): Promise<void> => {
    return request.put(`${BASE_URL}/users/${id}`, data);
  },
  deleteUser: async (id: number): Promise<void> => {
    return request.delete(`${BASE_URL}/users/${id}`);
  },

  // Role Management
  getRoles: async (): Promise<Role[]> => {
    return request.get(`${BASE_URL}/roles`);
  },
  addRole: async (role: Omit<Role, 'id' | 'createTime'>): Promise<Role> => {
    return request.post(`${BASE_URL}/roles`, role);
  },
  updateRole: async (id: number, data: Partial<Role>): Promise<void> => {
    return request.put(`${BASE_URL}/roles/${id}`, data);
  },
  deleteRole: async (id: number): Promise<void> => {
    return request.delete(`${BASE_URL}/roles/${id}`);
  },

  // Menu Management
  getMenus: async (): Promise<Menu[]> => {
    return request.get(`${BASE_URL}/menus`);
  }
};
