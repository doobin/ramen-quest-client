import React, {Component} from 'react'
import ListItem from './ListItem'

class VenueList extends Component {
  render () {
    return (
      <ol className='venuelist'>
        <ListItem />
      </ol>
    )
  }
}

export default VenueList
