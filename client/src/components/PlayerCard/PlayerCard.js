import React, { Component } from "react";
import "./playercard.css";

class PlayerCard extends Component {
  state = this.props.prevState;

  render() {

    const userPicUrl = this.props.image;
    const userName = this.props.name;

    return (
      <div className="playerCard">
        <h2 className="playerName">{this.state.name}</h2>
        <img className="playerPic" src={this.state.image} />
      </div>
    )
  }
}

export default PlayerCard;