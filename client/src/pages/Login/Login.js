import React, { Component } from "react";
import API from "../../utils/API";
import { Link, Redirect } from "react-router-dom";
import './login.css';

const bgImg = '/images/frenderAmp-large.png';
const divStyle = {
  backgroundImage: 'url(' + bgImg + ')',
};
const formStyle = {
  backgroundImage: 'url(/images/backstagepass.png)',
}

class Login extends Component {
  state = {
    email: "",
    password: "",
    loggedIn: this.props.loggedIn
  };

  componentWillReceiveProps(newProps) {
    if (newProps.loggedIn !== this.props.loggedIn) {
      this.setState({ loggedIn: newProps.loggedIn })
    }
  };
  //sends a post method to create user.
  signUp = (e) => {
    e.preventDefault();
    API.createUser(this.state);
  };

  logIn = (event) => {
    event.preventDefault();
    API.logInUser(this.state)
      .then(res => {
        if (res) {
          this.setState({ loggedIn: true })
          //giveState = grabLoggedState from App.js
          this.props.giveState(this.state.loggedIn)
        } else {
          console.log('was no "RES" from logInUser. :(')
        }
      });
  }

  handleInputChange = event => {
    // Pull the name and value properties off of the event.target (the element which triggered the event)
    const { name, value } = event.target;
    // Set the state for the appropriate input field
    this.setState({
      [name]: value
    }, () => {
      //Not doing nothin in here. Yet.
    });
  };

  render() {
    if (this.state.loggedIn) {
      return <Redirect to="/home" />
    }
    return (
      <div className="fullPage"
        style={divStyle}>
        <div id='loginForm' style={formStyle}>
          <form
            onChange={this.handleInputChange}>
            <h2>Login</h2>
            <h3>Email</h3>
            <input type='text' name='email' id='email' placeholder="email" />
            <h3>Password</h3>
            <input type='password' name='password' id='password' placeholder="password" />
            <p>or
        <span
                onClick={this.signUp}> sign up.</span>
            </p>
            <button type='submit'
              onClick={this.logIn}
            >Log In</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
