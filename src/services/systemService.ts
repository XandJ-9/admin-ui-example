import { User, Role, Menu } from '../types';
import { systemMockApi } from '../mock/systemMock';
import { systemApi } from '../api/systemApi';
import { USE_MOCK } from './config';

class SystemService {
  // User Management
  async getUsers(): Promise<User[]> {
    return USE_MOCK ? systemMockApi.getUsers() : systemApi.getUsers();
  }
  async addUser(user: Omit<User, 'id' | 'createTime'>): Promise<User> {
    return USE_MOCK ? systemMockApi.addUser(user) : systemApi.addUser(user);
  }
  async updateUser(id: number, data: Partial<User>): Promise<void> {
    return USE_MOCK ? systemMockApi.updateUser(id, data) : systemApi.updateUser(id, data);
  }
  async deleteUser(id: number): Promise<void> {
    return USE_MOCK ? systemMockApi.deleteUser(id) : systemApi.deleteUser(id);
  }

  // Role Management
  async getRoles(): Promise<Role[]> {
    return USE_MOCK ? systemMockApi.getRoles() : systemApi.getRoles();
  }
  async addRole(role: Omit<Role, 'id' | 'createTime'>): Promise<Role> {
    return USE_MOCK ? systemMockApi.addRole(role) : systemApi.addRole(role);
  }
  async updateRole(id: number, data: Partial<Role>): Promise<void> {
    return USE_MOCK ? systemMockApi.updateRole(id, data) : systemApi.updateRole(id, data);
  }
  async deleteRole(id: number): Promise<void> {
    return USE_MOCK ? systemMockApi.deleteRole(id) : systemApi.deleteRole(id);
  }

  // Menu Management
  async getMenus(): Promise<Menu[]> {
    return USE_MOCK ? systemMockApi.getMenus() : systemApi.getMenus();
  }
}

export const systemService = new SystemService();
