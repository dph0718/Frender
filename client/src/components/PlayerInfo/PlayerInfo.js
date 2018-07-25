import React, { Component } from "react";
import "./playerinfo.css";

//takes the arrays and makes them readable.
const sentencify = (arr) => {
  let sentence = arr.slice(0, arr.length - 1).join(', ') + ", and " + arr.slice(-1);
  let listSent = sentence.charAt(0).toUpperCase() + sentence.substr(1)
  return listSent;
}

class PlayerInfo extends Component {

  render() {

    //pass in props on each iteration to define the variables:
    const experience = 4;
    const instrumentArray = ['guitar', 'mandolin', 'kazoo'];
    const genreArray = ['rock', 'folk'];
    const influenceArray = ['Talking Heads', 'Naz', 'Waylon Jennings'];
    const endeavour = 2;
    const addInfo = "I'd like to win a few more Grammys. Two isn't enough."
    const rating = 4;

    //render stars for user's skill level
    let starray = []
    let star = String.fromCharCode(0x2606);
    for (let i = 0; i < experience; i++) {
      starray.push(star)
    };
    let rateArray = [];
    for (let i = 0; i < experience; i++) {
      rateArray.push(star)
    };

    //some code for making the arrays readable.
    const instruments = sentencify(instrumentArray);
    const genres = sentencify(genreArray);
    const influences = sentencify(influenceArray);

    //translate the endeavor to something readable.
    let endeavor;
    switch (endeavour) {
      case 0: endeavor = "Write music.";
        break;
      case 1: endeavor = "Do covers.";
        break;
      case 2: endeavor = "Just see what happens.";
        break;
    }

    //put a truth meter somewhere in here too, so people can rate other musicians on their honesty about skill level
    //, or average their skill ratings by other players.
    return (
      <div className="playerInfo">
        <p className="infoBit"><strong>Experience:</strong> {starray}</p>
        <p className="infoBit"><strong>Rating:</strong> {rateArray}</p>
        <p className="infoBit"><strong>Instruments:</strong> {instruments}</p>
        <p className="infoBit"><strong>Genres:</strong> {genres}</p>
        <p className="infoBit"><strong>Influences:</strong> {influences}</p>
        <p className="infoBit"><strong>Creative Endeavors:</strong> {endeavor}</p>
        <p className="infoBit"><strong>Additional Info:</strong> {addInfo}</p>

      </div>
    )
  }
}

export default PlayerInfo;