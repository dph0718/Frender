import React, { Component } from "react";
import "./ampknob.css";

const ampNums = '/images/ampNumbers.png';
const ampKnob = '/images/ampKnob.png';

class AmpKnob extends Component {
  state = {
    activeKnob: this.props.activeKnob,
    label: this.props.label,
    path: this.props.path,
    active: false,
    rotate: '33deg',
  }


  componentWillReceiveProps(newProps) {
    if (newProps.activeKnob !== this.props.activeKnob) {
      this.setState({ activeKnob: newProps.activeKnob })
    };

  };


  amIActive = () => {
    if (this.state.active === false) {
      if (this.state.activeKnob === this.state.path) {
        this.setState({ active: true, rotate: '333deg' })
      }
      else{
      }

    } else {
      if (this.state.activeKnob !== this.state.path) {
        this.setState({ active: false, rotate: '33deg' })
      } else {
      }
    }
  }

  clickFunction = () => {
    this.props.pathChange();

    if (this.state.activeKnob == this.state.label.toLowerCase()) {
      console.log(`This is the click function called, because the active knob is this one.`)
    }
    //if it isn't active, turn it.
    if (this.state.active == false) {
      this.setState({
        active: true,
        rotate: '(90deg)'
      })
    }

    //if it is active && the activeKnob isn't this one, unturn it.
    //set active to false.
  }



  render() {
    this.amIActive();
    let style = { transform: `rotate( ${this.state.rotate})` }
    return (
      <div className="knobAndLabel" onClick={this.clickFunction}>
        {/* <div className="knobAndLabel" onClick={this.props.pathChange}> */}
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
