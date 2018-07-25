import React from "react";
import AmpKnob from "../AmpKnob";
import AmpSwitch from "../AmpSwitch";
import { Link } from "react-router-dom";
import './nav.css';

const buttonUp = "/images/knoborig.png";

const Nav = () => (


  // [ ] * Routes in here to display knob/switch of page user is on up or down
  //[ ] * Login/Logout if user loggedout/loggedin
  <nav className="navbar">
    <AmpSwitch label="Logout" />
    <Link to="/search"><AmpKnob label="Search" /></Link>
    <Link to="/profile"><AmpKnob label="Edit Profile" /></Link>
    <Link to=""><AmpKnob label="Messages" /></Link>
    <Link to=""><AmpKnob label="Matches" /></Link>
    <Link to=""><AmpKnob label="Treb" /></Link>

  </nav>
);

export default Nav;
