import React, { Component } from "react";
import "./waitingStaff.css";
const waitStaff = '/images/staff_animation.gif';


class WaitStaff extends Component {
  
  state = {
    restPosition: "center",
  }

  // switchPosish = () => {
  //   switch (this.state.restPosition) {
  //     case "right": this.setState({ restPosition: "center" });
  //     console.log('Gettin" set to "center"');
      
  //       break;
  //     case "center": this.setState({ restPosition: "left" });
  //     console.log('Gettin" set to "left"');

  //       break;
  //     case "left": this.setState({ restPosition: "right" });
  //     console.log('Gettin" set to "fight"');

  //       break;
  //   }
  // }

componentDidMount(){console.log('WaitingStaff did mount.');
}

  render() {
    return (
      <div id="waitScreen">

        <img src={waitStaff} id="waitStaff"  />

      </div>
    )
  }
}

export default WaitStaff;
