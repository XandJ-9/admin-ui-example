// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Statistic } from 'antd';
import { UserOutlined, FileTextOutlined, CheckCircleOutlined } from '@ant-design/icons';

export default function Dashboard() {
  const [stats, setStats] = useState({ users: 0, applications: 0, attendance: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, appsRes, attRes] = await Promise.all([
          fetch('/api/users'),
          fetch('/api/applications'),
          fetch('/api/attendance')
        ]);
        const users = await usersRes.json();
        const apps = await appsRes.json();
        const att = await attRes.json();
        
        setStats({
          users: users.length,
          applications: apps.length,
          attendance: att.length
        });
      } catch (error) {
        console.error("Failed to fetch stats", error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Employees"
              value={stats.users}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Applications"
              value={stats.applications}
              prefix={<FileTextOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Attendance Records"
              value={stats.attendance}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
