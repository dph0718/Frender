import React, { Component } from "react";
import "./ampknob.css";

const ampNums = '/images/ampNumbers.png';
const ampKnob = '/images/ampKnob.png';

class AmpKnob extends Component {
  state = {
    active: this.props.activeKnob,
    label: this.props.label,
    turnt: false,
    rotate: '(0deg)',
  }

  clickFunction = () => {
    console.log('clickFunction in Amn=pknowb')
    //if it isn't turnt, turn it.
    if (this.state.turnt == false) {
      this.setState({ 
        turnt: true, 
        rotate: '(90deg)' })
    }

    //if it is turnt && the activeKnob isn't this one, unturn it.
    //set turnt to false.
  }



  render() {
    let style = { transform: `rotate( ${this.state.rotate})` }

    return (
      <div className="knobAndLabel" onClick={this.clickFunction}>
        <div className="ampKnob clickable">
          <img className="nums" alt="knob numbers" src={ampNums} />
          <img className="knob" alt="amp knob" src={ampKnob} style={style} />
        </div>
        <p>{this.state.label}</p>
      </div>
    )
  }
}

export default AmpKnob;
