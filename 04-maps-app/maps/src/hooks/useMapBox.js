import mapboxgl from 'mapbox-gl';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Subject } from 'rxjs';
import { v4 as uuid } from 'uuid';

mapboxgl.accessToken = 'pk.eyJ1IjoieW9yZGkyMyIsImEiOiJja2x1NWo2eHQwY3gyMnZvNHhmOTN1d2l0In0.4589zX5E8pybw8FFCrWA-A';

export const useMapBox = (startPoint) => {
    const mapDiv = useRef();
    const setRef = useCallback((node) => {
        mapDiv.current = node;
    }, []);

    const markers = useRef({});

    const markerMovement = useRef(new Subject());
    const newMarker = useRef(new Subject());

    const map = useRef();
    const [coords, setCoords] = useState(startPoint);

    const createMarker = useCallback((e) => {
        const { lng, lat } = e.lngLat || e;

        const marker = new mapboxgl.Marker();
        marker.id = e.id || uuid();

        marker.setLngLat([lng, lat])
            .addTo(map.current)
            .setDraggable(true);

        markers.current[marker.id] = marker;

        if (!e.id) newMarker.current.next({ id: marker.id, lng, lat });

        //Listen to marker movement
        marker.on('drag', ({ target }) => {
            const { id } = target;
            const { lng, lat } = target.getLngLat();

            markerMovement.current.next({ id, lng, lat });
        });
    }, []);

    const updateMarker = useCallback(({ id, lng, lat }) => {
        markers.current[id].setLngLat([lng, lat]);
    }, []);

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
        map.current.on('click', createMarker);
        // Equal to:
        //
        // map.current.on('click', (e) => {
        //     createMarker(e);
        // });

    }, [createMarker]);

    return {
        coords,
        createMarker,
        markers,
        newMarker$: newMarker.current,
        markerMovement$: markerMovement.current,
        setRef,
        updateMarker
    };
};
