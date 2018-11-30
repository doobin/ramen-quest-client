import React, { Component } from 'react'
import SearchField from 'react-search-field'

class Form extends React.Component {
  render () {
    return (
      <React.Fragment>
        <SearchField
          placeholder="Search..."
          onSubmit={this.handleSubmit}
        />
      </React.Fragment>
    )
  }
}

export default Form
