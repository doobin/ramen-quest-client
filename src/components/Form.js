import React, { Component } from 'react'

class Form extends React.Component {
  render () {
    return (
      <React.Fragment>
        <form onSubmit={this.props.getRestaurant}>
          <input type='text' name='city' placeholder='Search...'/>
          <button>Get Ramen</button>
        </form>
      </React.Fragment>
    )
  }
}

export default Form
