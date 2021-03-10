import React, { useContext, useEffect, useRef, useState } from 'react';
import { SocketContext } from '../context/SocketContext';
import { useMapBox } from '../hooks/useMapBox';

const startPoint = {
	lng: 5,
	lat: 32,
	zoom: 2
};

export const MapPage = () => {
	const { coords, setRef, newMarker$, markerMovement$, createMarker } = useMapBox(startPoint);
	const { socket } = useContext(SocketContext);

	useEffect(() => {
		socket.on('active-markers', (markers) => {
			for (const marker of Object.values(markers)) {
				createMarker(marker);
			}
		});
	}, [socket, createMarker]);

	useEffect(() => {
		newMarker$.subscribe(marker => {
			socket.emit('new-marker', marker);
		});

	}, [newMarker$, socket]);

	useEffect(() => {
		markerMovement$.subscribe(marker => {
			console.log(marker);
		});

	}, [markerMovement$]);

	useEffect(() => {
		socket.on('new-marker', (marker) => {
			createMarker(marker);
		});
	}, [socket, createMarker]);

	return <>
		<div className='info'>
			Lng: {coords.lng} | Lat: {coords.lat} | Zoom: {coords.zoom}
		</div>
		<div
			ref={setRef}
			className="mapContainer">

		</div>
	</>;
};
