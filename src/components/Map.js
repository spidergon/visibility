import React, { createRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
// import L from 'leaflet'
// import 'leaflet/dist/leaflet.css'
import {
  Map as LeafletMap,
  Marker,
  Popup,
  TileLayer,
  ZoomControl
} from 'react-leaflet'

const Wrapper = styled.div`
  .map {
    width: 100%;
    height: 400px;
  }
`

// L.Marker.prototype.options.icon = L.icon({
//   iconUrl: require('leaflet/dist/images/marker-icon.png'),
//   shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
//   iconSize: [25, 41],
//   iconAnchor: [12, 40]
// })

function toDMS (coord) {
  const absolute = Math.abs(coord)
  const degrees = Math.floor(absolute)
  const minutesNotTruncated = (absolute - degrees) * 60
  const minutes = Math.floor(minutesNotTruncated)
  const seconds = Math.floor((minutesNotTruncated - minutes) * 60)
  return `${degrees}° ${minutes}′ ${seconds}″`
}

function coordLabel (coord) {
  const latLabel = `${toDMS(coord[0])} ${Math.sign(coord[0]) >= 0 ? 'N' : 'S'}`
  const lngLabel = `${toDMS(coord[1])} ${Math.sign(coord[1]) >= 0 ? 'E' : 'W'}`
  return `${latLabel} ${lngLabel}`
}

function Map ({
  coordinates,
  coordList,
  noLocate,
  readOnly,
  setCoordinates,
  styleSize,
  zoom
}) {
  const [myZoom, setMyZoom] = useState(zoom || 12)
  const [showMarker, setShowMarker] = useState(false)
  const [defaultCoords, setDefaultCoords] = useState([
    4.938232002540988,
    -52.33507454395295
  ])
  const [centerCoords, setCenterCoords] = useState(defaultCoords)

  const mapRef = createRef()
  const markerRef = createRef()

  useEffect(() => {
    if (noLocate) {
      setDefaultCoords(coordinates)
      setCenterCoords([coordinates[0], coordinates[1] - 0.0035]) // push the center a bit on the left
      if (!showMarker) setShowMarker(true)
    }
  }, [coordinates, noLocate, showMarker])

  useEffect(() => {
    if (!noLocate) {
      const map = mapRef.current
      if (map) map.leafletElement.locate()
    }
  }, [mapRef, noLocate])

  const updatePosition = latlng => {
    if (typeof setCoordinates === 'function') setCoordinates(latlng)
    setDefaultCoords(latlng)
    setCenterCoords(latlng)
    if (!showMarker) setShowMarker(true)
  }

  const handleClick = e => {
    if (readOnly) return
    const { lat, lng } = e.latlng
    updatePosition([lat, lng])
  }

  const handleLocationFound = ({ latitude, longitude }) => {
    if (
      coordinates &&
      coordinates.length > 1 &&
      coordinates[0] !== 0 &&
      coordinates[1] !== 0
    ) {
      updatePosition(coordinates)
    } else updatePosition([latitude, longitude])
  }

  const handleZoomEnd = e => setMyZoom(e.target._zoom) // Update the zoom

  const handleDragEnd = () => {
    const { lat, lng } = markerRef.current.leafletElement.getLatLng()
    updatePosition([lat, lng])
  }

  return (
    <Wrapper>
      <LeafletMap
        center={centerCoords}
        className='map'
        onClick={handleClick}
        onLocationfound={handleLocationFound}
        onZoomend={handleZoomEnd}
        ref={mapRef}
        scrollWheelZoom={!readOnly}
        style={styleSize ? { height: styleSize } : {}}
        zoom={myZoom}
        zoomControl={false}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <ZoomControl
          position='topright'
          zoomInTitle='Zoom avant'
          zoomOutTitle='Zoom arrière'
        />
        {showMarker && (
          <Marker
            alt='Leaflet Marker'
            draggable={!readOnly}
            onDragend={handleDragEnd}
            position={defaultCoords}
            ref={markerRef}
          >
            <Popup minWidth={90}>
              <center>
                {'Position:'} <br />
                {`Lat. : ${coordinates[0]}`}
                <br />
                {`Lon. : ${coordinates[1]}`}
                <br />
                {coordLabel(coordinates)}
              </center>
            </Popup>
          </Marker>
        )}
        {coordList &&
          coordList.map((coords, id) => (
            <Marker
              alt='Leaflet Marker'
              draggable={!readOnly}
              key={id}
              onDragend={handleDragEnd}
              position={[coordinates[0] - 0.0035, coordinates[1]]}
            >
              <Popup minWidth={90}>
                <center>
                  {'Position:'} <br />
                  {`Lat. : ${coordinates[0]}`}
                  <br />
                  {`Lon. : ${coordinates[1]}`}
                  <br />
                  {coordLabel(coordinates)}
                </center>
              </Popup>
            </Marker>
          ))}
      </LeafletMap>
    </Wrapper>
  )
}

Map.propTypes = {
  coordinates: PropTypes.array,
  coordList: PropTypes.array,
  noLocate: PropTypes.bool,
  readOnly: PropTypes.bool,
  setCoordinates: PropTypes.func,
  styleSize: PropTypes.string,
  zoom: PropTypes.number
}

export default Map
