import React, {Component} from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../apiConfig'
import messages from '../auth/messages'
import Rating from './Rating'

class UserList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      venues: [],
      deleted: false,
      flashMessage: '',
      flashType: null,
      value: ''
    }
    this.deleteVenue = this.deleteVenue.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  flash = (message, type) => {
    this.setState({ flashMessage: message, flashType: type })

    clearTimeout(this.messageTimeout)

    this.messageTimeout = setTimeout(() => this.setState({flashMessage: null
    }), 2000)
  }

  async componentDidMount() {
    const { user } = this.props
    const response = await axios.get(`${apiUrl}/venues`,
      {
        headers: {
          'Authorization':`Token token=${user.token}`}
      }
    )
    this.setState({venues: response.data.venues})
  }

  async deleteVenue(event) {
    const { user } = this.props
    console.log(user)
    const id = event.target.value
    console.log(id)
    await axios.delete(`${apiUrl}/venues/${id}`,
      {
        headers: {
          'Authorization':`Token token=${user.token}`}
      }
    )
      .then(() => this.props.flash(messages.deleteVenueSuccess, 'flash-success'))
      .catch(() => this.props.flash(messages.deleteVenueFailure, 'flash-error'))
    this.setState({ deleted: true })
  }

  handleChange(event) {
    this.setState({value: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault()
  }

  render () {
    if (this.state.deleted === true) {
      return <Redirect to='/' />
    }
    let venueRows
    const { venues } = this.state
    console.log(venues)

    if (venues.length === 0) {
      venueRows = <tr><td>Loading</td></tr>
    } else {
      venueRows = venues.map(venue => {
        const { _id, name, rating } = venue
        console.log(_id)
        return (
          <tr key={_id}>
            <td>
              <h5>{name}</h5>
              <p>Rating: {rating} out of 5</p>
              <Rating {...this.props} value={_id}/>
              <button value={_id} onClick={this.deleteVenue}>Delete</button>
            </td>
          </tr>
        )
      })
    }

    return (
      <React.Fragment>
        <table>
          <tbody>
            {venueRows}
          </tbody>
        </table>
      </React.Fragment>
    )
  }
}

export default UserList
