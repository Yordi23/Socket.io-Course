import { DownloadOutlined } from '@ant-design/icons';
import { Row, Col, Typography, Button } from 'antd';
import React, { useContext, useState } from 'react';
import { SocketContext } from '../context/SocketContex';
import { useHideMenu } from '../hooks/useHideMenu';

const { Title, Text } = Typography;

export const TicketCreationPage = () => {
	useHideMenu(true);
	const { socket } = useContext(SocketContext);
	const [ticket, setTicket] = useState(undefined);

	const newTicket = () => {
		socket.emit('create-ticket', undefined, (newTicket) => {
			setTicket(newTicket);
		});
	};
	return (
		<>
			<Row>
				<Col span={14} offset={6} align="center">
					<Title level={3}>Press button to create new ticket</Title>

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
			{ticket && (
				<Row style={{ marginTop: 100 }}>
					<Col span={14} offset={6} align="center">
						<Text level={2}>Your number</Text>
						<br />
						<Text type="success" style={{ fontSize: 55 }}>
							{ticket.number}
						</Text>
					</Col>
				</Row>
			)}
		</>
	);
};
