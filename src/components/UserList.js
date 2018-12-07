import React, {Component} from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../apiConfig'

class UserList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      venues: [],
      deleted: false
    }
    this.deleteVenue = this.deleteVenue.bind(this)
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
    this.setState({ deleted: true })
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
        const { _id, name } = venue
        console.log(_id)
        return (
          <tr key={_id}>
            <td>
              {name}
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
