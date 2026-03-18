import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { App as AntdApp } from 'antd';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/dashboard';
import UserManagement from './pages/system/UserManagement';
import RoleManagement from './pages/system/RoleManagement';
import MenuManagement from './pages/system/MenuManagement';
import DailyAttendance from './pages/attendance/DailyAttendance';
import EmployeeManagement from './pages/attendance/EmployeeManagement';
import AttendanceRequest from './pages/attendance/AttendanceRequest';
import MonthlySummary from './pages/attendance/MonthlySummary';
import LoginPage from './pages/login';
import { ThemeProvider } from './contexts/ThemeContext';
import { authService } from './services/authService';

const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = authService.isAuthenticated();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AntdApp>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/*"
              element={
                <RequireAuth>
                  <MainLayout>
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/system/users" element={<UserManagement />} />
                      <Route path="/system/roles" element={<RoleManagement />} />
                      <Route path="/system/menus" element={<MenuManagement />} />
                      <Route path="/attendance/employee" element={<EmployeeManagement />} />
                      <Route path="/attendance/daily" element={<DailyAttendance />} />
                      <Route path="/attendance/request" element={<AttendanceRequest />} />
                      <Route path="/attendance/summary" element={<MonthlySummary />} />
                    </Routes>
                  </MainLayout>
                </RequireAuth>
              }
            />
          </Routes>
        </Router>
      </AntdApp>
    </ThemeProvider>
  );
};

export default App;
