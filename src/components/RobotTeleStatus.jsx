import React, { Component } from 'react'
import { Row } from 'react-bootstrap'
import * as Three from "three"

/* Defining a React component called `RobotTeleStatus` that extends the `Component` class from the
`react` library. This component is responsible for connecting to a ROS server and subscribing to
topics to get the robot's position and velocity data. It then renders this data in the form of HTML
elements using the `render()` method. */
class RobotTeleStatus extends Component {
  state = {
    ros: null,
    x: 0,
    y: 0,
    orientation: 0,
    linear_v: 0,
    angular_v: 0,
  };

  componentDidMount() {
    const ros = new window.ROSLIB.Ros();
    ros.on("connection", () => {
      console.log("Connection established!")
      this.setState({ connected: true, ros: ros })
      this.getRobotTeleStatus()
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
    this.getRobotTeleStatus()

    try {
      ros.connect(
        "ws://" + process.env.REACT_APP_IP_ROS + ":" + process.env.REACT_APP_PORT_ROS + ""
      );
    } catch (error) {
      console.log("connection problem Teleoperation");
    }
  }

  /* `getRobotTeleStatus` is a method in the `RobotTeleStatus` component that sets up subscribers to
  ROS topics for getting the robot's position and velocity data. It subscribes to the `/emlid/fix`
  topic for position data and the `/husky_velocity_controller/odom` topic for velocity data. When
  new messages are received on these topics, the method updates the state of the component with
  the new data. */
  getRobotTeleStatus() {
    if (!this.state.ros) return;
    // Pose subscriber
    var pose_subscriber = new window.ROSLIB.Topic({
      ros: this.state.ros,
      name: "/emlid/fix",
      messageType: "sensor_msgs/NavSatFix",
    })
    // Velosity subscriber
    var velosity_subscriber = new window.ROSLIB.Topic({
      ros: this.state.ros,
      name: "/husky_velocity_controller/odom",
      messageType: "nav_msgs/Odometry",
    })
    // Pose callback
    pose_subscriber.subscribe((message) => {
      this.setState({ x: message.latitude.toFixed(7) })
      this.setState({ y: message.longitude.toFixed(7) })
      //this.setState({orientation: this.getOrientation(message.pose.pose.orientation).toFixed(0)})

    })
    // Vel callback
    velosity_subscriber.subscribe((message) => {
      this.setState({ linear_v: message.twist.twist.linear.x.toFixed(3) })
      this.setState({ angular_v: message.twist.twist.angular.z.toFixed(3) })
    })
  }
  /* `getOrientation` is a method that takes in a quaternion representing the orientation of the
  robot and converts it to Euler angles (roll, pitch, and yaw) using the `Three.js` library. It
  then returns the yaw angle in degrees. 
  This code is currently not in use and is only called within the getRobotTeleStatus method.*/
  getOrientation(ros_orientation) {
    var q = new Three.Quaternion(
      ros_orientation.x,
      ros_orientation.y,
      ros_orientation.z,
      ros_orientation.w
    )
    var RPY = new Three.Euler().setFromQuaternion(q);

    return (RPY["_z"] * (180 / Math.PI)) + 180 // Return z in deg
  }

  /* The `render` method is responsible for rendering the HTML elements that will be displayed on the
  webpage. In this case, it is rendering the position and velocity data of a robot in the form of
  `h4` and `p` elements. The data is obtained from the state of the `RobotTeleStatus` component,
  which is updated by subscribing to ROS topics for position and velocity data. */
  render() {
    return (
      <div>
        <Row>
          <h4 className='mt-4'>Position</h4>
          <p className='mt-0'>Lat: {this.state.x} </p>
          <p className='mt-0'>Lon: {this.state.y}</p>
          <h4 className='mt-4'>Velocities</h4>
          <p className='mt-0'>Linear: {this.state.linear_v}</p>
          <p className='mt-0'>Angular: {this.state.angular_v}</p>
        </Row>
      </div>
    );
  }
}

export default RobotTeleStatus;