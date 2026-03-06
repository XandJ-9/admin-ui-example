import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Layout, Menu, theme } from 'antd';
import {
  UserOutlined,
  CalendarOutlined,
  FileTextOutlined,
  BarChartOutlined,
} from '@ant-design/icons';

import Dashboard from './pages/Dashboard';
import DailyAttendance from './pages/DailyAttendance';
import Applications from './pages/Applications';
import MonthlySummary from './pages/MonthlySummary';

const { Header, Content, Footer, Sider } = Layout;

const AppLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const location = useLocation();

  const menuItems = [
    {
      key: '/',
      icon: <UserOutlined />,
      label: <Link to="/">Dashboard</Link>,
    },
    {
      key: '/attendance',
      icon: <CalendarOutlined />,
      label: <Link to="/attendance">Daily Attendance</Link>,
    },
    {
      key: '/applications',
      icon: <FileTextOutlined />,
      label: <Link to="/applications">Applications</Link>,
    },
    {
      key: '/summary',
      icon: <BarChartOutlined />,
      label: <Link to="/summary">Monthly Summary</Link>,
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)', borderRadius: 6 }} />
        <Menu theme="dark" defaultSelectedKeys={[location.pathname]} mode="inline" items={menuItems} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '0 16px' }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              marginTop: 16,
            }}
          >
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/attendance" element={<DailyAttendance />} />
              <Route path="/applications" element={<Applications />} />
              <Route path="/summary" element={<MonthlySummary />} />
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Attendance Management System ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
};

export default function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}
