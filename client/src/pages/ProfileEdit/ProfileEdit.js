import React, { Component } from "react";
import API from "../../utils/API";
import { Link, Redirect } from "react-router-dom";
import './profileEdit.css';
// import PlayerCard from "../../components/PlayerCard/PlayerCard";
import ProfileForm from "../../components/ProfileForm/ProfileForm";

const bgImg = '/images/frenderAmp-small.png';

const divStyle = {
  backgroundImage: 'url(' + bgImg + ')',
};

class ProfileEdit extends Component {
  state = {};

componentWillMount(){
  API.doesUserExist()
  .then(
    (r) => {
      if (r == "negativeGhostRider") {
        //Turn this back on when log in is needed.
        // this.setState({ redirect: true })
      } 
    });

};

  render() {

    // API.doesUserExist()
    //   .then(
    //     (r) => {
    //       if (r == "negativeGhostRider") {
    //         this.setState({ redirect: true })
    //       }
    //     });

    const Redirection = () => {
      if (this.state.redirect) {
        this.setState({ redirect: false });
        return <Redirect to="/gologin" />;
      } else
        return null;
    };

    return (
      <div className="fullPage"
        style={divStyle}>
        <ProfileForm />
        <Redirection />
      </div>
    );
  };
};

export default ProfileEdit;