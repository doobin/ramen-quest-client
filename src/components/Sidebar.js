import React, {Component} from 'react'
import VenueList from './VenueList'

class Sidebar extends Component {
  render () {
    return (
      <div className='sidebar'>
        <VenueList />
      </div>
    )
  }
}

export default Sidebar
