import React, { Component } from 'react'
import SearchField from 'react-search-field'

class Form extends React.Component {
  render () {
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <SearchField
            placeholder="Search..."
          />
        </form>
      </React.Fragment>
    )
  }
}

export default Form
