import React, { Component } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import { Icon } from 'leaflet'
import { useMap } from 'react-leaflet/hooks'



class MapComp extends Component {
  state = { connected: false, ros: null, huskypos: [61.45874, 5.88743] } 
  
  componentDidMount() {
    const ros = new window.ROSLIB.Ros();
    ros.on("connection", () => {
      console.log("Connection established! MapComp")
      this.setState({ connected: true, ros: ros })
    });
    
        ros.on("close", () => {
          console.log("Connection is closed! MapComp");
          this.setState({ connected: false, ros: null });
          // Retry every second
          setTimeout(() => {
            try {
              ros.connect("ws://" + process.env.REACT_APP_IP_ROS + ":" + process.env.REACT_APP_PORT_ROS + "");
            } catch (error) {
              console.log("connection problem MapComp");
            }
          }, Number(process.env.REACT_APP_REFRESH_TIMER))
        });
    
        try {
          ros.connect("ws://" + process.env.REACT_APP_IP_ROS + ":" + process.env.REACT_APP_PORT_ROS + "");
        } catch (error) {
          console.log("connection problem MapComp");
        }
      }

  render() {
    const cicon = new Icon({
      iconUrl: "https://cdn-icons-png.flaticon.com/512/2776/2776000.png", // kan ref fil her også
      iconSize: [38,38]
    })
    return (
      <MapContainer center={[61.45874, 5.88743]} zoom={18} scrollWheelZoom={false} maxZoom={25}>
        <TileLayer maxNativeZoom={19} maxZoom={25}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={this.state.huskypos} icon={cicon}>
          <Popup>
            Husky <br /> Mobile robot
          </Popup>
        </Marker>
      </MapContainer>
    );
  }
}

export default MapComp;


