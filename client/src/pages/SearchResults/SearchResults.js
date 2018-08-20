import React, { Component } from "react";
import API from "../../utils/API";
// import { Link } from "react-router-dom";
import './searchresults.css';
import PlayerCard from "../../components/PlayerCard/PlayerCard";
import PlayerInfo from "../../components/PlayerInfo/PlayerInfo";

const bgImg = '/images/frenderAmp-small.png';
const divStyle = {
  backgroundImage: 'url(' + bgImg + ')',
};

class SearchResults extends Component {
  state = {
    retrieved: false,
    matchNum: 0,
  };

  nextPlayer = () => {
    let m = this.state.matchNum;
    m++;
    console.log("What's UNDEFINED>>!>?:", this.state.allMatches[m]);
    for (var prop in this.state.allMatches[m]) {
      console.log(`${prop} being set to ${this.state.allMatches[m][prop]}.`)
      this.setState({
        [prop]: this.state.allMatches[m][prop],
        matchNum: m,
      });
    }

  };

  render() {
    console.log(`SearchResults RENDERED`)

    let allMatches = [];
    let m = this.state.matchNum;

    if (!this.state.retrieved) {
      API.getMatches()
        .then((r) => {
          allMatches = r;
          console.log("allmatches variable:", allMatches);
          for (var prop in allMatches[m]) {
            console.log(`${prop} being set.`)
            this.setState({
              allMatches: allMatches,
              [prop]: allMatches[m][prop],
              retrieved: true,
              matchNum: m,
            });
          };
          setTimeout(console.log("SearchResults STATE:", this.state), 2000);
        });
    }
    else {

      //   matchNum++;
      //   console.log("What's UNDEFINED>>!>?:", allMatches[1]);
      //   for (var prop in allMatches[parseInt(matchNum)]) {
      //     console.log(`${prop} being set.`)
      //     this.setState({
      //       [prop]: allMatches[matchNum][prop],
      //     });
      //   };
    };

    return (
      <div className="fullPage"
        style={divStyle}>
        <div className="infoContainer">
          <PlayerCard
            prevState={this.state}
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
