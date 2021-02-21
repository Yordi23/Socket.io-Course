import userEvent from '@testing-library/user-event';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import './App.css';
import { BandAdd } from './components/BandAdd';
import { BandList } from './components/BandList';

const connectSocketServer = () => {
  return io.connect('http://localhost:8080/', {
    transports: ['websocket'],
  });
};

function App() {
  const [socket] = useState(connectSocketServer());
  const [online, setOnline] = useState(false);

  useEffect(() => {
    console.log(socket);
    setOnline(socket.connected);
  }, [socket]);

  useEffect(() => {
    socket.on('connect', () => {
      setOnline(true);
    });

    socket.on('disconnect', () => {
      setOnline(false);
    });
  }, [socket]);

  return (
    <div className="container">
      <div className="alert">
        <p>
          Service status:
          {online ? (
            <span className="text-success">Online</span>
          ) : (
            <span className="text-danger">Offline</span>
          )}
        </p>
      </div>

      <h1>Band Names</h1>
      <hr />

      <div className="row">
        <div className="col-8">
          <BandList />
        </div>
        <div className="col-4">
          <BandAdd />
        </div>
      </div>
    </div>
  );
}

export default App;
