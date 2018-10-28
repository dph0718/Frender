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
    loggedIn: false
  };

  componentDidMount() {
    console.log("App Mounted!")
  }

  grabLoggedState = (compProp) => {
    this.setState({ loggedIn: compProp })
    console.log('grabbed the state from:', compProp)
  };


  render() {
    console.log('Begin App Render...')
    console.log(`this.state.loggedIn:`)
    console.log(this.state.loggedIn)

    return (
      <Router>
        <div style={colorStyle}>
          <Route path="/"
            render={props =>
              <Nav {...props}
                giveState={this.grabLoggedState}
                loggedIn={this.state.loggedIn}
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
