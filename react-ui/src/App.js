import Header from "./components/Header";
import "./styles.css"
import "leaflet/dist/leaflet.css"
import MapComp from "./components/MapComp";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DataPage from "./DataPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<MapComp />} />
          <Route path="/data" element={<DataPage />} />
        </Routes>
      </div>
    </Router>
  )}

export default App;
