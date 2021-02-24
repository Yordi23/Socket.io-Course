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
import React from 'react';

const { Title, Text } = Typography;

export const DesktopPage = () => {
  const exit = () => {};
  const nextTicket = () => {};
  return (
    <>
      <Row>
        <Col span={20}>
          <Title level={2}>User</Title>
          <Text>You are working on the desk number: </Text>
          <Text type="success">5</Text>
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
            55
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
