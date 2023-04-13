import { Component } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import { Icon } from "leaflet";

class DataPage extends Component {

  // Set up initial state
  constructor(props) {
    super(props);
    this.state = {
      huskypos: [61.45874, 5.88743],
      markerPos: null,
      markerPath: [],
    };
  }

  render() {
    // Define custom icon
    const roboticon = new Icon({
      iconUrl:
        "https://cdn-icons-png.flaticon.com/512/2776/2776000.png", // kan ref fil her også
      iconSize: [38, 38],
    });
    const inicon = new Icon({
      iconUrl:
        "https://cdn-icons-png.flaticon.com/512/484/484167.png", // kan ref fil her også
      iconSize: [30, 30],
    });

    // Define custom map click event handler using react-leaflet hook useMapEvents
    const ClickLocator = () => {
      // leaflet hook
      const map = useMapEvents({
        click: (e) => {
          console.log("Position: ", e.latlng);
          // Update state with clicked position
          this.setState({ markerPos: e.latlng });
          this.setState({markerPath: [...this.state.markerPath, e.latlng]})
          console.log("array ", this.state.markerPath)
        },
      });
      return null;
    };

    return (
      <MapContainer
        center={[61.45874, 5.88743]}
        zoom={18}
        scrollWheelZoom={true}
        maxZoom={25}
      >
        {/* Add custom click event handler */}
        <ClickLocator />
        <TileLayer
          maxNativeZoom={19}
          maxZoom={25}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={this.state.huskypos} icon={roboticon}>
          <Popup position={this.state.huskypos}>
            Husky <br /> Mobile robot
          </Popup>
        </Marker>
        {/* Add null check for markerPos to avoid error when undefined */}
        {this.state.markerPos && <Marker position={this.state.markerPos} icon={inicon}>
          <Popup position={this.state.markerPos}>
            Marker location description
          </Popup>
        </Marker>}
      </MapContainer>
    );
  }
}

export default DataPage;