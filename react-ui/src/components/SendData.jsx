import React, { Component } from 'react';
import { RobotDataContext } from './RobotDataContext'

class SendData extends Component {
  constructor(props) {
    super(props);
    this.sendGPSData = this.sendGPSData.bind(this);
  }
  static contextType = RobotDataContext;
  static serviceName = 'save_gps';
  static serviceType = 'gps_user_service/SaveGPS';
  state = { ros: null }

  componentDidMount() {
    const ros = new window.ROSLIB.Ros()
    ros.on("connection", () => {
      console.log("SendData Connection established")
      this.setState({ connected: true, ros: ros })
    });
    ros.on("close", () => {
      console.log("Connection is closed!");
      this.setState({ connected: false, ros: null });
      // Retry every second
      setTimeout(() => {
        try {
          ros.connect(
            "ws://" + process.env.REACT_APP_IP_ROS + ":" + process.env.REACT_APP_PORT_ROS + "");
        } catch (error) {
          console.log("connection problem ");
        }
      }, Number(process.env.REACT_APP_REFRESH_TIMER))
    });

  ros.on('error', function(error) { console.log(error); });
  ros.on('connection', function() { console.log('Connection made!'); });


    try {
      ros.connect("ws://" + process.env.REACT_APP_IP_ROS + ":" + process.env.REACT_APP_PORT_ROS + "");
    } catch (error) {
      console.log("connection problem ");
    }
  }

  sendGPSData(event) {
    const { markerPath } = this.context;
    const { ros } = this.state;
    console.log("button clicked")
    if (!ros) {
      console.log("SendData - ROS not connected");
      alert("ROBOT NOT CONNECTED\nPlease make sure the robot is powered on and connected to the network");
      return;
    }
    console.log("Ros not null")
    if (markerPath.length < 1) {
      alert("No navigation points to send. Please click the map to generate navigation points");
      return;
    }
    console.log("markerPath > 1")

    const saveGpsService = new window.ROSLIB.Service({
      ros: ros,
      name: SendData.serviceName,
      serviceType: SendData.serviceType,
    });
    console.log("Service name: " + SendData.serviceName)
    console.log("Service type: " + SendData.serviceType)


    const saveGpsRequest = new window.ROSLIB.ServiceRequest({
      gps_coordinates: []
    });


    for (let i=0; i < markerPath.length; i++) {
      const newGpsData = {
        latitude: markerPath[i].lat,
        longitude: markerPath[i].lng
      };
      saveGpsRequest.gps_coordinates.push(newGpsData);
    }
    console.log('Before calling saveGpsService.callService');
    saveGpsService.callService(saveGpsRequest, (response)=> {
      console.log("In saveGpsService.callService")
      if(response.success) {
        alert("Sendt data successfull")
      } else {
        alert("ROS service failed!")
      }
    }, (error) => {
      console.log('Error in saveGpsService.callService:', error);
    });
    console.log('After calling saveGpsService.callService');
    console.log("End")
  }
  render() {
    return (<button onClick={this.sendGPSData} class="btn btn-lg btn-primary" type="button"> Start Robot Mower </button>);
  }
}

export default SendData;