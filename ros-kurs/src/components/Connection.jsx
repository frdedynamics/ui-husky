import React, { Component } from 'react';
import Alert from "react-bootstrap/Alert";
import Config from '../scrips/config';

class Connection extends Component {
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
          ros.connect(
            "ws://" +
            Config.ROSBRIDE_SERVER_IP +
            ":" +
            Config.ROSBRIDE_SERVER_PORT +
            "");
        } catch (error) {
          console.log("connection problem ");
        }
      }, Config.REFRESH)
    });

    try {
      ros.connect("ws://" + Config.ROSBRIDE_SERVER_IP + ":" + Config.ROSBRIDE_SERVER_PORT + "");
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

export default Connection;
