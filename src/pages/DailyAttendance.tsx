// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Select, DatePicker, message, Space } from 'antd';
import dayjs from 'dayjs';

const { Option } = Select;

export default function DailyAttendance() {
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/attendance');
      const json = await res.json();
      setData(json);
    } catch (error) {
      message.error('Failed to fetch attendance data');
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/users');
      const json = await res.json();
      setUsers(json);
    } catch (error) {
      message.error('Failed to fetch users');
    }
  };

  useEffect(() => {
    fetchData();
    fetchUsers();
  }, []);

  const handleAdd = () => {
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const payload = {
        ...values,
        date: values.date.format('YYYY-MM-DD'),
      };
      
      const res = await fetch('/api/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      
      if (res.ok) {
        message.success('Attendance record added successfully');
        setIsModalVisible(false);
        fetchData();
      } else {
        message.error('Failed to add record');
      }
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Employee Name', dataIndex: 'name', key: 'name' },
    { title: 'Department', dataIndex: 'department', key: 'department' },
    { title: 'Date', dataIndex: 'date', key: 'date' },
    { 
      title: 'Status', 
      dataIndex: 'status', 
      key: 'status',
      render: (status: string) => {
        let color = 'green';
        if (status === 'Absent') color = 'red';
        if (status === 'Late') color = 'orange';
        if (status === 'Leave' || status === 'Trip' || status === 'TimeOff') color = 'blue';
        return <span style={{ color, fontWeight: 'bold' }}>{status}</span>;
      }
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Daily Attendance</h1>
        <Button type="primary" onClick={handleAdd}>Add Record</Button>
      </div>

      <Table 
        columns={columns} 
        dataSource={data} 
        rowKey="id" 
        loading={loading}
      />

      <Modal
        title="Add Attendance Record"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="user_id" label="Employee" rules={[{ required: true }]}>
            <Select placeholder="Select an employee">
              {users.map((u: any) => (
                <Option key={u.id} value={u.id}>{u.name} ({u.department})</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="date" label="Date" rules={[{ required: true }]}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="status" label="Status" rules={[{ required: true }]}>
            <Select placeholder="Select status">
              <Option value="Present">Present</Option>
              <Option value="Absent">Absent</Option>
              <Option value="Late">Late</Option>
              <Option value="Leave">Leave</Option>
              <Option value="Trip">Business Trip</Option>
              <Option value="TimeOff">Time Off</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
