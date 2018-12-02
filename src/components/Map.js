import React, {Component} from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'

const MyMapComponent = withScriptjs(
  withGoogleMap((props) =>
    <GoogleMap
      defaultZoom={14}
      defaultCenter={{ lat: 42.3583735, lng: -71.0592113 }}
    >
      {props.isMarkerShown &&
      <Marker position={{ lat: 42.3583735, lng: -71.0592113 }} />}
    </GoogleMap>
  ))

class Map extends Component{
  render () {
    return (
      <MyMapComponent
        isMarkerShown
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyBlsaZY2eSqKwwvvFdQUhBH1WaviiseGRY"
        loadingElement={<div style={{ height: '100%' }} />}
        containerElement={<div style={{ height: '400px' }} />}
        mapElement={<div style={{ height: '100%' }} />}
      />
    )
  }
}

export default Map
