import React, { useContext } from "react";
import { RobotDataContext } from "./RobotDataContext";

function ResetData() {
  const { markerPos, setMarkerPos, markerPath, setMarkerPath } = useContext(RobotDataContext);

  const handleReset = () => {
    setMarkerPos(null);
    setMarkerPath([]);
  };

  return (
    <button onClick={handleReset}>Reset Data</button>
  );
}

export default ResetData;