import React from "react";
import AmpKnob from "../AmpKnob";
import AmpSwitch from "../AmpSwitch";
import './nav.css';

const buttonUp = "/images/knoborig.png";

const Nav = () => (


  // [ ] * Routes in here to display knob/switch of page user is on up or down
  //[ ] * Login/Logout if user loggedout/loggedin
  <nav className="navbar">
    <AmpSwitch label="Logout" />
    <AmpKnob label="Search" />
    <AmpKnob label="Edit Profile" />
    <AmpKnob label="Messages" />
    <AmpKnob label="Matches" />
    <AmpKnob label="Treb" />

  </nav>
);

export default Nav;
