import React, { Component } from 'react'
import './App.scss'
import { BrowerserRouter as Router, Route, Link } from 'react-router-dom'

import AuthenticatedRoute from './auth/components/AuthenticatedRoute'
import Header from './header/Header'
import SignUp from './auth/components/SignUp'
import SignIn from './auth/components/SignIn'
import SignOut from './auth/components/SignOut'
import ChangePassword from './auth/components/ChangePassword'
import Map from './components/Map'
import FourSquareAPI from './api'
import Sidebar from './components/Sidebar'
import UserList from './components/UserList'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      flashMessage: '',
      flashType: null,
      venues: [],
      markers: [],
      center: [],
      zoom: 12
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  flash = (message, type) => {
    this.setState({ flashMessage: message, flashType: type })

    clearTimeout(this.messageTimeout)

    this.messageTimeout = setTimeout(() => this.setState({flashMessage: null
    }), 2000)
  }

  // close all open display windows
  closeAllMarkers = () => {
    const markers = this.state.markers.map(marker => {
      marker.isOpen = false
      return marker
    })
    this.setState({ markers: Object.assign(this.state.markers, markers) })
  }

  // Open display window when marker is clicked and get venue details from
  // FourSquare API
  handleMarkerClick = marker => {
    this.closeAllMarkers()
    marker.isOpen = true
    this.setState({ markers: Object.assign(this.state.markers, marker) })
    const venue = this.state.venues.find(venue => venue.id === marker.id)

    FourSquareAPI.getVenueDetails(marker.id)
      .then(res => {
        const newVenue = Object.assign(venue, res.response.venue)
        this.setState({ venues: Object.assign(this.state.venues, newVenue) })
        console.log(newVenue)
      })
  }

  handleListItemClick = venue => {
    const marker = this.state.markers.find(marker => marker.id === venue.id)
    this.handleMarkerClick(marker)
  }

  // once map renders, send request to FourSquare API, pass results to marker
  // components
  componentDidMount() {
    FourSquareAPI.search({
      near: 'Boston,MA',
      query: 'ramen'
    })
      .then(results => {
        console.log(results)
        const { venues } = results.response
        const { center } = results.response.geocode.feature.geometry
        const markers = venues.map(venue => {
          return {
            lat: venue.location.lat,
            lng: venue.location.lng,
            isOpen: false,
            isVisible: true,
            id: venue.id
          }
        })
        this.setState({ venues, center, markers })
      })
  }

  async handleSubmit (event) {
    event.preventDefault()
    const city = event.target.elements.city.value
    const results = await FourSquareAPI.search({
      near: city,
      query: 'ramen'
    })
    console.log(results)
    const { venues } = results.response
    console.log(venues)
    const { center } = results.response.geocode.feature.geometry
    console.log(center)
    const markers = venues.map(venue => {
      return {
        lat: venue.location.lat,
        lng: venue.location.lng,
        isOpen: false,
        isVisible: true,
        id: venue.id
      }
    })
    console.log(markers)
    this.setState({ venues, center, markers })
  }

  render () {
    const { flashMessage, flashType, user } = this.state

    return (
      <React.Fragment>
        <Header user={user} />
        {flashMessage && <h3 className={flashType}>{flashMessage}</h3>}

        <main className='container'>
          <Route path='/sign-up' render={() => (
            <SignUp flash={this.flash} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn flash={this.flash} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut flash={this.flash} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword flash={this.flash} user={user} />
          )} />
        </main>
        <div className='map'>
          <Sidebar
            {...this.state}
            flash={this.flash}
            handleListItemClick={this.handleListItemClick}
            handleSubmit={this.handleSubmit}
          />
          <Map {...this.state} handleMarkerClick={this.handleMarkerClick} />
          <AuthenticatedRoute user={user} path='/venues' render={() => (
            <UserList
              {...this.state}
              flash={this.flash}
              handleSubmit={this.handleSubmit}
            />
          )}
          />
        </div>
      </React.Fragment>
    )
  }
}

export default App
