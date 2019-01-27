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


const colorStyle = {
  backgroundColor: "black",
}



class App extends Component {
  state = {
    loggedIn: false,
    activeKnob: "none",
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
    console.log(this.state.activeKnob)
  };

  


  render() {

    return (
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
              render={props =>
                <div>
                  <Login {...props}
                    giveState={this.grabLoggedState}
                    loggedIn={this.state.loggedIn} />
                </div>} />
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
    )
  }
}

export default App;
