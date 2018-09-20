import React, { Component } from "react";
import API from "../../utils/API";
import './gologin.css';
import { Link, Redirect } from "react-router-dom";


const bgImg = '/images/frenderAmp-small.png';
const divStyle = {
  backgroundImage: 'url(' + bgImg + ')',
};

class GoLogIn extends Component {

  render() {
    return (
      <div className="fullPage"
        style={divStyle}>
        <div className="infoContainer">
          <h1>If you were logged in, you would be seeing something more useful. </h1>
          <Link to="/login">
            <h2>Go Log In!</h2>
          </ Link>
        </div>
      </div>
    );
  }
}

export default GoLogIn;
