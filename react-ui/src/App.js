import Header from "./components/Header";
import "./styles.css"
import "leaflet/dist/leaflet.css"
import MapComp from "./components/MapComp";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DataPage from "./components/DataPage";
import { RobotDataContextProvider } from "./components/RobotDataContext";

function App() {
  return (
    <Router>
      <RobotDataContextProvider> 
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<MapComp />} />
          <Route path="/remote-control" element={<DataPage />} />
        </Routes>
      </div>
    </RobotDataContextProvider>
    </Router>
  )}

export default App;

      
// Endret fra <RobotDataContext.Provider> til <RobotDataContextProvider>