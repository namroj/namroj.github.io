const developer = {
  name: 'Jorman Espinoza',
  email: 'espinoza.dev@gmail.com',
  whatsapp: 'https://wa.me/5491127910154',
  linkenIn: 'https://www.linkedin.com/in/jorman-daniel-espinoza/',
  github: 'https://jormanespinoza.github.io/',
  showData: () => {
    console.group('Developer')
    console.info(`${developer.name}`)
    console.log(`Email: ${developer.email}`)
    console.log(`WhatsApp: ${developer.whatsapp}`)
    console.log(`LinkedIn: ${developer.linkenIn}`)
    console.log(`Github: ${developer.github}`)
    console.groupEnd('Developer')
  }
}

// eslint-disable-next-line no-unused-vars
let gMap
let mapLoaded = false

const loadMap = () => {
  if (!mapLoaded) {
    // Create the script tag, set the appropriate attributes
    const mapScript = document.createElement('script')

    mapScript.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDVz1_uR7XN4dTUQPrdHh-K_tyb03wnXys&callback=initMap'
    mapScript.defer = true
    mapScript.async = true

    // Attach your callback function to the `window` object
    window.initMap = () => {
      // JS API is loaded and available
      // eslint-disable-next-line no-undef
      gMap = new google.maps.Map(document.getElementById('gmap'), {
        center: {
          lat: -34.6158036,
          lng: -58.5035102
        },
        zoom: 12,
        styles: [
          {
            featureType: 'all',
            elementType: 'geometry',
            stylers: [
              {
                color: '#202c3e'
              }
            ]
          },
          {
            featureType: 'all',
            elementType: 'labels.text.fill',
            stylers: [
              {
                gamma: 0.01
              },
              {
                lightness: 20
              },
              {
                weight: '1.39'
              },
              {
                color: '#ffffff'
              }
            ]
          },
          {
            featureType: 'all',
            elementType: 'labels.text.stroke',
            stylers: [
              {
                weight: '0.96'
              },
              {
                saturation: '9'
              },
              {
                visibility: 'on'
              },
              {
                color: '#000000'
              }
            ]
          },
          {
            featureType: 'all',
            elementType: 'labels.icon',
            stylers: [
              {
                visibility: 'off'
              }
            ]
          },
          {
            featureType: 'landscape',
            elementType: 'geometry',
            stylers: [
              {
                lightness: 30
              },
              {
                saturation: '9'
              },
              {
                color: '#29446b'
              }
            ]
          },
          {
            featureType: 'poi',
            elementType: 'geometry',
            stylers: [
              {
                saturation: 20
              }
            ]
          },
          {
            featureType: 'poi.park',
            elementType: 'geometry',
            stylers: [
              {
                lightness: 20
              },
              {
                saturation: -20
              }
            ]
          },
          {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [
              {
                lightness: 10
              },
              {
                saturation: -30
              }
            ]
          },
          {
            featureType: 'road',
            elementType: 'geometry.fill',
            stylers: [
              {
                color: '#193a55'
              }
            ]
          },
          {
            featureType: 'road',
            elementType: 'geometry.stroke',
            stylers: [
              {
                saturation: 25
              },
              {
                lightness: 25
              },
              {
                weight: '0.01'
              }
            ]
          },
          {
            featureType: 'water',
            elementType: 'all',
            stylers: [
              {
                lightness: -20
              }
            ]
          }
        ]
      })
    }

    // Append the 'script' element to 'head'
    document.head.appendChild(mapScript)

    // Set mapLoader
    mapLoaded = true
  }
}

const siteTitle = document.querySelector('.title')

siteTitle.innerHTML = developer.name

const loadingMap = document.querySelector('.load-map')

loadingMap.addEventListener('click', (event) => {
  event.preventDefault()
  loadMap()
})
