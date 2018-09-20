import React, { Component } from "react";
import API from "../../utils/API";
import './home.css';
import { Redirect } from "react-router-dom";


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
    API.getUserInfo(this).then(() => {
      if (this.state.firstName == null) {
        this.setState({incomplete: true})
      }
    });
  }

  render() {
    // console.log('HOME has begun to render')
    if (this.state.incomplete == true) {
      console.log("no name, && incomplete, so REDIRECTING TO profile")
      return <Redirect to="/profile" />
    }
    return (
      <div className="fullPage"
        style={divStyle}>
        <div className="infoContainer">
          <h1>Home Page </h1>
          {/* <p>{req.user}</p> */}
          <h2> Your email is: {this.state.email}</h2>
          <h2> Your id is: {this.state._id}</h2>
        </div>
      </div>
    );
  }
}

export default Home;
