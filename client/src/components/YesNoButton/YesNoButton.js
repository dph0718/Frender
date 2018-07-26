import React, { Component } from "react";
import "./yesnobutton.css";

class YesNoButton extends Component {

  render() {
    let image=this.props.image;
    let label = this.props.label;

    return (
      <div className="yesNoButton">
        <div className="clickable"
        onClick={this.props.click}>
          <img className="buttonImage" src={image} />
        </div>
        <h3>{label}</h3>
      </div>
    )
  }
}

export default YesNoButton;
