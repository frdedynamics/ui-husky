import React, { Component } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Polyline, LayersControl, Polygon } from "react-leaflet";
import { Icon } from "leaflet";
import { RobotDataContext } from './RobotDataContext'

/* `class MapComp` is creating a new React component called `MapComp`. This component is responsible for rendering a map
using the `react-leaflet` library and subscribing to ROS topics to get the position of a robot and
update the map accordingly. It also allows the user to add markers and paths to the map. */
class MapComp extends Component {
  static contextType = RobotDataContext;
  state = {
    connected: false,
    ros: null,
    huskypos: null, //[61.45874, 5.88743]
    huskyPath: [],
    centerpos: [61.45874, 5.88743],
  };

  /* `componentDidMount()` is a lifecycle method in a React component that is called after the
  component has been mounted (i.e., inserted into the DOM). In this code, it is used to establish a
  connection to a ROS server and subscribe to a topic to get the position of a robot. It also sets
  the `connected` and `ros` state variables accordingly. */
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
  /* `getRobotState()` is a function that subscribes to a ROS topic to get the position of a robot and
  updates the `huskypos` state variable with the latitude and longitude of the robot's position. */
  getRobotState() {
    console.log("getRobotState run")
    if (!this.state.ros) return;
    // Pose subscriber
    var pose_subscriber = new window.ROSLIB.Topic({
      ros: this.state.ros,
      name: process.env.REACT_APP_GPS_POSITION_TOPIC,
      messageType: process.env.REACT_APP_GPS_POSITION_TYPE,
    })
    // Pose callback
    pose_subscriber.subscribe((message) => {
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
    }
    /*if (prevState.huskypos == null && this.state.huskypos != null) {
      this.map.flyTo(this.state.huskypos)
    }*/
  }
  /* `render()` is a method in a React component that returns the JSX (JavaScript XML) code that
  defines the structure and content of the component. In this code, `render()` is returning a
  `MapContainer` component from the `react-leaflet` library, which displays a map with various
  layers and markers. It also subscribes to ROS topics to get the position of a robot and updates
  the map accordingly. Additionally, it allows the user to add markers and paths to the map. */
  render() {
    const { markerPos, markerPath, setMarkerPos, setMarkerPath } = this.context;

    const roboticon = new Icon({
      iconUrl:
        "https://cdn-icons-png.flaticon.com/512/2776/2776000.png", // Can input path to file or url
      iconSize: [24, 24],
    });
    const inicon = new Icon({
      iconUrl:
        "https://cdn-icons-png.flaticon.com/512/484/484167.png", // Can input path to file or url
      iconSize: [12, 12],
    });

    /**
     * The ClickMap function sets a marker position and path when the map is clicked.
     */
    const ClickMap = () => {
      // Next line is used to disable the eslint warning about unused variable (map).
      // eslint-disable-next-line
      const map = useMapEvents({
        click: (e) => {
          console.log("Map clicked pos: ", markerPath)
          setMarkerPos(e.latlng)
          setMarkerPath([...markerPath, e.latlng]);
        }
      })
    }

    /* `return` is returning the JSX code that defines the structure and content of the `MapComp`
    component. This JSX code is used by React to render the component on the webpage. */
    return (
      <MapContainer
        center={this.state.huskypos || this.state.centerpos}
        zoom={19}
        scrollWheelZoom={true}
        maxZoom={25}
        whenCreated={(map) => {
          this.map = map;
        }}
      >
        <ClickMap />
        <TileLayer
          maxNativeZoom={19} // Max zoom level for the map. Set to 19 for OpenStreetMap tiles since they don't have tiles for zoom levels higher than 19.
          maxZoom={25} // Max zoom level for the map. Set to 25 to allow zooming in beyond the max zoom level of the tiles.
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
          {/* Path from user */}
          <LayersControl.Overlay checked name="Path">
            {markerPath.length > 1 && <Polyline positions={markerPath} color="red" />}
          </LayersControl.Overlay>
          {/* Area from user - polygon */}
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