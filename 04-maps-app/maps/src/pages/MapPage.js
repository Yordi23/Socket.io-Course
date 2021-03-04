import React, { useEffect, useRef, useState } from 'react';
import { useMapBox } from '../hooks/useMapBox';

const startPoint = {
	lng: 5,
	lat: 32,
	zoom: 2
};

export const MapPage = () => {
	const { coords, setRef, newMarker$, markerMovement$ } = useMapBox(startPoint);

	useEffect(() => {
		newMarker$.subscribe(marker => {
			console.log(marker);
		});

	}, [newMarker$]);

	useEffect(() => {
		markerMovement$.subscribe(marker => {
			console.log(marker);
		});

	}, [markerMovement$]);
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
