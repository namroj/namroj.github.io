'use client'

import { useEffect } from 'react'
import { renderToString } from 'react-dom/server'
import { Theme, useThemeContext } from '@/providers/theme/ThemeProvider'

import mapDarkStyles from './dark'
import mapLightStyles from './light'
import { FaBus, FaPlane, FaMapMarker } from 'react-icons/fa'

declare global {
  interface Window {
    initMap: () => void
  }
}

const GMap = () => {
  const { theme } = useThemeContext()

  useEffect(() => {
    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&callback=initMap`
    script.async = true
    script.defer = true
    window.initMap = initMap
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  useEffect(() => {
    if (typeof google !== 'undefined' && google.maps) {
      initMap()
    }
  }, [theme])

  const getMapStyles = () => {
    let activeTheme = theme
    if (theme === Theme.AUTO) {
      const prefersDarkMode =
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
      activeTheme = prefersDarkMode ? Theme.DARK : Theme.LIGHT
    }

    if (activeTheme === Theme.DARK) {
      return mapDarkStyles
    }

    return mapLightStyles
  }

  const initMap = () => {
    const point1 = { lat: 10.49158, lng: -66.85092 } // Caracas, Venezuela
    const point2 = { lat: 7.74957, lng: -72.23547 } // Táchira, Venezuela
    const point3 = { lat: 7.92802, lng: -72.507 } // Cúcuta, Colombia
    const point4 = { lat: 4.70118, lng: -74.14588 } // Bogota, Colombia
    const point5 = { lat: -34.81576, lng: -58.53542 } // Buenos Aires, Argentina

    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
      center: { lat: -12.5, lng: -65.0 },
      styles: getMapStyles(),
    })

    const busIcon = {
      url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(renderToString(<FaBus color='black' />))}`,
      scaledSize: new google.maps.Size(20, 20),
    }

    const airplaneIcon = {
      url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(renderToString(<FaPlane color='black' />))}`,
      scaledSize: new google.maps.Size(20, 20),
    }

    const destinationIcon = {
      url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(renderToString(<FaMapMarker color='black' />))}`,
      scaledSize: new google.maps.Size(20, 20),
    }

    new google.maps.Marker({
      position: point1,
      map,
      icon: busIcon,
    })

    new google.maps.Marker({
      position: point3,
      map,
      icon: airplaneIcon,
    })

    new google.maps.Marker({
      position: point4,
      map,
      icon: airplaneIcon,
    })

    new google.maps.Marker({
      position: point5,
      map,
      icon: destinationIcon,
    })

    const path1 = new google.maps.Polyline({
      path: [point1, point2],
      geodesic: true,
      strokeColor: '#6087cf',
      strokeOpacity: 1.0,
      strokeWeight: 2,
    })

    const path2 = new google.maps.Polyline({
      path: [point2, point3],
      geodesic: true,
      strokeColor: '#6087cf',
      strokeOpacity: 1.0,
      strokeWeight: 2,
    })

    const path3 = new google.maps.Polyline({
      path: [point3, point4],
      geodesic: true,
      strokeColor: '#6087cf',
      strokeOpacity: 1.0,
      strokeWeight: 2,
    })

    const path4 = new google.maps.Polyline({
      path: [point4, point5],
      geodesic: true,
      strokeColor: '#6087cf',
      strokeOpacity: 1.0,
      strokeWeight: 2,
    })

    path1.setMap(map)
    path2.setMap(map)
    path3.setMap(map)
    path4.setMap(map)
  }

  return <div id='map' style={{ height: '700px', width: '100%' }}></div>
}

export default GMap
