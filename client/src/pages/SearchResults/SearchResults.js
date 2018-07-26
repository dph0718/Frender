import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import './searchresults.css';
import PlayerCard from "../../components/PlayerCard/PlayerCard";
import PlayerInfo from "../../components/PlayerInfo/PlayerInfo";

const bgImg = '/images/frenderAmp-small.png';
const divStyle = {
  backgroundImage: 'url(' + bgImg + ')',
};

class SearchResults extends Component {
  state = {
    image: "/images/stickman.png",
    name: "Stick Man",
    experience: 4,
    instrumentArray: ['guitar', 'mandolin', 'kazoo'],
    genreArray: ['rock', 'folk'],
    influenceArray: ['Talking Heads', 'Naz', 'Waylon Jennings'],
    endeavour: 2,
    addInfo: "I'd like to win a few more Grammys. Two isn't enough.",
    rating: 4,
  }

  nextPlayer = () => {
    this.setState(
      {
        image: "/images/guitarist.png",
        experience: 3,
        name: "Charles",
        instrumentArray: ['guitar', 'triangle', 'spoons'],
        genreArray: ['rock', 'showtunes'],
        influenceArray: ['Pearl Jam', 'Elton John', 'Barry Manilow'],
        endeavour: 0,
        addInfo: "Even with 3 fingers, I can outplay Jason Mraz.",
        rating: 3,
      }
    );
    this.forceUpdate();
  }
  render() {
    return (
      <div className="fullPage"
        style={divStyle}>
        <div className="infoContainer">
          <PlayerCard
            prevState={this.state}
            // image={this.state.image}
            className='playerCard' />
          <PlayerInfo
            click={this.nextPlayer}
            prevState={this.state}
            className='playerInfo' />
        </div>
      </div>
    );
  }
}

export default SearchResults;
