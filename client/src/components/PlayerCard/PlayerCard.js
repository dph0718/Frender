import React, { Component } from "react";
import "./playercard.css";


class PlayerCard extends Component {
  state = this.props.prevState;

  componentWillReceiveProps(newProps) {
    if (newProps.loggedIn !== this.props) {
      console.log('player card NEW PROPS!')
      this.setState({ state: newProps })
    }
  };

  render() {
    console.log('playerCards state', this.state)
    return (
      <div className="playerCard">
        <h2 className="playerName">{this.state.name}</h2>
        <img className="playerPic" alt="the user" src={this.state.image} />
      </div>
    )
  }
}

export default PlayerCard;