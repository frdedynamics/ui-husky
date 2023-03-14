import React, { Component } from 'react'
import MapComp from './MapComp';

class Body extends Component {
    state = {  } 
    render() { 
        return (
            <div style={{height: 100}}>
            <MapComp />
            </div>
        );
    }
}
 
export default Body;