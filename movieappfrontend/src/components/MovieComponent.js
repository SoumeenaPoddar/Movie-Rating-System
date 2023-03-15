import React, { Component } from "react";
import SideBar from "./SideBar/SideBar"
import Content from "./Content/Content"
import NavBar from "./NavBar/NavBar"

class MovieComponent extends Component {

  render() {
    return (
      <div>
        <div className="flex flex-col">
                <NavBar/>
                <div className="flex h-fit">
                    <SideBar/>
                    <Content/>
                </div>
            </div>
      </div>
    );
  }

}

export default MovieComponent;
