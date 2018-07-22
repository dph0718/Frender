import React, { Component } from "react";
import "./ampswitch.css";

const switchOn = '/images/switch-on.png';
const switchOff = '/images/switch-off.png';

class AmpSwitch extends Component {
  state = {
    on: true
  }

  flick = () => {
    let on = this.state.on;
    this.setState({ on: !on })
  }

  render() {

    let button;
    let logLabel;

    if (this.state.on) {
      button = switchOn;
      logLabel= "Logout";
    } else {
      logLabel= "Login";
      button = switchOff;
    }

    return (
      <div className="knobAndLabel"
        onClick={this.flick}>
        <div className="ampKnob clickable">
          <img className="nums" src={button} />
        </div>
        <p>{logLabel}</p>
      </div>
    )
  }
}

export default AmpSwitch;