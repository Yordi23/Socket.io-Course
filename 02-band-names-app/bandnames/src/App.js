import userEvent from '@testing-library/user-event';
import { useEffect, useState } from 'react';
import './App.css';
import { BandAdd } from './components/BandAdd';
import { BandList } from './components/BandList';
import { useSocket } from './hooks/useSocket';

function App() {
  const [bands, setBands] = useState([]);
  const { socket, online } = useSocket('http://localhost:8080/');

  useEffect(() => {
    socket.on('current-bands', (bands) => {
      console.log(bands);
      setBands(bands);
    });
  }, [socket]);

  const voteBand = (id) => {
    socket.emit('vote-band', { id });
  };

  const deleteBand = (id) => {
    socket.emit('delete-band', { id });
  };

  const updateBandName = (id, name) => {
    socket.emit('update-band-name', { id, name });
  };

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
          <BandList
            data={bands}
            voteBand={voteBand}
            deleteBand={deleteBand}
            updateBandName={updateBandName}
          />
        </div>
        <div className="col-4">
          <BandAdd />
        </div>
      </div>
    </div>
  );
}

export default App;
