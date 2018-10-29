import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import Detail from "./pages/Detail";
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

// const App = () => (
//   state=
//   <Router>
//     <div style={colorStyle}>
//       <Nav />
//       <Switch>
//         <Route exact path="/" component={Login} />
//         <Route exact path="/home" component={Home} />
//         <Route exact path="/profile" component={ProfileEdit} />
//         <Route exact path="/search" component={SearchResults} />
//         <Route exact path="/success" component={Home} />
//         <Route exact path="/page/html/search" component={Home} />
//         <Route exact path="/books/:id" component={Detail} />
//         <Route path="/bugpie/html" component={Login} />
//         <Route component={NoMatch} />
//       </Switch>
//     </div>
//   </Router>

// );

class App extends Component {
  state = {
    loggedIn: false,
    activeKnob: "none"
  };

  componentDidMount() {
    console.log("App Mounted!")
  }

  didPathChange = () => {
    console.log('did path change=================================================?')
    let pathName = (window.location.pathname).replace('/', '');
    console.log("pathName:", pathName)
    console.log("this.state.activeKnob:", this.state.activeKnob)
    if (this.state.activeKnob !== pathName) {
      console.log('not THEe same')
      this.setState({ activeKnob: pathName })
    };
  };

  grabActiveKnob = (knobActive) => {
    this.setState({ activeKnob: knobActive })
  };

  grabLoggedState = (compProp) => {
    this.setState({ loggedIn: compProp })
    console.log('grabbed the state from:', compProp)
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
              // onClick={this.didPathChange}
              />} />
          {/* <Nav
            giveState={this.grabLoggedState}
            loggedIn={this.state.loggedIn} /> */}
          <Switch>
            {/* <Route exact path="/" component={Login} /> */}
            <Route exact path="(/|/login)"
              render={props =>
                <div>
                  {/* <Nav {...props}
                    giveState={this.grabLoggedState}
                    loggedIn={this.state.loggedIn}
                  /> */}
                  <Login {...props}
                    giveState={this.grabLoggedState}
                    loggedIn={this.state.loggedIn} />
                </div>} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/profile" component={ProfileEdit} />
            <Route exact path="/search" component={SearchResults} />
            <Route exact path="/success" component={Home} />
            <Route exact path="/page/html/search" component={Home} />
            <Route exact path="/gologin" component={GoLogIn} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
