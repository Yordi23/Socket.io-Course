import React, { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../contex/SocketContex';

export const BandList = () => {
  const [bands, setBands] = useState([]);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    socket.on('current-bands', (bands) => {
      setBands(bands);
    });

    return () => socket.off('current-bands');
  }, [socket]);

  const nameChanged = (event, id) => {
    const newName = event.target.value;
    setBands((bands) =>
      bands.map((band) => {
        if (band.id === id) band.name = newName;
        return band;
      })
    );
  };

  const onBlur = (id, name) => {
    socket.emit('update-band-name', { id, name });
  };

  const voteBand = (id) => {
    socket.emit('vote-band', { id });
  };

  const deleteBand = (id) => {
    socket.emit('delete-band', { id });
  };

  return (
    <div>
      <table className="table table-stripped">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Votes</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {bands.map((band) => (
            <tr key={band.id}>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => voteBand(band.id)}
                >
                  +1
                </button>
              </td>
              <td>
                <input
                  className="form-control"
                  value={band.name}
                  onChange={(event) => nameChanged(event, band.id)}
                  onBlur={() => onBlur(band.id, band.name)}
                />
              </td>
              <td>
                <h3>{band.votes}</h3>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteBand(band.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
