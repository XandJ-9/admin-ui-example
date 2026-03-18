export interface User {
  id: number;
  username: string;
  nickname: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  createTime: string;
}

export interface LoginParams {
  username: string;
  password?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface Role {
  id: number;
  name: string;
  code: string;
  description: string;
  status: 'active' | 'inactive';
  createTime: string;
}

export interface EmployeeRecord {
  key: string;
  name: string;
  department: string;
  joinDate: string;
  resignationDate?: string;
  isProbation: boolean;
  startTime: string;
  endTime: string;
}

export interface AttendanceRecord {
  key: string;
  date: string;
  name: string;
  department: string;
  clockIn: string;
  clockOut: string;
  status: string;
}

export interface AttendanceRequest {
  key: string;
  applicant: string;
  type: string;
  startTime: string;
  endTime: string;
  reason: string;
  status: string;
}

export interface MonthlySummaryRecord {
  key: string;
  name: string;
  department: string;
  requiredDays: number;
  actualDays: number;
  lateCount: number;
  earlyLeaveCount: number;
  absentDays: number;
  leaveDays: number;
}

export interface Menu {
  key: string;
  label: string;
  icon?: string;
  path?: string;
  parentId?: string;
  order?: number;
  status: 'active' | 'inactive';
  createTime: string;
}
