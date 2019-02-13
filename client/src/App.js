import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import Login from "./pages/Login";
import SearchResults from "./pages/SearchResults";
import ProfileEdit from "./pages/ProfileEdit";
import Home from "./pages/Home";
import API from "./utils/API";
import GoLogIn from "./pages/GoLogIn/GoLogIn";
import WaitScreen from "./components/WaitingStaff";


const colorStyle = {
  backgroundColor: "black",
}



class App extends Component {
  state = {
    loggedIn: false,
    activeKnob: "none",
    ampImageLoaded: false,
  };

  didPathChange = () => {
    let pathName = (window.location.pathname).replace('/', '');
    if (this.state.activeKnob !== pathName) {
      this.setState({ activeKnob: pathName })
    };
  };

  grabActiveKnob = (knobActive) => {
    this.setState({ activeKnob: knobActive })
  };

  grabLoggedState = (compProp) => {
    this.setState({ loggedIn: compProp })
  };


  componentWillMount() {
    let pathName = (window.location.pathname).replace('/', '');
    this.setState({ activeKnob: pathName })
  };

  detectLoad = () => {
    if (this.state.ampImageLoaded === false) {
      this.setState({ ampImageLoaded: true })
    }
  }

  render() {

    let hidden = { display: 'none' };

    const Placeholder = () => {
      if (this.state.ampImageLoaded === false) {
        return <WaitScreen />
          ;
      } else {
        return null;
      }
    }

    return (
      <div style={colorStyle}>
        <img style={hidden} src={"/images/frenderAmp-large.png"} onLoad={this.detectLoad} />
        <Router      >
          <div style={colorStyle}>
            <Route path="/"
              render={props =>
                <Nav {...props}
                  activeKnob={this.state.activeKnob}
                  giveState={this.grabLoggedState}
                  loggedIn={this.state.loggedIn}
                  pathChange={this.didPathChange}
                />} />
            <Switch>
              <Route exact path="(/|/login)"
                render={props => this.state.ampImageLoaded ?
                  <div>
                    <Login {...props}
                      giveState={this.grabLoggedState}
                      loggedIn={this.state.loggedIn} />
                  </div> : null} />
              <Route exact path="/home" component={Home} />
              <Route exact path="/profile" component={this.state.loggedIn ? ProfileEdit : GoLogIn} />
              <Route exact path="/search" component={this.state.loggedIn ? SearchResults : GoLogIn} />
              <Route exact path="/success" component={this.state.loggedIn ? Home : GoLogIn} />
              <Route exact path="/page/html/search" component={this.state.loggedIn ? Home : GoLogIn} />
              <Route exact path="/gologin" component={GoLogIn} />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </Router>
        <Placeholder />

      </div>)
  }
}

export default App;
