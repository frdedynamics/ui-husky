import React, { Component } from 'react'
import { Joystick } from "react-joystick-component"
import Config from '../scrips/config';

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

    handleMove(event) {
        console.log("Move")
        // ROS publisher
        var cmd_vel = new window.ROSLIB.Topic({
            ros: this.state.ros,
            name: Config.CMD_VEL_TOPIC,
            messageType: Config.CMD_VEL_TOPIC_TYPE
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
            name: Config.CMD_VEL_TOPIC,
            messageType: Config.CMD_VEL_TOPIC_TYPE
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
                    sticky={true}
                    baseColor="#EEEEEE"
                    stickColor="#BBBBBB"
                    move={this.handleMove}
                    stop={this.handleStop}>
                </Joystick>
            </div>);
    }
}

export default Teleoperation;