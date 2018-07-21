import React, { Component } from "react";
import "./ampknob.css";

const ampNums = '/images/ampNumbers.png';
const ampKnob = '/images/ampKnob.png';

class AmpKnob extends Component {
  state = {
    turned: false
  }

  render() {
    return (
      <div className="ampKnob">
        <img className="nums" src={ampNums}/>
        <img className="knob" src={ampKnob}/>
        <p>{this.props.label}</p>
      </div>
    )
  }
}

export default AmpKnob;
