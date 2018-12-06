import React, {Component} from 'react'
import axios from 'axios'
import apiUrl from '../apiConfig'

class UserList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      venues: []
    }
  }

  async componentDidMount() {
    const { user } = this.props
    console.log(user)
    const response = await axios.get(`${apiUrl}/venues`,
      {
        headers: {
          'Authorization':`Token token=${user.token}`}
      }
    )
    console.log('did this run', response)
    this.setState({venues: response.data.venues})
  }

  render () {
    let venueRows
    const { venues } = this.state
    console.log(venues)

    if (venues.length === 0) {
      venueRows = <tr><td>Loading</td></tr>
    } else {
      venueRows = venues.map(venue => {
        const { _id, name } = venue
        console.log(venue)
        return (
          <tr key={_id}>
            <td>
              {name}
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
