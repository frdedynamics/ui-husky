import React, { Component } from 'react';
import Alert from "react-bootstrap/Alert";


class ConnectionStatus extends Component {
    state = { connected: false, ros: null } 

    componentDidMount() {
        const ros = new window.ROSLIB.Ros();
        ros.on("connection", () => {
          console.log("Connection established!")
          this.setState({ connected: true, ros: ros })
        });
    
        ros.on("close", () => {
          console.log("Connection is closed!");
          this.setState({ connected: false, ros: null });
          // Retry every second
          setTimeout(() => {
            try {
              ros.connect("ws://" + process.env.REACT_APP_IP_ROS + ":" + process.env.REACT_APP_PORT_ROS + "");
            } catch (error) {
              console.log("connection problem ");
            }
          }, Number(process.env.REACT_APP_REFRESH_TIMER))
        });
    
        try {
          ros.connect("ws://" + process.env.REACT_APP_IP_ROS + ":" + process.env.REACT_APP_PORT_ROS + "");
        } catch (error) {
          console.log("connection problem ");
        }
      }
    
      render() {
        return (
          <div>
            <Alert className='text-center m-3'
              variant={this.state.connected ? "success" : "danger"}>
              {this.state.connected ? "Robot Connected" : "Robot Disconnected"}
            </Alert>
          </div>
        );
      }
}
 
export default ConnectionStatus;