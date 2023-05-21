import React, { useContext } from "react";
import { RobotDataContext } from "./RobotDataContext";

function ResetData() {
  // Next line is used to disable the eslint warning about unused variables. Remove it when you start using these variables.
  // eslint-disable-next-line
  const { markerPos, setMarkerPos, markerPath, setMarkerPath } = useContext(RobotDataContext);

  const handleReset = () => {
    setMarkerPos(null);
    setMarkerPath([]);
  };

  return (
    <button onClick={handleReset} class="btn btn-lg btn-primary" type="button">Remove markers</button>
  );
}

export default ResetData;