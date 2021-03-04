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
	const [map, setMap] = useState();
	const [coords, setCoords] = useState(startPoint);

	useEffect(() => {
		const newMap = new mapboxgl.Map({
			container: mapDiv.current,
			style: 'mapbox://styles/mapbox/streets-v11',
			center: [startPoint.lng, startPoint.lat],
			zoom: startPoint.zoom
		});

		setMap(newMap);

	}, []);

	useEffect(() => {
		map?.on('move', () => {
			const { lng, lat } = map.getCenter();
			const zoom = map.getZoom();

			setCoords({
				lng: lng.toFixed(4),
				lat: lat.toFixed(4),
				zoom: zoom.toFixed(2),
			});
		});
	}, [map]);

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
