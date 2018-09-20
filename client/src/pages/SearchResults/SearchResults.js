import React, { Component } from "react";
import API from "../../utils/API";
import { Link, Redirect } from "react-router-dom";
import './searchresults.css';
import PlayerCard from "../../components/PlayerCard/PlayerCard";
import PlayerInfo from "../../components/PlayerInfo/PlayerInfo";

const bgImg = '/images/frenderAmp-small.png';
const divStyle = {
  backgroundImage: 'url(' + bgImg + ')',
};

class SearchResults extends Component {
  state = {
    //have matches been retrieved from db?
    retrieved: false,
    //begin iterating through matches at 0.
    matchNum: 0,
  };

  //increases match number, sets the state to the next matched user's info
  nextPlayer = () => {
    let m = this.state.matchNum;
    m++;
    for (var prop in this.state.allMatches[m]) {
      this.setState({
        [prop]: this.state.allMatches[m][prop],
        matchNum: m,
      });
    }
  };

  render() {
    let allMatches = [];
    let m = this.state.matchNum;

    const Redirection = () => {
      if (this.state.redirect) {
        this.setState({ redirect: false });
        return <Redirect to="/gologin" />;
      } else
        return null;
    };

    if (!this.state.retrieved) {
      API.getMatches()
        .then((r) => {
          if (r == "negativeGhostRider") {
            this.setState({ redirect: true })
          }
          allMatches = r;
          // console.log("allmatches variable:", allMatches);
          for (var prop in allMatches[m]) {
            // console.log(`${prop} being set.`)
            this.setState({
              allMatches: allMatches,
              [prop]: allMatches[m][prop],
              retrieved: true,
              matchNum: m,
            });
          };
          // setTimeout(console.log("SearchResults STATE:", this.state), 2000);
        });
    }
    else {


      //what do we do if it IS retrieved?
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
        <Redirection />
      </div>
    );
  }
}

export default SearchResults;
