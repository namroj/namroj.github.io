'use client'

import { useEffect } from 'react'

import { renderToString } from 'react-dom/server'
import { FaBus, FaPlane, FaMapMarker } from 'react-icons/fa'

declare global {
  interface Window {
    initMap: () => void
  }
}

const GMap = () => {
  useEffect(() => {
    // Load the Google Maps script
    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&callback=initMap`
    script.async = true
    script.defer = true
    window.initMap = initMap
    document.head.appendChild(script)

    return () => {
      // Cleanup the script if the component is unmounted
      document.head.removeChild(script)
    }
  }, [])

  const initMap = () => {
    const caracas = { lat: 10.49158, lng: -66.85092 } // Caracas, Venezuela
    const tachira = { lat: 7.74957, lng: -72.23547 } // Tachira, Venezuela
    const cucuta = { lat: 7.92802, lng: -72.507 } // Cucuta, Colombia
    const bogota = { lat: 4.70118, lng: -74.14588 } // Bogota, Colombia
    const buenosAires = { lat: -34.81576, lng: -58.53542 } // Buenos Aires, Argentina

    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
      center: { lat: -15.0, lng: -65.0 }, // Center of the map between Caracas and Buenos Aires
    })

    const busIcon = {
      url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(renderToString(<FaBus size={32} color='black' />))}`,
      scaledSize: new google.maps.Size(20, 20), // Scaled size of the icon
    }

    const airplaneIcon = {
      url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(renderToString(<FaPlane size={32} color='black' />))}`,
      scaledSize: new google.maps.Size(20, 20), // Scaled size of the icon
    }

    const destinationIcon = {
      url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(renderToString(<FaMapMarker size={32} color='black' />))}`,
      scaledSize: new google.maps.Size(20, 20), // Scaled size of the icon
    }

    new google.maps.Marker({
      position: caracas,
      map: map,
      icon: busIcon,
    })

    new google.maps.Marker({
      position: cucuta,
      map: map,
      icon: airplaneIcon,
    })

    new google.maps.Marker({
      position: bogota,
      map: map,
      icon: airplaneIcon,
    })

    new google.maps.Marker({
      position: buenosAires,
      map: map,
      icon: destinationIcon,
    })

    // Polyline from Caracas to Tachira with bus icon
    const path1 = new google.maps.Polyline({
      path: [caracas, tachira],
      geodesic: true,
      strokeColor: '#6087cf',
      strokeOpacity: 1.0,
      strokeWeight: 2,
    })

    // Polyline from Caracas to Tachira with bus icon
    const path2 = new google.maps.Polyline({
      path: [tachira, cucuta],
      geodesic: true,
      strokeColor: '#6087cf',
      strokeOpacity: 1.0,
      strokeWeight: 2,
    })

    // Polyline from Tachira to Buenos Aires with airplane icon
    const path3 = new google.maps.Polyline({
      path: [cucuta, bogota],
      geodesic: true,
      strokeColor: '#6087cf',
      strokeOpacity: 1.0,
      strokeWeight: 2,
    })

    // Polyline from Tachira to Buenos Aires with airplane icon
    const path4 = new google.maps.Polyline({
      path: [bogota, buenosAires],
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
