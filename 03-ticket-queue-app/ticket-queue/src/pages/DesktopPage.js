import {
  ClockCircleOutlined,
  RightOutlined,
} from '@ant-design/icons';
import {
  Button,
  Col,
  Divider,
  Row,
  Typography,
} from 'antd';
import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { getUserFromStorage } from '../helpers/getUserFromStorage';
import { useHideMenu } from '../hooks/useHideMenu';

const { Title, Text } = Typography;

export const DesktopPage = () => {
  useHideMenu(false);
  const [agent] = useState(getUserFromStorage());
  const history = useHistory();

  const exit = () => {
    localStorage.clear();
    history.replace('join-desktop');
  };

  const nextTicket = () => {};

  if (!agent.name || !agent.desktop) {
    return <Redirect to="/desktop" />;
  }

  return (
    <>
      <Row>
        <Col span={20}>
          <Title level={2}>{agent.name}</Title>
          <Text>You are working on the desk number: </Text>
          <Text type="success">{agent.desktop}</Text>
        </Col>

        <Col span={4} align="right">
          <Button
            shape="round"
            type="danger"
            onClick={exit}
          >
            <ClockCircleOutlined />
            Exit
          </Button>
        </Col>
      </Row>

      <Divider />

      <Row>
        <Col>
          <Text>You are attending ticket number:</Text>
          <Text style={{ fontSize: 30 }} type="danger">
            5
          </Text>
        </Col>
      </Row>

      <Row>
        <Col offset={18} span={6} align="right">
          <Button
            shape="round"
            type="primary"
            onClick={nextTicket}
          >
            <RightOutlined />
            Next
          </Button>
        </Col>
      </Row>
    </>
  );
};
