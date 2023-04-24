import React, { createContext, useState } from 'react';

export const RobotDataContext = createContext(null);

export const RobotDataContextProvider = ({ children }) => {
    const [markerPos, setMarkerPos] = useState(null);
    const [markerPath, setMarkerPath] = useState([]);

    const removePathPos = () => {
        console.log("Remove user input")
        setMarkerPos(null)
        setMarkerPath([])
    }
    const value = {
        markerPos,
        setMarkerPos,
        markerPath,
        setMarkerPath,
    }
    return(
        <RobotDataContext.Provider value={value}>{children}</RobotDataContext.Provider>
    );
}

export default RobotDataContext