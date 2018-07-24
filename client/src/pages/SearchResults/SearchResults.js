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


  render() {
    return (
      <div className="fullPage"
        style={divStyle}>
        <PlayerCard />
        <PlayerInfo />
      </div>
    );
  }
}

export default SearchResults;
