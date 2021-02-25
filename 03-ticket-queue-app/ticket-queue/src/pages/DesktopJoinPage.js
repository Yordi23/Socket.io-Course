import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  InputNumber,
  Typography,
  Divider,
} from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { Redirect, useHistory } from 'react-router-dom';
import { useHideMenu } from '../hooks/useHideMenu';
import { getUserFromStorage } from '../helpers/getUserFromStorage';

const { Title, Text } = Typography;
const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 14,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 4,
    span: 14,
  },
};

export const DesktopJoinPage = () => {
  const history = useHistory();
  const [agent] = useState(getUserFromStorage());

  useHideMenu(false);

  const onFinish = ({ name, desktop }) => {
    localStorage.setItem('name', name);
    localStorage.setItem('desktop', desktop);

    history.push('/desktop');
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  if (agent.name && agent.desktop) {
    return <Redirect to="/desktop" />;
  }

  return (
    <>
      <Title level={2}>Join</Title>
      <Text>Enter your name and desktop number</Text>
      <Divider />
      <Form
        {...layout}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input your name!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Desktop"
          name="desktop"
          rules={[
            {
              required: true,
              message: 'Please input your desktop number!',
            },
          ]}
        >
          <InputNumber min={1} max={99} />
        </Form.Item>

        <Form.Item
          {...tailLayout}
          name="remember"
          valuePropName="checked"
        ></Form.Item>

        <Form.Item {...tailLayout}>
          <Button
            type="primary"
            htmlType="submit"
            shape="round"
          >
            <SaveOutlined />
            Join
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
