'use client';

import { useCallback, useEffect } from 'react';
import { renderToString } from 'react-dom/server';
import { Theme, useThemeContext } from '@/providers/theme/ThemeProvider';

import { FaBus, FaMapMarker, FaPlane } from 'react-icons/fa';
import mapDarkStyles from './dark';
import mapLightStyles from './light';

declare global {
  interface Window {
    initMap: () => void;
  }
}

export default function GMap() {
  const { theme } = useThemeContext();

  const getMapStyles = useCallback(() => {
    let activeTheme = theme;
    if (theme === Theme.AUTO) {
      const prefersDarkMode =
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches;
      activeTheme = prefersDarkMode ? Theme.DARK : Theme.LIGHT;
    }

    return activeTheme === Theme.DARK ? mapDarkStyles : mapLightStyles;
  }, [theme]);

  const initMap = useCallback(() => {
    const point1 = { lat: 10.49158, lng: -66.85092 }; // Caracas, Venezuela
    const point2 = { lat: 7.74957, lng: -72.23547 }; // Táchira, Venezuela
    const point3 = { lat: 7.92802, lng: -72.507 }; // Cúcuta, Colombia
    const point4 = { lat: 4.70118, lng: -74.14588 }; // Bogota, Colombia
    const point5 = { lat: -34.81576, lng: -58.53542 }; // Buenos Aires, Argentina

    const mapElement = document.getElementById('map');
    if (!mapElement) return;

    const map = new google.maps.Map(mapElement, {
      zoom: 4,
      center: { lat: -12.5, lng: -65.0 },
      styles: getMapStyles(),
    });

    const createIcon = (icon: JSX.Element) => ({
      url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(renderToString(icon))}`,
      scaledSize: new google.maps.Size(20, 20),
    });

    const busIcon = createIcon(<FaBus color="black" />);
    const airplaneIcon = createIcon(<FaPlane color="black" />);
    const destinationIcon = createIcon(<FaMapMarker color="black" />);

    const createMarker = (position: google.maps.LatLngLiteral, icon: google.maps.Icon) => {
      new google.maps.Marker({
        position,
        map,
        icon,
      });
    };

    createMarker(point1, busIcon);
    createMarker(point3, airplaneIcon);
    createMarker(point4, airplaneIcon);
    createMarker(point5, destinationIcon);

    const createPolyline = (path: google.maps.LatLngLiteral[]) => {
      const polyline = new google.maps.Polyline({
        path,
        geodesic: true,
        strokeColor: '#6087cf',
        strokeOpacity: 1.0,
        strokeWeight: 2,
      });
      polyline.setMap(map);
    };

    createPolyline([point1, point2]);
    createPolyline([point2, point3]);
    createPolyline([point3, point4]);
    createPolyline([point4, point5]);
  }, [getMapStyles]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&callback=initMap`;
    script.async = true;
    script.defer = true;
    window.initMap = initMap;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [initMap]);

  useEffect(() => {
    if (typeof google !== 'undefined' && google.maps) {
      initMap();
    }
  }, [initMap]);

  return <div id="map" style={{ height: '700px', width: '100%' }} />;
}