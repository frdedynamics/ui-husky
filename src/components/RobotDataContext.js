import React, { createContext, useState } from 'react';

/* This code is creating a React context called `RobotDataContext` using the `createContext` function
from React. It also exports a provider component called `RobotDataContextProvider` which wraps its
children with the `RobotDataContext.Provider` component and provides the context value as an object
with `markerPos`, `setMarkerPos`, `markerPath`, and `setMarkerPath` properties.
This allows other components to consume the context and access the state and functions 
provided by the context provider. */

export const RobotDataContext = createContext(null);

export const RobotDataContextProvider = ({ children }) => {
  const [markerPos, setMarkerPos] = useState(null);
  const [markerPath, setMarkerPath] = useState([]);

  const value = {
    markerPos,
    setMarkerPos,
    markerPath,
    setMarkerPath,
  }
  return (
    <RobotDataContext.Provider value={value}>{children}</RobotDataContext.Provider>
  );
}

export default RobotDataContext