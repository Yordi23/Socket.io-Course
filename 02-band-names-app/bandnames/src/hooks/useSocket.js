import { useMemo } from 'react';
import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';

export const useSocket = (serverUrl) => {
  const socket = useMemo(
    () =>
      io.connect(serverUrl, {
        transports: ['websocket'],
      }),
    [serverUrl]
  );
  const [online, setOnline] = useState(false);

  useEffect(() => {
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

  return { socket, online };
};
