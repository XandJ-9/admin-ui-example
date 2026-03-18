import { 
  AttendanceRecord, 
  AttendanceRequest, 
  MonthlySummaryRecord, 
  EmployeeRecord 
} from '../types';
import request from '../utils/request';

const BASE_URL = '/attendance';

export const attendanceApi = {
  getDailyAttendance: async (): Promise<AttendanceRecord[]> => {
    return request.get(`${BASE_URL}/daily`);
  },
  addAttendanceRecords: async (records: AttendanceRecord[]): Promise<void> => {
    return request.post(`${BASE_URL}/daily`, records);
  },

  getAttendanceRequests: async (): Promise<AttendanceRequest[]> => {
    return request.get(`${BASE_URL}/requests`);
  },
  addAttendanceRequest: async (requestData: AttendanceRequest): Promise<void> => {
    return request.post(`${BASE_URL}/requests`, requestData);
  },

  getMonthlySummary: async (): Promise<MonthlySummaryRecord[]> => {
    return request.get(`${BASE_URL}/summary`);
  },

  getEmployees: async (): Promise<EmployeeRecord[]> => {
    return request.get(`${BASE_URL}/employees`);
  },
  addEmployee: async (employee: EmployeeRecord): Promise<void> => {
    return request.post(`${BASE_URL}/employees`, employee);
  },
  updateEmployee: async (key: string, data: Partial<EmployeeRecord>): Promise<void> => {
    return request.put(`${BASE_URL}/employees/${key}`, data);
  },
  deleteEmployee: async (key: string): Promise<void> => {
    return request.delete(`${BASE_URL}/employees/${key}`);
  },
  batchAddEmployees: async (employees: EmployeeRecord[]): Promise<void> => {
    return request.post(`${BASE_URL}/employees/batch`, employees);
  },
};
