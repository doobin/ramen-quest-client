import React, {Component} from 'react'
import AddButton from './AddButton'

class ListItem extends Component {

  render () {
    return (
      <React.Fragment>
        <li className='listitem'
          onClick={() => this.props.handleListItemClick(this.props)}
        >
          <img src={this.props.categories[0].icon.prefix+'32'+this.props.categories[0].icon.suffix}
            alt={this.props.categories[0].name}
          />
          {this.props.name}
          <AddButton {...this.props} addVenue={this.handleAddClick}/>
        </li>
      </React.Fragment>
    )
  }
}

export default ListItem
