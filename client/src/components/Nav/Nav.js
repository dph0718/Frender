import React from "react";
import AmpKnob from "../AmpKnob";
import './nav.css';

const buttonUp = "/images/knoborig.png";

const Nav = () => (


  // [ ] * Routes in here to display knob/switch of page user is on up or down
  //[ ] * Login/Logout if user loggedout/loggedin
  <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
    <a className="navbar-brand" href="/">
    <AmpKnob label="Logout" />
      Logout
    </a>

  </nav>
);

export default Nav;
