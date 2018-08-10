import React, { Component } from "react";
import AmpKnob from "../AmpKnob";
import AmpSwitch from "../AmpSwitch";
import { Link, Redirect } from "react-router-dom";
import API from "../../utils/API";
import './nav.css';

class Nav extends Component {
  state = {
    loggedIn: this.props.loggedIn,
    redirect: false
  }

  componentDidMount() {
    API.doesUserExist().then(res => {
      if (res) {
        this.setState({ loggedIn: true })
      } else {
      }
    })
  }

  componentWillReceiveProps(newProps) {
    if (newProps.loggedIn !== this.props.loggedIn) {
      this.setState({ loggedIn: newProps.loggedIn })
    }
  };

  hitSwitch = () => {
    API.logoutUser().then(res => {
      this.setState({ loggedIn: false });
      this.props.giveState(this.state.loggedIn);
      this.setState({ redirect: true });
    });
  }

  render() {
    const loggedIn = this.state.loggedIn;

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
      }
    };

    const Redirection = () => {
      if (this.state.redirect) {
        this.setState({ redirect: false });
        return <Redirect to="/login" />;
      } else
        return null;
    }
    
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
  }
}
export default Nav;
