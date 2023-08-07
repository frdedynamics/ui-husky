import React, {Component} from "react";
import { RobotDataContext } from './RobotDataContext'; 
// eslint-disable-next-line
import bootstrap from "bootstrap"; 

class LoadPath extends Component {
    constructor(props) {
        super(props);
        this.state = {
          toggleText: "Manage path"
        };
        this.waypointNav = this.waypointNav.bind(this);
        this.surfaceCoverage = this.surfaceCoverage.bind(this);
    }
    static contextType = RobotDataContext;

    waypointNav() {
        this.setState({toggleText: "Waypoint Navigation"})
        console.log("Navigation Type: Waypoint Navigation")
        // eslint-disable-next-line
        var { navType, setNavType } = this.context;
        setNavType(1); // waypoint nav
        //console.log("Nav type:", navType) // delay since in this function, but I don't think it's a problem
    }


    surfaceCoverage() {
        this.setState({toggleText: "Surface Coverage"})
        console.log("Navigation Type: Surface Coverage")
        // eslint-disable-next-line
        var { navType, setNavType } = this.context;
        setNavType(2); // surface coverage 
        //console.log("Nav type:", navType) // delay since in this function, but I don't think it's a problem
    }


    render() {
        return (    
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" style={{margin:"0px 10px 0px 10px"}} type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {this.state.toggleText}
                    </button>

                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <button className="dropdown-item" onClick={this.savePath}> Save the current path </button>
                        <button className="dropdown-item" onClick={this.surfaceCoverage}> Load "file name from list"  </button>
                    </div>
                </div>
                )
}
}

export default LoadPath;