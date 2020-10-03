import '../../assets/css/map.css';
import React, { createRef, useEffect } from 'react';
import { connect } from 'react-redux';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { pickDestination } from '../../actions';

const Map = (props) => {
  const mapContainer = createRef();
  useEffect(() => {
    mapboxgl.accessToken =
      'pk.eyJ1IjoianVzdGluZWRlaG9ub3IiLCJhIjoiY2tmcWoxZ29jMWI5ZzJxczV0bTI2ZGUzNyJ9.GAJioDUOxi1Onkmy5TKhGw';
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
      center: [props.lat, props.lng], // starting position [lng, lat]
      zoom: 13, // starting zoom
      interactive: false,
    });

    if (props.hasMarker === 'true') {
      new mapboxgl.Marker().setLngLat([props.lat, props.lng]).addTo(map);
    }

    if (props.hasGeocoder === 'true') {
      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
      });
      map.addControl(geocoder);
      geocoder.on('result', (e) => props.pickDestination(e));
      geocoder.on('clear', () => props.pickDestination({ result: {} }));
    }
  }, [props, mapContainer]);
  return <div ref={mapContainer} className="mapContainer"></div>;
};

Map.defaultProps = {
  hasMarker: 'false',
  hasGeocoder: 'false',
};

export default connect(null, { pickDestination })(Map);
