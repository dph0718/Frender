import React, { Component } from "react";
import API from "../../utils/API";
import { Link, Redirect } from "react-router-dom";
import './login.css';

const bgImg = '/images/frenderAmp-large.png';
const divStyle = {
  backgroundImage: 'url(' + bgImg + ')',
};


class Login extends Component {
  state = {
    email: "",
    password: "",
    confirmPassword: "",
    loggedIn: this.props.loggedIn,
    incomplete: false,
    bottom: '100vw',
    droppedIn: false,
    confirming: false,
    passwordsMatch: false,
  };


  componentWillReceiveProps(newProps) {
    if (newProps.loggedIn !== this.props.loggedIn) {
      this.setState({ loggedIn: newProps.loggedIn })
    }
  };

  componentDidMount() {
    if (this.state.droppedIn === false) {
      setTimeout(() => {
        this.dropIn();
      }, 300);
    } else {
    }
  }


  checkPasswords = () => {
    this.setState({ confirming: true });

    let password1 = this.state.password;
    let password2 = this.state.confirmPassword;

    // if (password1 && (password1 === password2) && this.state.passwordsMatch === false) {
    if (password1 && (password1 === password2)) {
      this.setState({ passwordsMatch: true })
    } else {
      this.setState({ passwordsMatch: false })
    }
  }
  //sends a post method to create user.
  signUp = (e) => {
    e.preventDefault();

    API.createUser(this.state).then(() => {
      console.log('created user, now trying to log in using same info.')
      this.logIn();
    });
  };

  dropIn = () => {
    setTimeout(() => {
      this.setState({
        droppedIn: true,
        bottom: '4vw'
      })
    }, 50);
  }


  logIn = (event) => {
    if (event) {
      event.preventDefault();
    };
    API.logInUser(this.state)
      .then(res => {
        if (res) {
          this.setState({ loggedIn: true })
          //giveState = grabLoggedState from App.js
          this.props.giveState(this.state.loggedIn);
        } else {
        }
      });
  };

  handleInputChange = event => {
    // Pull the name and value properties off of the event.target (the element which triggered the event)
    const { name, value } = event.target;
    // Set the state for the appropriate input field
    this.setState({
      [name]: value
    });
  };

  render() {
    let formStyle = {
      backgroundImage: 'url(/images/backstagepass.png)',
      bottom: this.state.bottom,
    }

    const PasswordsNoMatch = () => {
      if (this.state.confirming === true) {
        // if (this.state.passwordsMatch === false) {
        console.log(this.state.password, this.state.confirmPassword, this.state.passwordsMatch)
        if (this.state.password !== this.state.confirmPassword) {
          if (this.state.passwordsMatch === true) {
            this.setState({ passwordsMatch: false })
          }
          return <p>Passwords do not match.</p>
        } else {
          if (this.state.passwordsMatch === false) {
            this.setState({ passwordsMatch: true })
          }
          return <p>You're good to go! Click 'sign up' again to register.</p>
        }

        // if (this.state.confirming === true) {
        //   if (password1 && this.state.email) {
        //     if (password1 !== password2) {
        //       return <p>Passwords do not match.</p>
        //     } else {
        //       return <p>You're good to go! Click 'sign up' again to register.</p>
        //     }

        //   } else return null
        // } else {
        //   return null;
        // }
      } else {
        return null
      }
    }

    // If the User is signing up, then the password match confirmation will be visible.
    let confirmVis = { visibility: 'hidden' };
    if (this.state.confirming === true) {
      confirmVis = { visibility: 'visible' }
    }


    //if they have info, Redirect to /home, 
    //if not, redirect to /profile
    if (this.state.loggedIn) {
      {
        // return <Redirect to="/profile" />
        return <Redirect to="/home" />
        // [ ] Redirect to /profile from Home if their info is incomplete
      }
    }

    return (
      <div className="fullPage"
        style={divStyle}>
        <div id='loginForm' style={formStyle} top={this.state.bottom}>
          <form id="logFormEl"
            onChange={this.handleInputChange}>
            <h2>Login</h2>
            <h3>Email</h3>
            <input type='text' name='email' id='email' placeholder="email" />
            <h3>Password</h3>
            <input type='password' name='password' id='password' placeholder="password" />
            <input type='password' onChange={this.checkPasswords} name='confirmPassword' id='confirmPassword' placeholder="Confirm password" style={confirmVis} />
            <PasswordsNoMatch />
            <p>or
        <span id="signUp"
                // onClick={this.signUp}> sign up.</span>
                onClick={this.state.passwordsMatch ? this.signUp : this.checkPasswords  }> sign up.</span>
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
