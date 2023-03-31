import React, {
  Component,
  useState, 
  useCallback, 
  useEffect 
} from 'react';

import {
  MapContainer,
  TileLayer,
  Marker,
  MapConsumer,
  useMapEvent,
} from 'react-leaflet';

import { Icon } from 'leaflet';

let defaultPosition = [48.864719, 2.349]; // Paris position
let [position, setPosition] = ['', ''];

let cicon = new Icon({
  iconUrl:
    "https://cdn-icons-png.flaticon.com/512/2776/2776000.png", // kan ref fil her også
  iconSize: [38, 38],
});

function DisplayPosition({ map }) {
  [position, setPosition] = useState(map.getCenter());
  defaultPosition = map
    ? [
        Number(map.getCenter().lat.toFixed(4)),
        Number(map.getCenter().lng.toFixed(4)),
      ]
    : [48.864719, 2.349];

  const onClick = useCallback(() => {
    map.setView([48.864716, 2.349], 13);
  }, [map]);
  //console.log('markerPos', markerPos);
  const onMove = useCallback(() => {
    setPosition(map.getCenter());
  }, [map]);

  useEffect(() => {
    map.on('move', onMove);
    return () => {
      map.off('move', onMove);
    };
  }, [map, onMove]);

  return (
    <p>
      latitude: {position.lat.toFixed(4)}, longitude: {position.lng.toFixed(4)}{' '}
      <button onClick={onClick}>reset</button>
    </p>
  );
}

function DataPage() {
  let [map, setMap] = useState(null);

  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  console.log('defaultPosition', defaultPosition);
  return (
    <div>
      <div className="map__container" onMouseUp={forceUpdate}>
        <MapContainer center={defaultPosition} zoom={13} whenCreated={setMap}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={defaultPosition} icon={cicon}></Marker>;
        </MapContainer>
      </div>
      {map ? <DisplayPosition map={map} /> : null}
    </div>
  );
}

export default DataPage