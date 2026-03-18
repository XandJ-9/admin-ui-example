import React, { useState } from 'react';
import { Form, Input, Button, Card, App, Layout, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../../services/authService';

const { Content } = Layout;
const { Title, Text } = Typography;

const LoginPage: React.FC = () => {
  const { message } = App.useApp();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      await authService.login(values);
      message.success('登录成功');
      navigate(from, { replace: true });
    } catch (error: any) {
      console.error('Login failed:', error);
      message.error(error.response?.data?.message || error.message || '登录失败，请检查用户名或密码');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
      <Content className="w-full max-w-md px-4">
        <Card variant="borderless" className="shadow-xl rounded-2xl overflow-hidden">
          <div className="text-center mb-8">
            <Title level={2} className="mb-2">后台管理系统</Title>
            <Text type="secondary">请登录您的账号以继续</Text>
          </div>
          
          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            size="large"
            layout="vertical"
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: '请输入用户名!' }]}
            >
              <Input 
                prefix={<UserOutlined className="text-gray-400" />} 
                placeholder="用户名 (admin 或 user)" 
                className="rounded-lg"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入密码!' }]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="密码 (任意)"
                className="rounded-lg"
              />
            </Form.Item>

            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                className="w-full h-12 rounded-lg font-semibold text-lg mt-4"
                loading={loading}
              >
                登录
              </Button>
            </Form.Item>
            
            <div className="text-center mt-4">
              <Text type="secondary" className="text-xs">
                提示：Mock 模式下使用 admin 或 user 即可登录
              </Text>
            </div>
          </Form>
        </Card>
      </Content>
    </Layout>
  );
};

export default LoginPage;
