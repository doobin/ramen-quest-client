import React from 'react'
import ReactDOM from 'react-dom'
import apiUrl from '../apiConfig'
import axios from 'axios'
import messages from '../auth/messages'

class Rating extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '0'
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({value: event.target.value})
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    const { user, value, flash } = this.props
    const venueRating = { venue: {
      rating: this.state.value }
    }
    const id = value
    await axios.patch(`${apiUrl}/venues/${id}`, venueRating,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization':`Token token=${user.token}`}
      }
    )
      .then(() => flash(messages.updateRatingSuccess, 'flash-success'))
      .catch(() => flash(messages.updateRatingFailure, 'flash-error'))
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Rating:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value='0'>0</option>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

export default Rating
