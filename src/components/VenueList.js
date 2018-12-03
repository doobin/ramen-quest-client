import React, {Component} from 'react'
import ListItem from './ListItem'

class VenueList extends Component {
  render () {
    return (
      <ol className='venuelist'>
        {this.props.venues &&
          this.props.venues.map((venue, idx) => (
            <ListItem key={idx} {...venue} />
          ))}
      </ol>
    )
  }
}

export default VenueList
