import React, { useContext, useState } from 'react';
import { SocketContext } from '../contex/SocketContex';

export const BandAdd = () => {
  const [name, setName] = useState('');
  const { socket } = useContext(SocketContext);

  const onSubmit = (e) => {
    e.preventDefault();

    if (name.trim().length > 0) {
      socket.emit('create-band', { name });
      setName('');
    }
  };
  return (
    <div>
      <h3> Add band</h3>

      <form onSubmit={onSubmit}>
        <input
          className="form-control"
          placeholder="Band name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </form>
    </div>
  );
};
