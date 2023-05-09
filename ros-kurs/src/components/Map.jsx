import React, { Component } from 'react'
import Config from '../scrips/config'

class Map extends Component {
    state = { 
        ros: null,
     } 

     componentDidMount() {
        const ros = new window.ROSLIB.Ros();
        ros.on("connection", () => {
            console.log("Connection established!")
            this.setState({ connected: true, ros: ros })
            this.view_map = this.view_map.bind(this);
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

        // this.view_map();
    }

    view_map(){
        console.log("view_map() run")
        var viewer = new window.ROS2D.Viewer({
            divID: "nav_div",
            width: 640,
            height: 480,

        });

        var navClien = new window.NAV2D.OccupancyGridClientNav({
            ros: this.state.ros,
            rootObjekt: viewer.scene,
            serverName: "/move_base",
            withOrientatin: true,
        });

    }

    render() { 
        return (
            <div>
                <div id="nav_div">Viewer</div>
            </div>
        );
    }
}
 
export default Map;