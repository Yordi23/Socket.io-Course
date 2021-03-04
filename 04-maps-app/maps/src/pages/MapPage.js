import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoieW9yZGkyMyIsImEiOiJja2x1NWo2eHQwY3gyMnZvNHhmOTN1d2l0In0.4589zX5E8pybw8FFCrWA-A';
const startPoint = {
	lng: 5,
	lat: 32,
	zoom: 2
};

export const MapPage = () => {
	const mapDiv = useRef();
	const map = useRef();
	const [coords, setCoords] = useState(startPoint);

	useEffect(() => {
		const newMap = new mapboxgl.Map({
			container: mapDiv.current,
			style: 'mapbox://styles/mapbox/streets-v11',
			center: [startPoint.lng, startPoint.lat],
			zoom: startPoint.zoom
		});

		map.current = newMap;

	}, []);

	useEffect(() => {
		map.current.on('move', () => {
			const { lng, lat } = map.current.getCenter();
			const zoom = map.current.getZoom();

			setCoords({
				lng: lng.toFixed(4),
				lat: lat.toFixed(4),
				zoom: zoom.toFixed(2),
			});
		});
	}, []);

	return <>
		<div className='info'>
			Lng: {coords.lng} | Lat: {coords.lat} | Zoom: {coords.zoom}
		</div>
		<div
			ref={mapDiv}
			className="mapContainer">

		</div>
	</>;
};
