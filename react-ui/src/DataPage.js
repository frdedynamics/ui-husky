import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon, popup, points, map } from "leaflet";

const cicon = new Icon({
    iconUrl:
      "https://cdn-icons-png.flaticon.com/512/2776/2776000.png", // kan ref fil her også
    iconSize: [38, 38],
  });
  
function DataPage() {
    const [position, setPosition] = useState(null);
    map = 
    //var position = [61.45874, 5.88743]

    function onMapClick(e) {
        points.push(e.latlng)
        popup
        .setLatLng(e.latlng)
        console.log(e.latlng.toString())

        return position === null ? null : (
            <Marker position={position}>
              <Popup>You are here</Popup>
            </Marker>
          )
    } 

    useEffect(() => {
        if (position) {
            console.log(position);
        }
    }, [position]);
  
    function handleClick(e) {
      console.log(e.latlng)
      setPosition(e.latlng);
    }
  
    return (
      <MapContainer center={[61.45874, 5.88743]} zoom={18} scrollWheelZoom={false} onClick={handleClick}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <onMapClick />
      </MapContainer>
    );
}

export default DataPage;