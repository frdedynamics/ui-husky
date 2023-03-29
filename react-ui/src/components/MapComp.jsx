import { Component } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";

class MapComp extends Component {
  state = {
    connected: false,
    ros: null,
    huskypos: [61.45874, 5.88743],
    markerPos: null,
  };

  componentDidMount() {
    const ros = new window.ROSLIB.Ros();
    ros.on("connection", () => {
      console.log("Connection established! MapComp");
      this.setState({ connected: true, ros: ros });
    });

    ros.on("close", () => {
      console.log("Connection is closed! MapComp");
      this.setState({ connected: false, ros: null });
      // Retry every second
      setTimeout(() => {
        try {
          ros.connect(
            "ws://" +
              process.env.REACT_APP_IP_ROS +
              ":" +
              process.env.REACT_APP_PORT_ROS +
              ""
          );
        } catch (error) {
          console.log("connection problem MapComp");
        }
      }, Number(process.env.REACT_APP_REFRESH_TIMER));
    });

    try {
      ros.connect(
        "ws://" +
          process.env.REACT_APP_IP_ROS +
          ":" +
          process.env.REACT_APP_PORT_ROS +
          ""
      );
    } catch (error) {
      console.log("connection problem MapComp");
    }
  }

  handleMapClick = (e) => {
    console.log("Position:", e.latlng);
    this.setState({ markerPos: e.latlng });
  };

  render() {
    const cicon = new Icon({
      iconUrl:
        "https://cdn-icons-png.flaticon.com/512/2776/2776000.png", // kan ref fil her også
      iconSize: [38, 38],
    });
    return (
      <MapContainer
        center={[61.45874, 5.88743]}
        zoom={18}
        scrollWheelZoom={false}
        maxZoom={25}
        whenCreated={(map) => {
          this.map = map;
        }}
        onClick={this.handleMapClick}
      >
        <TileLayer
          maxNativeZoom={19}
          maxZoom={25}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={this.state.huskypos} icon={cicon}>
          <Popup>
            Husky <br /> Mobile robot
          </Popup>
        </Marker>
        {this.state.markerPos && (
          <Marker position={this.state.markerPos}>
            <Popup>You clicked here!</Popup>
          </Marker>
        )}
        <Marker
  position={[50.5, 30.5]}
  eventHandlers={{
    click: () => {
      console.log('marker clicked')
    },
  }}
/>
      </MapContainer>
    );
  }
}

export default MapComp;