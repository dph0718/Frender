import React, { Component } from "react";
import "./playercard.css";

let tempImage = "/images/guitarist.png"
let tempName = "Charles"

class PlayerCard extends Component {
  state = this.props.prevState;

  render() {

    return (
      <div className="playerCard">
        <h2 className="playerName">{tempName}</h2>
        <img className="playerPic" src={tempImage} />
      </div>
    )
  }
}

export default PlayerCard;