import React, { Component } from "react";
import "./playercard.css";


class PlayerCard extends Component {
  state = this.props.prevState;

  componentWillReceiveProps(newProps) {
    if (newProps !== this.props) {
      console.log('player card NEW PROPS!', newProps)
      this.setState(  newProps.prevState )
    }
  };

  render() {
    console.log('playerCards STATE at RENDER:', this.state)
    return (
      <div className="playerCard">
        <h2 className="playerName">{this.state.firstName}</h2>
        <img className="playerPic" alt="the user" src={this.state.image} />
      </div>
    )
  }
}

export default PlayerCard;