import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import './home.css';
import PlayerCard from "../../components/PlayerCard/PlayerCard";
import PlayerInfo from "../../components/PlayerInfo/PlayerInfo";

const bgImg = '/images/frenderAmp-small.png';
const divStyle = {
  backgroundImage: 'url(' + bgImg + ')',
};

class Home extends Component {
  state = { 
    email: '',
    password: "",
   };

  componentDidMount(){
    console.log('homeMethod next, right?')
    console.log('state inherited? (should be email & password?', this.state)
    //in here, set state to the user's info -- use a route?
    API.homeMethod(this);
    // API.logInUser(this.state);

  }




  render() {
    return (
      <div className="fullPage"
        style={divStyle}>
        <div className="infoContainer">
        <h1>Home Page </h1>
        {/* <p>{req.user}</p> */}
        <h2> Your email is: {this.state.email}</h2>
        <h2> Your id is: {this.state.id}</h2>
        </div>
      </div>
    );
  }
}

export default Home;
