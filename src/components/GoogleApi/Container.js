import React from 'react'
import Map, {GoogleApiWrapper} from 'google-maps-react'
import {searchNearby} from './GoogleApiHelpers'

export class Container extends React.Component {

  onReady (props, map) {

  }

  render () {
    return (
      <div>
        <Map
          onReady={this.onReady.bind(this)}
          google={this.props.google} />
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBlsaZY2eSqKwwvvFdQUhBH1WaviiseGRY'
})(Container)
