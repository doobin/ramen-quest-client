import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../apiConfig'
import messages from '../auth/messages'

class AddButton extends Component {
  constructor () {
    super()
    this.state = {
      flashMessage: '',
      flashType: null
    }
  }

  flash = (message, type) => {
    this.setState({ flashMessage: message, flashType: type })

    clearTimeout(this.messageTimeout)

    this.messageTimeout = setTimeout(() => this.setState({flashMessage: null
    }), 2000)
  }

  handleAddClick = async (event) => {
    event.preventDefault()
    const { user, name, flash } = this.props
    const venueName = { venue: {
      name: name }
    }
    const response = await axios.post(`${apiUrl}/venues`, venueName,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization':`Token token=${user.token}`}
      }
    )
      .then(() => flash(messages.addVenueSuccess, 'flash-success'))
      .catch(() => flash(messages.addVenueFailure, 'flash-error'))
  }
  render() {
    return (
      <button className='addbutton' onClick={this.handleAddClick} type='button'>+</button>
    )
  }
}

export default AddButton
