import React from 'react'
import Map, {GoogleApiWrapper} from 'google-maps-react'

export class Container extends React.Component {
  render () {
    return (
      <div>
      Hello from the container
        <Map
          google={this.props.google} />
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBlsaZY2eSqKwwvvFdQUhBH1WaviiseGRY'
})(Container)
