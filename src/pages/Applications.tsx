// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Select, DatePicker, Input, message, Tag, Space } from 'antd';
import dayjs from 'dayjs';

const { Option } = Select;
const { RangePicker } = DatePicker;

export default function Applications() {
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/applications');
      const json = await res.json();
      setData(json);
    } catch (error) {
      message.error('Failed to fetch applications');
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
        user_id: values.user_id,
        type: values.type,
        start_date: values.dateRange[0].format('YYYY-MM-DD'),
        end_date: values.dateRange[1].format('YYYY-MM-DD'),
        reason: values.reason,
      };
      
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      
      if (res.ok) {
        message.success('Application submitted successfully');
        setIsModalVisible(false);
        fetchData();
      } else {
        message.error('Failed to submit application');
      }
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const updateStatus = async (id: number, status: string) => {
    try {
      const res = await fetch(`/api/applications/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        message.success(`Application ${status.toLowerCase()}`);
        fetchData();
      }
    } catch (error) {
      message.error('Failed to update status');
    }
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Employee Name', dataIndex: 'name', key: 'name' },
    { title: 'Type', dataIndex: 'type', key: 'type' },
    { title: 'Start Date', dataIndex: 'start_date', key: 'start_date' },
    { title: 'End Date', dataIndex: 'end_date', key: 'end_date' },
    { title: 'Reason', dataIndex: 'reason', key: 'reason' },
    { 
      title: 'Status', 
      dataIndex: 'status', 
      key: 'status',
      render: (status: string) => {
        let color = status === 'Approved' ? 'green' : status === 'Rejected' ? 'red' : 'orange';
        return <Tag color={color}>{status}</Tag>;
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="middle">
          {record.status === 'Pending' && (
            <>
              <Button type="link" onClick={() => updateStatus(record.id, 'Approved')}>Approve</Button>
              <Button type="link" danger onClick={() => updateStatus(record.id, 'Rejected')}>Reject</Button>
            </>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Applications</h1>
        <Button type="primary" onClick={handleAdd}>New Application</Button>
      </div>

      <Table 
        columns={columns} 
        dataSource={data} 
        rowKey="id" 
        loading={loading}
      />

      <Modal
        title="New Application"
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
          <Form.Item name="type" label="Application Type" rules={[{ required: true }]}>
            <Select placeholder="Select type">
              <Option value="Leave">Leave</Option>
              <Option value="Trip">Business Trip</Option>
              <Option value="TimeOff">Time Off</Option>
              <Option value="Abnormal">Abnormal Application</Option>
            </Select>
          </Form.Item>
          <Form.Item name="dateRange" label="Date Range" rules={[{ required: true }]}>
            <RangePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="reason" label="Reason" rules={[{ required: true }]}>
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
