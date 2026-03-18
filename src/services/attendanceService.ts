import { 
  AttendanceRecord, 
  AttendanceRequest, 
  MonthlySummaryRecord, 
  EmployeeRecord 
} from '../types';
import { attendanceMockApi } from '../mock/attendanceMock';
import { attendanceApi } from '../api/attendanceApi';
import { USE_MOCK } from './config';

export const attendanceService = {
  // Daily Attendance
  getDailyAttendance: async (): Promise<AttendanceRecord[]> => {
    return USE_MOCK ? attendanceMockApi.getDailyAttendance() : attendanceApi.getDailyAttendance();
  },
  addAttendanceRecords: async (records: AttendanceRecord[]): Promise<void> => {
    return USE_MOCK ? attendanceMockApi.addAttendanceRecords(records) : attendanceApi.addAttendanceRecords(records);
  },

  // Attendance Requests
  getAttendanceRequests: async (): Promise<AttendanceRequest[]> => {
    return USE_MOCK ? attendanceMockApi.getAttendanceRequests() : attendanceApi.getAttendanceRequests();
  },
  addAttendanceRequest: async (request: AttendanceRequest): Promise<void> => {
    return USE_MOCK ? attendanceMockApi.addAttendanceRequest(request) : attendanceApi.addAttendanceRequest(request);
  },

  // Monthly Summary
  getMonthlySummary: async (): Promise<MonthlySummaryRecord[]> => {
    return USE_MOCK ? attendanceMockApi.getMonthlySummary() : attendanceApi.getMonthlySummary();
  },

  // Employee Management
  getEmployees: async (): Promise<EmployeeRecord[]> => {
    return USE_MOCK ? attendanceMockApi.getEmployees() : attendanceApi.getEmployees();
  },
  addEmployee: async (employee: EmployeeRecord): Promise<void> => {
    return USE_MOCK ? attendanceMockApi.addEmployee(employee) : attendanceApi.addEmployee(employee);
  },
  updateEmployee: async (key: string, data: Partial<EmployeeRecord>): Promise<void> => {
    return USE_MOCK ? attendanceMockApi.updateEmployee(key, data) : attendanceApi.updateEmployee(key, data);
  },
  deleteEmployee: async (key: string): Promise<void> => {
    return USE_MOCK ? attendanceMockApi.deleteEmployee(key) : attendanceApi.deleteEmployee(key);
  },
  batchAddEmployees: async (employees: EmployeeRecord[]): Promise<void> => {
    return USE_MOCK ? attendanceMockApi.batchAddEmployees(employees) : attendanceApi.batchAddEmployees(employees);
  },
};
