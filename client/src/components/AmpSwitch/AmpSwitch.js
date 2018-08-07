import React, { Component } from "react";
import "./ampswitch.css";
// import { Link } from "react-router-dom";

// import API from '../../utils/API'

const switchOn = '/images/switch-on.png';
const switchOff = '/images/switch-off.png';

class AmpSwitch extends Component {
  state = {
    loggedIn: this.props.loggedIn
  }

  // flick = () => {

  //   let on = this.state.on;
  //   this.setState({ on: !on })
  // }
  
  componentWillReceiveProps(newProps){
    if(newProps.loggedIn !== this.props.loggedIn){
      this.setState({loggedIn: newProps.loggedIn})
      console.log("AmpSwitch  received new Props:", this.props.loggedIn)
      console.log("AmpSwitch setState:", this.state.loggedIn)
    }
  };

  render() {
    console.log(`Ampswitch is Rendering----`)
    console.log(`Its state.loggedIn is currently:`, this.state.loggedIn)
    let button;
    let logLabel;

    if (this.state.loggedIn) {
      button = switchOn;
      logLabel = "Logout";
    } else {
      logLabel = "Login";
      button = switchOff;
    }

    return (
      <div className="knobAndLabel"
        onClick={this.props.onClick}
        >
        <div className="ampKnob clickable">
          <img className="nums" alt="amp switch" src={button} />
        </div>
        <p>{logLabel}</p>
      </div>
    )
  }
}

export default AmpSwitch;