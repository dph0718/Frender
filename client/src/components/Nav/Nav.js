import React, { Component } from "react";
import AmpKnob from "../AmpKnob";
import AmpSwitch from "../AmpSwitch";
import { Link, Redirect } from "react-router-dom";
import API from "../../utils/API";
import './nav.css';

// const buttonUp = "/images/knoborig.png";

class Nav extends Component {
  state = {
    // loggedIn: this.props.loggedIn
    redirect: false
  }
  componentDidMount() {
    // API.htmlRoute();
    console.log('Nav Mounted!')
    API.doesUserExist().then(res => {
      if (res) {
        this.setState({ loggedIn: true })
        console.log('Logged in (nav.js)', this.state.loggedIn);
      } else {
        console.log("There is no validated user. (Nav.js)");
      }
    })
  }

  componentWillReceiveProps(newProps) {
    if (newProps.loggedIn !== this.props.loggedIn) {
      this.setState({ loggedIn: newProps.loggedIn })
      console.log("Nav received new Props:", this.props.loggedIn)
      console.log("Nav setState:", this.state.loggedIn)
    }
  };

  hitSwitch = () => {
    console.log('switch..?');
    if (this.state.loggedIn) {
      console.log('is logged in:', this.state.loggedIn)
      API.logoutUser().then(res => {
        this.setState({ loggedIn: false });
        this.props.giveState(this.state.loggedIn);
        console.log('api logged out user');
      });
    } else {
      console.log('is not logged in:', this.state.loggedIn)
      console.log('clicking that should redirect to login page.')
    }
  };



  render() {
    console.log('Begin NAVBAR render');
    //'lift state up'
    const loggedIn = this.props.loggedIn;
    console.log(`'Nav's loggedIn prop:'`, loggedIn)

    const AmpSwitchHandler = () => {
      console.log('making an AmpSwitchHandler. logged in:', loggedIn)
      if (loggedIn) {
        console.log(`True, and so it returns Ampswitch.`)
        return (
          <AmpSwitch
            label="Logout"
            loggedIn={loggedIn}
            onClick={this.hitSwitch} />
        )
      } else {
        console.log(`False, and so it's a link.`)
        return (
          <Link to="/login" >
            <AmpSwitch
              label="Login"
              loggedIn={loggedIn} />
          </Link>
        )
      }
      // return (
      //   loggedIn ?
      //     <AmpSwitch
      //       label="Logout"
      //       loggedIn={loggedIn}
      //       onClick={this.hitSwitch} /> :
      //     <Link to="/login" >
      //       <AmpSwitch
      //         label="Login"
      //         loggedIn={loggedIn} />
      //     </Link>
      // )

    };
    let ampswitch = this.ampSwitchHandler;

    // if (this.state.redirect) {
    //   return <Redirect to="/login" />
    // }
    return (
      <nav className="navbar">
      <p> before ampswitchHandler </p>
        < AmpSwitchHandler />
        <p> &amp; after </p>
        {/* <AmpSwitch label="Logout" loggedIn={this.state.loggedIn}/> */}
        {/* <AmpSwitch
          label="Logout"
          loggedIn={loggedIn}
          onClick={this.hitSwitch} /> */}
        <Link to="/search"><AmpKnob label="Search" /></Link>
        <Link to="/profile"><AmpKnob label="Edit Profile" /></Link>
        <Link to="/"><AmpKnob label="Messages" /></Link>
        <Link to="/"><AmpKnob label="Matches" /></Link>
        <Link to="/"><AmpKnob label="Treb" /></Link>

      </nav>
    )
  }

}

// [ ] * Routes in here to display knob/switch of page user is on up or down
//[ ] * Login/Logout if user loggedout/loggedin


export default Nav;
