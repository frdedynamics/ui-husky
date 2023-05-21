import React, { Component } from 'react'
import MapComp from './MapComp';

/* The Body class renders a MapComp component within a div with a height of 100. */
class Body extends Component {
  state = {}
  render() {
    return (
      <div style={{ height: 100 }}>
        <MapComp />
      </div>
    );
  }
}

export default Body;