import React, {Component} from 'react'

class ListItem extends Component {
  render () {
    return (
      <li className='listitem'
        onClick={() => this.props.handleListItemClick(this.props)}
      >
        {this.props.name}
      </li>
    )
  }
}

export default ListItem
