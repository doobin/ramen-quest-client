import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../apiConfig'

class AddButton extends Component {

handleAddClick = async (event) => {
  event.preventDefault()
  const { user, name } = this.props
  console.log(user)
  const venueName = { venue: {
    name: name } 
  }
  console.log(venueName)
  const response = await axios.post(`${apiUrl}/venues`, venueName,
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization':`Token token=${user.token}`}
    }
  )
}
render() {
  return (
    <button className='addbutton' onClick={this.handleAddClick} type='button'>+</button>
  )
}
}

export default AddButton
