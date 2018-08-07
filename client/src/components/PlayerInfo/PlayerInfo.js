import React, { Component } from "react";
import "./playerinfo.css";
import YesNoButton from "../YesNoButton/YesNoButton";

//takes the arrays and makes them readable.
const sentencify = (arr) => {
  let sentence = arr.slice(0, arr.length - 1).join(', ') + ", and " + arr.slice(-1);
  let listSent = sentence.charAt(0).toUpperCase() + sentence.substr(1)
  return listSent;
}



const yesButton = "/images/lesdudis.png";
const noButton = "/images/notmyjam.png";

class PlayerInfo extends Component {
  state = this.props.prevState;

  // {
  //   experience: 4,
  //   instrumentArray: ['guitar', 'mandolin', 'kazoo'],
  //   genreArray: ['rock', 'folk'],
  //   influenceArray: ['Talking Heads', 'Naz', 'Waylon Jennings'],
  //   endeavour: 2,
  //   addInfo: "I'd like to win a few more Grammys. Two isn't enough.",
  //   rating: 4,
  // }

  // nextPlayer = () => {
  //   this.setState(
  //     {
  //       experience: 3,
  //       instrumentArray: ['guitar', 'triangle', 'spoons'],
  //       genreArray: ['rock', 'showtunes'],
  //       influenceArray: ['Pearl Jam', 'Elton John', 'Barry Manilow'],
  //       endeavour: 0,
  //       addInfo: "Even with 3 fingers, I can outplay Jason Mraz.",
  //       rating: 3,
  //     }
  //   );
  // }

  doClick = () => {
    console.log('player info.js onClick method.')
    this.props.click();
    this.setState(this.props.prevState);
    this.forceUpdate();
  }
  render() {

    //pass in props on each iteration to define the variables:
    // let experience = 4;
    // let instrumentArray = ['guitar', 'mandolin', 'kazoo'];
    // let genreArray = ['rock', 'folk'];
    // let influenceArray = ['Talking Heads', 'Naz', 'Waylon Jennings'];
    // let endeavour = 2;
    // let addInfo = "I'd like to win a few more Grammys. Two isn't enough."
    // let rating = 4;

    //render stars for user's skill level
    let starray = []
    let star = String.fromCharCode(0x2605);
    for (let i = 0; i <= this.state.experience; i++) {
      starray.push(star)
    };
    let rateArray = [];
    for (let i = 0; i <= this.state.rating; i++) {
      rateArray.push(star)
    };

    //some code for making the arrays readable.
    const instruments = sentencify(this.state.instrumentArray);
    const genres = sentencify(this.state.genreArray);
    const influences = sentencify(this.state.influenceArray);

    //translate the endeavor to something readable.
    let endeavor;
    switch (this.state.endeavour) {
      case 0: endeavor = "Write music.";
        break;
      case 1: endeavor = "Do covers.";
        break;
      case 2: endeavor = "Just see what happens.";
        break;
        default: endeavor = "For some reason, there isn't any aspiration at all here."
    }

    //put a truth meter somewhere in here too, so people can rate other musicians on their honesty about skill level
    //, or average their skill ratings by other players.
    return (
      <div className="playerInfo">
        <p className="infoBit"><strong>Experience:</strong> <span className="starz"> {starray} </span></p>
        <p className="infoBit"><strong>Rating:</strong> <span className="starz"> {rateArray} </span></p>
        <p className="infoBit"><strong>Instruments:</strong> {instruments}</p>
        <p className="infoBit"><strong>Genres:</strong> {genres}</p>
        <p className="infoBit"><strong>Influences:</strong> {influences}</p>
        <p className="infoBit"><strong>Creative Endeavors:</strong> {endeavor}</p>
        <p className="infoBit"><strong>Additional Info:</strong> {this.state.addInfo}</p>
        <div className='yesNoButtonBox'>
          <YesNoButton
            image={noButton}
            label="Not my jam"
            click={this.doClick} />
          <YesNoButton
            image={yesButton}
            label="Les Dudis"
          />
        </div>

      </div>
    )
  }
}

export default PlayerInfo;