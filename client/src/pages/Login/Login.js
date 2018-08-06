import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link, Redirect } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import './login.css';

const bgImg = '/images/frenderAmp-large.png';
const divStyle = {
  backgroundImage: 'url(' + bgImg + ')',
};
const formStyle = {
  backgroundImage: 'url(' + '/images/backstagepass.png' + ')',
}

class Login extends Component {
  state = {
    email: "",
    password: "",
    redirect: false,
  };

  componentDidMount() {
    console.log('Login Mounted');
    API.htmlRoute();
  }
  //sends a post method to create user.
  signUp = (e) => {
    e.preventDefault();
    console.log('at least here');
    API.createUser(this.state);
  };

  logIn = (event) => {
    event.preventDefault();
    //While i'm making this a <Link > component, I'll not make it do anything else. 
    console.log('login page state:', this.state);
    API.logInUser(this.state)
      .then(res => {
        // console.log('that was async??');
        // return <Redirect to="/home" />
        this.setState({ redirect: true })
      });
  }

  handleInputChange = event => {
    // Pull the name and value properties off of the event.target (the element which triggered the event)
    const { name, value } = event.target;
    // Set the state for the appropriate input field
    this.setState({
      [name]: value
    }, () => {
      console.log('tha state during input change:', this.state);
    });
  };


  render() {
    if (this.state.redirect) {
      return <Redirect to="/home" />
    }
    return (
      <div className="fullPage"
        style={divStyle}>
        <div id='loginForm' style={formStyle}>
          <form
            onChange={this.handleInputChange}>
            <h2>Login</h2>
            <Link to="/search"><h3>Email</h3></Link>
            <input type='text' name='email' id='email' placeholder="email" />
            <h3>Password</h3>
            <input type='password' name='password' id='password' placeholder="password" />
            <p>or
        <a href="#"
                onClick={this.signUp}> sign up.</a>
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
