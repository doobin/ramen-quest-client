import React, {Component} from 'react'

class ListItem extends Component {
  render () {
    return (
      <li className='listitem'>
        {this.props.name}
      </li>
    )
  }
}

export default ListItem
