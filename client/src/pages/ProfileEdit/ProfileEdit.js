import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import './profileEdit.css';
import PlayerCard from "../../components/PlayerCard/PlayerCard";
import ProfileForm from "../../components/ProfileForm/ProfileForm";

const bgImg = '/images/frenderAmp-small.png';
const divStyle = {
  backgroundImage: 'url(' + bgImg + ')',
};

class SearchResults extends Component {

  render() {
    return (
      <div className="fullPage"
        style={divStyle}>
        <ProfileForm />
      </div>
        );
      }
    }
    
    export default SearchResults;