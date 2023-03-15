import React, { Component } from "react";
import HeaderComponent from "./HeaderComponent";
import ReviewComponent from "./ReviewComponent";

class MovieDetailsComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movieData:[],
      tralier:null,
      showModal:false
    };
  
  }

  async componentDidMount() {
    
  }

  render() {
    return (
      <div>
        <HeaderComponent/>
        <ReviewComponent/>
    </div>
    );
  }
}

export default MovieDetailsComponent;
