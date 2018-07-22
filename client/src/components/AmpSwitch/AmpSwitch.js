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

    if (this.state.on) {
      button = switchOn;
    } else {
      button = switchOff;
    }



    return (
      <div className="knobAndLabel"
        onClick={this.flick}>
        <div className="ampKnob clickable">
          <img className="nums" src={button} />
        </div>
        <p>{this.props.label}</p>
      </div>
    )
  }
}

export default AmpSwitch;
