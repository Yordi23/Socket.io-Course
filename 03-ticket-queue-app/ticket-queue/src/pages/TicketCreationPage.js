import { DownloadOutlined } from '@ant-design/icons';
import { Row, Col, Typography, Button } from 'antd';
import React from 'react';

const { Title, Text } = Typography;

export const TicketCreationPage = () => {
  const newTicket = () => {};
  return (
    <>
      <Row>
        <Col span={14} offset={6} align="center">
          <Title level={3}>
            Press button to create new ticket
          </Title>

          <Button
            type="primary"
            shape="round"
            icon={<DownloadOutlined />}
            size="large"
            onClick={newTicket}
          >
            New Ticket
          </Button>
        </Col>
      </Row>

      <Row style={{ marginTop: 100 }}>
        <Col span={14} offset={6} align="center">
          <Text level={2}>Your number</Text>
          <br />
          <Text type="success" style={{ fontSize: 55 }}>
            23
          </Text>
        </Col>
      </Row>
    </>
  );
};
