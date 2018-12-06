import React, {Component} from 'react'
import VenueList from './VenueList'

class Sidebar extends Component {

  render () {
    return (
      <div className='sidebar'>
        <form onSubmit={this.props.handleSubmit}>
          <input
            type={'search'}
            id={'search'}
            name={'city'}
            placeholder={'Search Location...'}
          />
          <button type={'submit'} id={'find-button'}>Find</button>
        </form>
        <VenueList
          {...this.props}
          handleListItemClick={this.props.handleListItemClick}
        />
      </div>
    )
  }
}

export default Sidebar
