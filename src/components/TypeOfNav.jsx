import React, {Component} from "react";
//import { RobotDataContext } from './RobotDataContext'; 
// eslint-disable-next-line
import bootstrap from "bootstrap"; 

class TypeOfNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
          toggleText: "Choose Nav Type"
        };
        this.waypointNav = this.waypointNav.bind(this);
        this.surfaceCoverage = this.surfaceCoverage.bind(this);
    }


    waypointNav() {
        this.setState({toggleText: "Waypoint Navigation"})
        console.log("hey 1")
    }


    surfaceCoverage() {
        this.setState({toggleText: "Surface Coverage"})
        console.log("hey 2")
    }


    render() {
        return (    
                <div className="dropdown">
                    <button className="btn btn-info dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {this.state.toggleText}
                    </button>

                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <button className="dropdown-item" onClick={this.waypointNav}> Waypoint Navigation </button>
                        <button className="dropdown-item" onClick={this.surfaceCoverage}> Surface Coverage </button>
                    </div>
                </div>
                )
}
}

export default TypeOfNav;