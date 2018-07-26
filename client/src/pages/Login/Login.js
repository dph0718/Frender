import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import './login.css';

const bgImg = '/images/frenderAmp-large.png';
const divStyle = {
  backgroundImage: 'url(' + bgImg + ')',
};

class Login extends Component {
  state = {
    email: "",
    password: "",
  };

  //sends a post method to create user.
  signUp = (e) => {
    e.preventDefault();
    console.log('at least here');
    API.createUser(this.state
      // {
      //   firstName: "Dravon",
      //   password: "Telemundo",
      // }
    );
  };

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

  dummyMethod = () => {
    console.log('dummy method called from click');
    API.dummyMethod();
  }

  render() {
    return (
      <div className="fullPage"
        style={divStyle}>
        <form
        onChange={this.handleInputChange}>
          <h2>Login</h2>
          <h2>Username</h2>
          <input type='text' name='email' id='username' placeholder="username" />
          <h2>Password</h2>
          <input type='password' name='password' id='password' placeholder="password" />
          <p
          onClick={this.dummyMethod}>or
        <a href="#">sign up.</a>
          </p>
          <button type='submit'
            onClick={this.signUp}>Namaste</button>
        </form>
      </div>
    );
  }
}

export default Login;
