import React, { Component } from "react";
import "./playercard.css";

class PlayerCard extends Component {

  render() {

    const userPicUrl = "/images/stickman.png";
    const userName = "Stick Man";

    return (
      <div className="playerCard">
        <h2 className="playerName">{userName}</h2>
        <img className="playerPic" src={userPicUrl} />
      </div>
    )
  }
}

export default PlayerCard;