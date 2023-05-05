import React, { Component, useContext } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Polyline, LayersControl, Polygon } from "react-leaflet";
import { Icon } from "leaflet";
import { RobotDataContext } from './RobotDataContext'

class MapComp extends Component {
  static contextType = RobotDataContext;
  state = {
    connected: false,
    ros: null,
    huskypos: null, //[61.45874, 5.88743]
    huskyPath: [],
  };

  componentDidMount() {
    const ros = new window.ROSLIB.Ros();
    ros.on("connection", () => {
      console.log("Connection established! MapComp");
      this.setState({ connected: true, ros: ros });
      this.getRobotState()
    });

    ros.on("close", () => {
      console.log("Connection is closed! MapComp");
      this.setState({ connected: false, ros: null });
      // Retry REACT_APP_REFRESH_TIMER in ms
      setTimeout(() => {
        try {
          ros.connect(
            "ws://" + process.env.REACT_APP_IP_ROS + ":" + process.env.REACT_APP_PORT_ROS + ""
          );
        } catch (error) {
          console.log("connection problem MapComp");
        }
      }, Number(process.env.REACT_APP_REFRESH_TIMER));
    });
    this.getRobotState()

    try {
      ros.connect(
        "ws://" + process.env.REACT_APP_IP_ROS + ":" + process.env.REACT_APP_PORT_ROS + ""
      );
    } catch (error) {
      console.log("connection problem MapComp");
    }
  }
  getRobotState() {
    console.log("getRobotState run")
    if (!this.state.ros) return;
    // Pose subscriber
    var pose_subscriber = new window.ROSLIB.Topic({
      ros: this.state.ros,
      name: "/emlid/fix",
      messageType: "sensor_msgs/NavSatFix",
    })
    // Pose callback
    pose_subscriber.subscribe((message) => {
      console.log("pose_subscriber run")
      this.setState({ huskypos: [message.latitude, message.longitude] })
    })
  }
  /**
   * This is a lifecycle method in a React component that checks if the markerPath state has been updated
   * and logs a message if it has.
   */
  componentDidUpdate(prevProps, prevState) {
    if (prevState.huskypos !== this.state.huskypos) {
      this.setState({ huskyPath: [...this.state.huskyPath, this.state.huskypos] })
      console.log("Husky path update")
    }
    /*if (prevState.huskypos == null && this.state.huskypos != null) {
      this.map.flyTo(this.state.huskypos)
    }*/
  }
  render() {
    const { markerPos, markerPath, setMarkerPos, setMarkerPath } = this.context;

    const roboticon = new Icon({
      iconUrl:
        "https://cdn-icons-png.flaticon.com/512/2776/2776000.png", // Can input path to file or url
      iconSize: [38, 38],
    });
    const inicon = new Icon({
      iconUrl:
        "https://cdn-icons-png.flaticon.com/512/484/484167.png", // Can input path to file or url
      iconSize: [30, 30],
    });

    const ClickMap = () => {
      const map = useMapEvents({
        click: (e) => {
          console.log("Map clicked pos: ", markerPath)
          setMarkerPos(e.latlng)
          setMarkerPath([...markerPath, e.latlng]);
        }
      })
    }

    return (
      <MapContainer
        center={[61.45874, 5.88743]}
        zoom={18}
        scrollWheelZoom={true}
        maxZoom={25}
        whenCreated={(map) => {
          this.map = map;
        }}
      >
        <ClickMap />
        <TileLayer
          maxNativeZoom={19}
          maxZoom={25}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* Robot Marker */}
        {this.state.huskypos != null && <Marker position={this.state.huskypos} icon={roboticon}>
          <Popup>
            Husky <br /> Mobile robot
          </Popup>
        </Marker>}
        <LayersControl position="topright">
          <LayersControl.Overlay checked name="Marker user">
            {/* Marker from user */}
            {markerPos && <Marker position={markerPos} icon={inicon} >
            </Marker>}
          </LayersControl.Overlay>
          <LayersControl.Overlay checked name="Path">
            {markerPath.length > 1 && <Polyline positions={markerPath} color="red" />}
          </LayersControl.Overlay>
          <LayersControl.Overlay checked name="Path Polygon">
            {markerPath.length > 1 && <Polygon positions={markerPath} color="red" />}
          </LayersControl.Overlay>
          <LayersControl.Overlay checked name="Husky Path">
            {this.state.huskyPath.length > 2 && <Polyline positions={this.state.huskyPath} color="blue" />}
          </LayersControl.Overlay>
        </LayersControl>
      </MapContainer>
    );
  }
}

export default MapComp;