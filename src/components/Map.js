import React, {Component} from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps'

const MyMapComponent = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={12}
      zoom={props.zoom}
      defaultCenter={{ lat: 42.3583735, lng: -71.0592113 }}
      center={props.center}
    >
      {props.markers &&
        props.markers
          .filter(marker => marker.isVisible)
          .map((marker, idx) => {
            const venueInfo = props.venues.find(venue => venue.id == marker.id)
            return <Marker
              key={idx}
              position={{ lat: marker.lat, lng: marker.lng }}
              onClick={() => props.handleMarkerClick(marker)}
            >
              {marker.isOpen && venueInfo.bestPhoto && (
                <InfoWindow>
                  <React.Fragment>
                    <img
                      src={`${venueInfo.bestPhoto.prefix}100x100${venueInfo.bestPhoto.suffix}`}
                      alt={'Venue image'} />
                    <p>{venueInfo.name}</p>
                    <p>Rating: {venueInfo.rating}</p>
                  </React.Fragment>
                </InfoWindow>
              )}
            </Marker>
          })}
    </GoogleMap>
  ))
)

class Map extends Component{
  render () {
    return (
      <MyMapComponent
        {...this.props}
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyBlsaZY2eSqKwwvvFdQUhBH1WaviiseGRY"
        loadingElement={<div style={{ height: '100%' }} />}
        containerElement={<div style={{ height: '100%', width: '75%' }} />}
        mapElement={<div style={{ height: '100%' }} />}
      />
    )
  }
}

export default Map
