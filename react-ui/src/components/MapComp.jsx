import React, { Component } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import { Icon } from 'leaflet'

const cicon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/2776/2776000.png", // kan ref fil her også
  iconSize: [38,38]
})
class MapComp extends Component {
  state = {
  }
  render() {
    return (
      <MapContainer center={[61.45874, 5.88743]} zoom={18} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[61.45874, 5.88743]} icon={cicon}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    );
  }
}

export default MapComp;


