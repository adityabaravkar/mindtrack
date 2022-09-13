import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import LandingPage from "./LandingPage/Landing_page.js";
import Login from "./Login/Login";
import SignUp from "./Signup/Signup.js";

//Create a Main Component
class Main extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/" component={LandingPage} />
        </BrowserRouter>
      </div>
    );
  }
}
//Export The Main Component
export default Main;
