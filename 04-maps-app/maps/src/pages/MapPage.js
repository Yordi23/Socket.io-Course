import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = 'pk.eyJ1IjoieW9yZGkyMyIsImEiOiJja2x1NWo2eHQwY3gyMnZvNHhmOTN1d2l0In0.4589zX5E8pybw8FFCrWA-A';
const startPoint = {
	lng: 5,
	lat: 32,
	zoom: 2
}

export const MapPage = () => {
	const mapDiv = useRef();
	const [map, setMap] = useState()

	useEffect(() => {
		var map = new mapboxgl.Map({
			container: mapDiv.current,
			style: 'mapbox://styles/mapbox/streets-v11',
			center: [startPoint.lng, startPoint.lat],
			zoom: startPoint.zoom
		});

		setMap(map)

	}, [])

	return <>
		<div
			ref={mapDiv}
			className="mapContainer">

		</div>
	</>;
};
