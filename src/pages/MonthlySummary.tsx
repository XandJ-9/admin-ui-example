import React, { useState, useEffect } from 'react';
import { Table, DatePicker, message } from 'antd';
import dayjs from 'dayjs';

export default function MonthlySummary() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [month, setMonth] = useState<dayjs.Dayjs | null>(dayjs());

  const fetchSummary = async (selectedMonth: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/summary?month=${selectedMonth}`);
      if (res.ok) {
        const json = await res.json();
        setData(json);
      } else {
        message.error('Failed to fetch summary');
      }
    } catch (error) {
      message.error('Failed to fetch summary');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (month) {
      fetchSummary(month.format('YYYY-MM'));
    }
  }, [month]);

  const columns = [
    { title: 'Employee ID', dataIndex: 'user_id', key: 'user_id' },
    { title: 'Employee Name', dataIndex: 'name', key: 'name' },
    { title: 'Department', dataIndex: 'department', key: 'department' },
    { title: 'Present', dataIndex: 'present', key: 'present' },
    { title: 'Absent', dataIndex: 'absent', key: 'absent' },
    { title: 'Late', dataIndex: 'late', key: 'late' },
    { title: 'Leave', dataIndex: 'leave', key: 'leave' },
    { title: 'Business Trip', dataIndex: 'trip', key: 'trip' },
    { title: 'Time Off', dataIndex: 'timeOff', key: 'timeOff' },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Monthly Summary</h1>
        <DatePicker 
          picker="month" 
          value={month} 
          onChange={(date) => setMonth(date)} 
          allowClear={false}
        />
      </div>

      <Table 
        columns={columns} 
        dataSource={data} 
        rowKey="user_id" 
        loading={loading}
      />
    </div>
  );
}
