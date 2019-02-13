import React, { Component } from "react";
import "./waitingStaff.css";
const waitStaff = '/images/staff_animation.gif';


class WaitStaff extends Component {


  render() {
    return (
      <div id="waitScreen">
        <img src={waitStaff} id="waitStaff" />
      </div>
    )
  }
}

export default WaitStaff;
