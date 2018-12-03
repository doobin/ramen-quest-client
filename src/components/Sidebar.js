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
        <button type={'submit'}>Find</button>
        <VenueList />
      </div>
    )
  }
}

export default Sidebar
