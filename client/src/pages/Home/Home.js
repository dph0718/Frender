import React, { Component } from "react";
import API from "../../utils/API";
import './home.css';

const bgImg = '/images/frenderAmp-small.png';
const divStyle = {
  backgroundImage: 'url(' + bgImg + ')',
};

class Home extends Component {
  state = {
    email: '',
    password: "",
  };

  componentDidMount() {
    //in here, set state to the user's info -- use a route?
    API.getUserInfo(this);
    // AmpSwitch.setState({on: true})
  }

  render() {
    console.log('HOME has begun to render')
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
