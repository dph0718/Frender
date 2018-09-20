import React, { Component } from "react";
import "./playerinfo.css";
import YesNoButton from "../YesNoButton/YesNoButton";

//takes the arrays and makes them readable.
const sentencify = (arr) => {
  if (arr) {
    let sentence;
    if (arr.length > 2) {
      sentence = arr.slice(0, arr.length - 1).join(', ') + ", and " + arr.slice(-1);
    } else if (arr.length == 2) {
      sentence = arr.slice(0, arr.length - 1).join(', ') + " and " + arr.slice(-1);
    } else if (arr.length < 2) {
      sentence = `${arr[0]}`;
    }
    let listSent = sentence.charAt(0).toUpperCase() + sentence.substr(1)
    return listSent;
  } else return;
};

const yesButton = "/images/lesdudis.png";
const noButton = "/images/notmyjam.png";

class PlayerInfo extends Component {
  state = this.props.prevState;

  componentWillReceiveProps(newProps) {
    if (newProps !== this.props) {
      // console.log('player INFO NEW PROPS!')
      this.setState(newProps.prevState)
    }
  };

  doClick = () => {
    // console.log('player info.js onClick method.')
    this.props.click();
    this.setState(this.props.prevState);
    this.forceUpdate();
  }
  
  render() {
    // console.log(`PlayerInfo STATE at render: ${this.state}`)

    //render stars for user's skill level & rating
    let starray = []
    let star = String.fromCharCode(0x2605);
    for (let i = 1; i <= parseInt(this.state.experience); i++) {
      starray.push(star)
    };
    let rateArray = [];
    for (let i = 1; i <= this.state.rating; i++) {
      rateArray.push(star)
    };

    //some code for making the arrays readable.
    const instruments = sentencify(this.state.instruments);
    const genres = sentencify(this.state.genres);
    const influences = sentencify(this.state.influences);

    //translate the endeavor to something readable.
    let endeavor = parseInt(this.state.endeavors);
    switch (endeavor) {
      case 1: endeavor = "Write music.";
        break;
      case 2: endeavor = "Do covers.";
        break;
      case 3: endeavor = "Just see what happens.";
        break;
      default: endeavor = "For some reason, there isn't any aspiration at all here."
    }

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