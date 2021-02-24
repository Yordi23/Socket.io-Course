import React from 'react';
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import {
  Link,
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { DesktopJoinPage } from './DesktopJoinPage';
import { QueuePage } from './QueuePage';
import { TicketCreationPage } from './TicketCreationPage';
import { DesktopPage } from './DesktopPage';

const { Sider, Content } = Layout;

export const RouterPage = () => {
  return (
    <Router>
      <Layout style={{ height: '100vh' }}>
        <Sider>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
          >
            <Menu.Item key="1" icon={<UserOutlined />}>
              <Link to="/join-desktop">Join Desktop</Link>
            </Menu.Item>
            <Menu.Item
              key="2"
              icon={<VideoCameraOutlined />}
            >
              <Link to="/queue">Queue</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              <Link to="/create-ticket">Create Ticket</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            <Switch>
              <Route
                path="/join-desktop"
                component={DesktopJoinPage}
              />
              <Route path="/queue" component={QueuePage} />
              <Route
                path="/create-ticket"
                component={TicketCreationPage}
              />
              <Route
                path="/desktop"
                component={DesktopPage}
              />
              <Redirect to="/join-desktop" />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};
