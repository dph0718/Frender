import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import './login.css';

const bgImg = '/images/FrenderAmp.png';
const divStyle = {
  backgroundImage: 'url(' + bgImg + ')',
};

class Login extends Component {
  state = {
    books: [],
    title: "",
    author: "",
    synopsis: ""
  };

  render() {
    return (
      <div className="fullPage"
      style={divStyle}>
      <form>
        <h2>Login</h2>
        <h2>Username</h2>
        <input type='text' id='username' placeholder="username" />
        <h2>Password</h2>
        <input type='password' id='password' placeholder="password" />
        <p>or
        <a href="#">sign up.</a>
        </p>
        <button type='submit'>Namaste</button>
      </form>
      </div>
    );
  }
}

export default Login;
