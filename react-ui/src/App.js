import Header from "./components/Header";
import "./styles.css"
import "leaflet/dist/leaflet.css"
import MapComp from "./components/MapComp";

function App() {
  return (
    <div className="App">
      <Header />
      <div class="mapcomp">
        <MapComp />
      </div>
    </div>
  )}

export default App;
