import React, { Component } from 'react'
import { Joystick } from "react-joystick-component"

class Teleoperation extends Component {
  state = { ros: null }

  componentDidMount() {
    const ros = new window.ROSLIB.Ros();
    ros.on("connection", () => {
      console.log("Connection established!")
      this.setState({ connected: true, ros: ros })
      this.handleMove = this.handleMove.bind(this)
      this.handleStop = this.handleStop.bind(this);
    });

    ros.on("close", () => {
      console.log("Connection is closed!");
      this.setState({ connected: false, ros: null });
      // Retry every second
      setTimeout(() => {
        try {
          ros.connect(
            "ws://" + process.env.REACT_APP_IP_ROS + ":" + process.env.REACT_APP_PORT_ROS + ""
          );
        } catch (error) {
          console.log("connection problem Teleoperation");
        }
      }, Number(process.env.REACT_APP_REFRESH_TIMER));
    });

    try {
      ros.connect(
        "ws://" + process.env.REACT_APP_IP_ROS + ":" + process.env.REACT_APP_PORT_ROS + ""
      );
    } catch (error) {
      console.log("connection problem Teleoperation");
    }
  }

  handleMove(event) {
    console.log("Move")
    // ROS publisher
    var cmd_vel = new window.ROSLIB.Topic({
      ros: this.state.ros,
      name: process.env.REACT_APP_TELE_POSITION_TOPIC,
      messageType: process.env.REACT_APP_TELE_POSITION_TYPE,
    })
    // Twist massage
    var twist = new window.ROSLIB.Message({
      linear: {
        x: event.y,
        y: 0.0,
        z: 0.0,
      },
      angular: {
        x: 0.0,
        y: 0.0,
        z: -event.x,
      }
    })
    cmd_vel.publish(twist)

  };
  handleStop(event) {
    console.log("STOP")
    // ROS publisher
    var cmd_vel = new window.ROSLIB.Topic({
      ros: this.state.ros,
      name: process.env.REACT_APP_TELE_POSITION_TOPIC,
      messageType: process.env.REACT_APP_TELE_POSITION_TYPE,
    })
    // Twist massage
    var twist = new window.ROSLIB.Message({
      linear: {
        x: 0.0,
        y: 0.0,
        z: 0.0,
      },
      angular: {
        x: 0.0,
        y: 0.0,
        z: 0.0,
      }
    })
    cmd_vel.publish(twist)
  };

  render() {
    return (
      <div>
        <Joystick
          size={100}
          sticky={false}
          baseColor="#EEEEEE"
          stickColor="#BBBBBB"
          move={this.handleMove}
          stop={this.handleStop}>
        </Joystick>
      </div>);
  }
}

export default Teleoperation;