import React, { Component } from 'react'
import { Row, Col, } from 'react-bootstrap'
import Config from '../scrips/config';
import * as Three from "three"

class RobotState extends Component {
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
            this.getRobotState()
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
                    console.log("connection problem Robotstate");
                }
            }, Config.REFRESH)
        });
        this.getRobotState()

        try {
            ros.connect("ws://" + Config.ROSBRIDE_SERVER_IP + ":" + Config.ROSBRIDE_SERVER_PORT + "");
        } catch (error) {
            console.log("connection problem ");
        }
    }

    getRobotState() {
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
            this.setState({x: message.latitude.toFixed(7)})
            this.setState({y: message.longitude.toFixed(7)})
            //this.setState({orientation: this.getOrientation(message.pose.pose.orientation).toFixed(0)})

        })
        // Vel callback
        velosity_subscriber.subscribe((message)=>{
            this.setState({linear_v: message.twist.twist.linear.x.toFixed(3)})
            this.setState({angular_v: message.twist.twist.angular.z.toFixed(3)})
        })
    }
    getOrientation(ros_orientation) {
        var q = new Three.Quaternion(
            ros_orientation.x,
            ros_orientation.y,
            ros_orientation.z,
            ros_orientation.w
        )
        var RPY = new Three.Euler().setFromQuaternion(q);

        return (RPY["_z"] * (180/Math.PI)) + 180 // Return z in deg
    }

    render() {
        return (
            <div>
                <Row>
                    <Col>
                        <h4 className='mt-4'>Position</h4>
                        <p className='mt-0'>Lat: {this.state.x} </p>
                        <p className='mt-0'>Lon: {this.state.y}</p>
                    </Col>
                    <Col>
                        <h4 className='mt-4'>Velocities</h4>
                        <p className='mt-0'>Linear: {this.state.linear_v}</p>
                        <p className='mt-0'>Angular: {this.state.angular_v}</p>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default RobotState;