import React, { Component } from "react";
import AmpKnob from "../AmpKnob";
import AmpSwitch from "../AmpSwitch";
import { Link, Redirect } from "react-router-dom";
import API from "../../utils/API";
import './nav.css';

class Nav extends Component {
  state = {
    //whether or not user's logged in; boolean
    loggedIn: this.props.loggedIn,
    redirect: false
  };

  componentDidMount() {
    API.doesUserExist().then(res => {
      if (res) {
        console.log("Nav's res from doesUserExist:")
        console.log(res)
        this.setState({ loggedIn: true })
      } else {
        console.log('or res.send(false) solved our issue?')
      }
    });
  };

  componentWillReceiveProps(newProps) {
    if (newProps.loggedIn !== this.props.loggedIn) {
      this.setState({ loggedIn: newProps.loggedIn })
    };
  };

  hitSwitch = () => {
    API.logoutUser().then(res => {
      this.setState({ loggedIn: false });
      this.props.giveState(this.state.loggedIn);
      this.setState({ redirect: true });
    });
  };

  render() {
    let loggedIn = this.state.loggedIn;
    console.log(`Nav   ---  this.state.loggedIn:`)
    console.log(this.state.loggedIn)
    console.log(`Nav   ---  this.props.loggedIn:`)
    console.log(this.props.loggedIn)
    const AmpSwitchHandler = () => {
      if (loggedIn) {
        return (
          <AmpSwitch
            label="Logout"
            loggedIn={loggedIn}
            hitSwitch={this.hitSwitch}
          />
        )
      } else {
        return (
          <Link to="/login" >
            <AmpSwitch
              label="Login"
              loggedIn={loggedIn} />
          </Link>
        )
      };
    };

    //Once the "Logout" switch is hit, it redirects back to the Login page
    //capital R means it's a react component/element. gotta put it within render
        //and unless we're redirecting, it returns 'null' so nothing happens.
    const Redirection = () => {
      if (this.state.redirect) {
        this.setState({ redirect: false });
        return <Redirect to="/login" />;
      } else
        return null;
    };
    
    return (
      <nav className="navbar" >
        < AmpSwitchHandler />
        <Link to="/search"><AmpKnob label="Search" /></Link>
        <Link to="/profile"><AmpKnob label="Edit Profile" /></Link>
        <Link to="/"><AmpKnob label="Messages" /></Link>
        <Link to="/"><AmpKnob label="Matches" /></Link>
        <Link to="/"><AmpKnob label="Treb" /></Link>
        <Redirection />
      </nav>
    )
  };
};
export default Nav;
