import mapboxgl from 'mapbox-gl';
import { useCallback, useEffect, useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';

mapboxgl.accessToken = 'pk.eyJ1IjoieW9yZGkyMyIsImEiOiJja2x1NWo2eHQwY3gyMnZvNHhmOTN1d2l0In0.4589zX5E8pybw8FFCrWA-A';

export const useMapBox = (startPoint) => {
    const mapDiv = useRef();
    const setRef = useCallback((node) => {
        mapDiv.current = node;
    }, []);

    const markers = useRef({});

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

    }, [startPoint]);

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

    useEffect(() => {
        map.current.on('click', (e) => {
            const { lng, lat } = e.lngLat;

            const marker = new mapboxgl.Marker();
            marker.id = uuid();

            marker.setLngLat([lng, lat])
                .addTo(map.current)
                .setDraggable(true);

            markers.current[marker.id] = marker;
        });
    }, []);

    return {
        coords,
        markers,
        setRef
    };
};
