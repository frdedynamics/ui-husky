import React, { Component } from 'react';

class SendData extends Component {
    state = {  } 
    render() { 
        return (<button onClick={this.props.onClick}> Send Data </button>);
    }
}
 
export default SendData;