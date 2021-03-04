import {
  Row,
  Col,
  Typography,
  List,
  Card,
  Tag,
  Divider,
} from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../context/SocketContex';
import { useHideMenu } from '../hooks/useHideMenu';

const { Title, Text } = Typography;

export const QueuePage = () => {
  useHideMenu(true);
  const { socket } = useContext(SocketContext)
  const [tickets, setTickets] = useState([])

  useEffect(() => {
    socket.on('assigned-ticket', (data) => {
      console.log(data)
      setTickets(data)
    })

    return () => {
      socket.off('assigned-ticket')
    }
  }, [socket])

  return (
    <>
      <Title level={1}>Attending client</Title>
      <Row>
        <Col span={12}>
          <List
            dataSource={tickets.slice(0, 3)}
            renderItem={(ticket) => (
              <List.Item>
                <Card
                  style={{ width: 300, marginTop: 16 }}
                  actions={[
                    <Tag color="volcano">
                      {ticket.agent}
                    </Tag>,
                    <Tag color="magenta">
                      Desktop: {ticket.desktop}
                    </Tag>,
                  ]}
                >
                  <Title>No. {ticket.number}</Title>
                </Card>
              </List.Item>
            )}
          />
        </Col>
        <Col span={12}>
          <Divider>History</Divider>
          <List
            dataSource={tickets.slice(3)}
            renderItem={(ticket) => (
              <List.Item>
                <List.Item.Meta
                  title={`Ticket No. ${ticket.number}`}
                  description={
                    <>
                      <Text type="secondary">
                        Desktop:{' '}
                      </Text>
                      <Tag color="magenta">
                        {ticket.number}
                      </Tag>
                      <Text type="secondary">Agent: </Text>
                      <Tag color="volcano">
                        {ticket.agent}
                      </Tag>
                    </>
                  }
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </>
  );
};
