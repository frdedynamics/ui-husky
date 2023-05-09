import React, { useContext } from "react";
import { RobotDataContext } from "./RobotDataContext";

function ResetData() {
  const { markerPos, setMarkerPos, markerPath, setMarkerPath } = useContext(RobotDataContext);

  const handleReset = () => {
    setMarkerPos(null);
    setMarkerPath([]);
  };

  return (
    <button onClick={handleReset} class="btn btn-lg btn-primary" type="button">Remove all markers</button>
  );
}

export default ResetData;