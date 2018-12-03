import React, {Component} from 'react'
import VenueList from './VenueList'

class Sidebar extends Component {
  render () {
    return (
      <div className='sidebar'>
        <input
          type={'search'}
          id={'search'}
          placeholder={'Search Location...'}
        />
        <button type={'submit'} id={'find-button'}>Find</button>
        <VenueList {...this.props} />
      </div>
    )
  }
}

export default Sidebar
