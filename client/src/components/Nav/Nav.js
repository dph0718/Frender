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
    redirect: true,
    activeKnob: this.props.activeKnob,
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
    if (newProps.activeKnob !== this.props.activeKnob) {
      this.setState({ activeKnob: newProps.activeKnob })
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
    //WWhen the Nav is rendered, immediately checks to see if the pathname 
    this.props.pathChange();
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
              loggedIn={loggedIn}
            />
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
        <Link to="/search" ><AmpKnob pathChange={this.props.pathChange} activeKnob={this.state.activeKnob} label="Search" path="search"/></Link>
        <Link to="/profile" ><AmpKnob pathChange={this.props.pathChange} activeKnob={this.state.activeKnob} label="Edit Profile" path="profile"/></Link>
        <Link to="/messages" ><AmpKnob pathChange={this.props.pathChange} activeKnob={this.state.activeKnob} label="Messages"  path="messages"/></Link>
        <Link to="/matches" ><AmpKnob pathChange={this.props.pathChange} activeKnob={this.state.activeKnob} label="Matches"  path="matches"/></Link>
        <Link to="/treb" ><AmpKnob pathChange={this.props.pathChange} activeKnob={this.state.activeKnob} label="Treb"  path="treb"/></Link>
        <Redirection />
      </nav>
    )
  };
};
export default Nav;
