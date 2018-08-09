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

  // componentDidMount() {
  //   console.log('Login Mounted', this.state.loggedIn);
  //   // API.htmlRoute();
  //   API.doesUserExist().then(res => {
  //     if (res) {
  //       console.log('Login mounted and detected a user?')
  //       this.setState({ loggedIn: true }).then(
  //         this.props.giveState(this.state.loggedIn)
  //       )
  //     } else {
  //       this.setState({loggedIn: false})
  //       console.log("There is no validated user. (Login.js)");
  //     }
  //   })
  // }

  componentWillReceiveProps(newProps) {
    if (newProps.loggedIn !== this.props.loggedIn) {
      this.setState({ loggedIn: newProps.loggedIn })
      console.log("Login received new Props:", this.props.loggedIn)
      console.log("Login's setState:", this.state.loggedIn)
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
          console.log('and the res from API.loginUser was:', res)
          this.setState({ loggedIn: true })
          //giveState = grabLoggedState from App.js
          console.log('Does the givestate run before its rerendered??')
          this.props.giveState(this.state.loggedIn)
        } else {
          console.log('was no "RES" from logInUser. :(')
        }
        console.log("end of log in function")

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

  componentDidMount() {
    console.log('Login Mounted.')
  };

  render() {
    console.log('Begin Login Render:')
    console.log(`The state.loggedIn here in Login.js is:`, this.state.loggedIn)
    if (this.state.loggedIn) {
      console.log(`apparently there's already a user in Login.js, so a redirect occured!`)
      return <Redirect to="/home" />
    }
    console.log(`apparently, Login.js didn't detect a user; state.loggedIn:`, this.state.loggedIn)
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
